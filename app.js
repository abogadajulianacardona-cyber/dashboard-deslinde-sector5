// Configuration
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1lFmHYE8f97PN0PtiRli74NOgP5t7K3Z7/export?format=csv&gid=1107597135';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Global variables
let allData = [];
let charts = {};

// Initialize the dashboard
async function init() {
    await loadData();
    setupEventListeners();
    startAutoRefresh();
}

// Load data from Google Sheets
async function loadData() {
    try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                allData = results.data;
                processData();
                updateLastUpdateTime();
                populateFilterOptions(); // Populate filter dropdowns
            },
            error: function(error) {
                console.error('Error parsing CSV:', error);
                showError('Error al cargar los datos');
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Error al conectar con la fuente de datos');
    }
}

// Process and display data
function processData() {
    calculateStatistics();
    renderCharts();
    renderTable(allData);
}

// Calculate statistics
function calculateStatistics() {
    const total = allData.length;
    
    // ===================================================================
    // ETAPA 1: USAR SOLO COLUMNA R (ESTADO NOTIFICACION antes del AVISO)
    // ===================================================================
    
    // 1A: NOTIFICACIÓN ELECTRÓNICA
    let electronicaExitosa = 0;
    let electronicaDevolucion = 0;
    let electronicaSinConfirmacion = 0;
    
    // 1B: CITACIÓN PARA NOTIFICACIÓN PERSONAL
    let personalExitosa = 0;
    let personalDevolucion = 0;
    let personalSinConfirmacion = 0;
    
    // 1C: CITACIÓN PÁGINA WEB
    let citacionPaginaWeb = 0;
    
    allData.forEach(row => {
        const estadoR = (row['ESTADO NOTIFICACION antes del AVISO'] || '').trim();
        
        // NOTIFICACIÓN ELECTRÓNICA
        if (estadoR === 'ELECTRÓNICA: Exitosa') {
            electronicaExitosa++;
        } else if (estadoR === 'ELECTRÓNICA: Devolución') {
            electronicaDevolucion++;
        } else if (estadoR === 'ELECTRÓNICA: Sin confirmación') {
            electronicaSinConfirmacion++;
        }
        // CITACIÓN PARA NOTIFICACIÓN PERSONAL
        else if (estadoR === 'CITACION NOT PERSONAL: Exitosa') {
            personalExitosa++;
        } else if (estadoR === 'CITACION NOT PERSONAL: Devolución') {
            personalDevolucion++;
        } else if (estadoR === 'CITACION NOT PERSONAL: Sin confirmación') {
            personalSinConfirmacion++;
        }
        // CITACIÓN PÁGINA WEB
        else if (estadoR === 'CITACION PAGINA WEB') {
            citacionPaginaWeb++;
        }
    });
    
    const totalEtapa1 = electronicaExitosa + electronicaDevolucion + electronicaSinConfirmacion + 
                        personalExitosa + personalDevolucion + personalSinConfirmacion +
                        citacionPaginaWeb;
    
    // ===================================================================
    // ETAPA 2: NOTIFICACIÓN POR AVISO (Columna AK)
    // Extrae "Página Web" y "Particular"
    // ===================================================================
    let avisoPaginaWeb = 0;
    let avisoParticular = 0;
    
    allData.forEach(row => {
        const avisoAK = (row['NOTIFICACIÓN POR AVISO'] || '').trim().toLowerCase();
        
        // Buscar "Página Web" o "Pagina Web"
        if (avisoAK.includes('página web') || avisoAK.includes('pagina web') || avisoAK.includes('web')) {
            avisoPaginaWeb++;
        }
        // Buscar "Particular"
        else if (avisoAK.includes('particular')) {
            avisoParticular++;
        }
    });
    
    const totalEtapa2 = avisoPaginaWeb + avisoParticular;
    
    // ===================================================================
    // ETAPA 3: NOTIFICACIÓN ESTADO FINAL (Columna AO)
    // 6 Variables que suman el total
    // ===================================================================
    let notifElectronicaEfectiva = 0;
    let notifPersonalEfectiva = 0;
    let notifAvisoWebEfectiva = 0;
    let notifAvisoParticularEfectiva = 0;
    let notifAvisoWebEnProceso = 0;
    let notifAvisoParticularEnProceso = 0;
    
    allData.forEach(row => {
        const estadoFinalAO = (row['ESTADO FINAL NOTIFICACION '] || '').trim().toLowerCase();
        
        if (!estadoFinalAO) return; // Skip empty rows
        
        // 1. Notif Electrónica efectiva
        if (estadoFinalAO.includes('electrónica') && estadoFinalAO.includes('efectiva')) {
            notifElectronicaEfectiva++;
        }
        // 2. Notif Personal efectiva
        else if (estadoFinalAO.includes('personal') && estadoFinalAO.includes('efectiva')) {
            notifPersonalEfectiva++;
        }
        // 3. Notif Aviso Web efectiva
        else if (estadoFinalAO.includes('aviso') && (estadoFinalAO.includes('web') || estadoFinalAO.includes('página')) && estadoFinalAO.includes('efectiva')) {
            notifAvisoWebEfectiva++;
        }
        // 4. Notif Aviso Particular efectiva
        else if (estadoFinalAO.includes('aviso') && estadoFinalAO.includes('particular') && estadoFinalAO.includes('efectiva')) {
            notifAvisoParticularEfectiva++;
        }
        // 5. Notif Aviso Web en proceso
        else if (estadoFinalAO.includes('aviso') && (estadoFinalAO.includes('web') || estadoFinalAO.includes('página')) && estadoFinalAO.includes('proceso')) {
            notifAvisoWebEnProceso++;
        }
        // 6. Notif Aviso Particular en proceso
        else if (estadoFinalAO.includes('aviso') && estadoFinalAO.includes('particular') && estadoFinalAO.includes('proceso')) {
            notifAvisoParticularEnProceso++;
        }
    });
    
    const totalEtapa3 = notifElectronicaEfectiva + notifPersonalEfectiva + 
                        notifAvisoWebEfectiva + notifAvisoParticularEfectiva +
                        notifAvisoWebEnProceso + notifAvisoParticularEnProceso;
    
    // Count titulares in/out resolution
    const dentroResolucion = allData.filter(row => 
        row['FMI/ TITULARES EN RESOLUCIÓN (SI/NO)'] && 
        row['FMI/ TITULARES EN RESOLUCIÓN (SI/NO)'].toUpperCase() === 'SI'
    ).length;
    
    const fueraResolucion = total - dentroResolucion;
    
    // Update DOM - ETAPA 1A: NOTIFICACIÓN ELECTRÓNICA
    document.getElementById('electronicaExitosa').textContent = electronicaExitosa;
    document.getElementById('electronicaDevolucion').textContent = electronicaDevolucion;
    document.getElementById('electronicaSinConfirmacion').textContent = electronicaSinConfirmacion;
    
    // Update DOM - ETAPA 1B: CITACIÓN PARA NOTIFICACIÓN PERSONAL
    document.getElementById('personalExitosa').textContent = personalExitosa;
    document.getElementById('personalDevolucion').textContent = personalDevolucion;
    document.getElementById('personalSinConfirmacion').textContent = personalSinConfirmacion;
    
    // Update DOM - ETAPA 1C: CITACIÓN PÁGINA WEB
    document.getElementById('citacionPaginaWeb').textContent = citacionPaginaWeb;
    
    // Update DOM - ETAPA 1 Total
    document.getElementById('totalEtapa1').textContent = `(Total: ${totalEtapa1})`;
    
    // Update DOM - ETAPA 2: NOTIFICACIÓN POR AVISO
    document.getElementById('avisoPaginaWeb').textContent = avisoPaginaWeb;
    document.getElementById('avisoParticular').textContent = avisoParticular;
    document.getElementById('totalEtapa2').textContent = `(Total: ${totalEtapa2})`;
    
    // Update DOM - ETAPA 3: NOTIFICACIÓN ESTADO FINAL (6 variables)
    document.getElementById('notifElectronicaEfectiva').textContent = notifElectronicaEfectiva;
    document.getElementById('notifPersonalEfectiva').textContent = notifPersonalEfectiva;
    document.getElementById('notifAvisoWebEfectiva').textContent = notifAvisoWebEfectiva;
    document.getElementById('notifAvisoParticularEfectiva').textContent = notifAvisoParticularEfectiva;
    document.getElementById('notifAvisoWebEnProceso').textContent = notifAvisoWebEnProceso;
    document.getElementById('notifAvisoParticularEnProceso').textContent = notifAvisoParticularEnProceso;
    document.getElementById('totalEtapa3').textContent = `(Total: ${totalEtapa3})`;
    
    // Update resolution banner
    document.getElementById('dentroResolucion').textContent = dentroResolucion;
    document.getElementById('fueraResolucion').textContent = fueraResolucion;
}

// Populate filter options dynamically
function populateFilterOptions() {
    // Populate Estado Final Notificación filter
    const estadoFinalFilter = document.getElementById('estadoFinalFilter');
    const estadosFinales = new Set();
    
    allData.forEach(row => {
        const estado = row['ESTADO FINAL NOTIFICACION '];
        if (estado && estado.trim()) {
            estadosFinales.add(estado.trim());
        }
    });
    
    // Clear existing options except first
    estadoFinalFilter.innerHTML = '<option value="">Estado Final Notificación (Todos)</option>';
    
    // Add unique estados
    Array.from(estadosFinales).sort().forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        estadoFinalFilter.appendChild(option);
    });
}

// Render charts
function renderCharts() {
    renderNotificationChart();
    renderMediumChart();
    renderResolutionChart();
}

// Render notification status chart
function renderNotificationChart() {
    const ctx = document.getElementById('notificationChart');
    
    const statusCounts = {};
    allData.forEach(row => {
        const status = row['ESTADO NOTIFICACION antes del AVISO'] || row['ESTADO FINAL NOTIFICACION '] || 'Sin datos';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    if (charts.notificationChart) {
        charts.notificationChart.destroy();
    }
    
    charts.notificationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: [
                    '#10b981', '#f59e0b', '#3b82f6', '#ef4444', 
                    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Render notification medium chart
function renderMediumChart() {
    const ctx = document.getElementById('medioChart');
    
    const mediumCounts = {};
    allData.forEach(row => {
        const medium = row['MEDIO DE NOTIFICACIÓN HISTORICO'] || 'Sin especificar';
        mediumCounts[medium] = (mediumCounts[medium] || 0) + 1;
    });
    
    if (charts.mediumChart) {
        charts.mediumChart.destroy();
    }
    
    charts.mediumChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(mediumCounts),
            datasets: [{
                label: 'Cantidad',
                data: Object.values(mediumCounts),
                backgroundColor: '#10b981',
                borderColor: '#059669',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Cantidad: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                },
                x: {
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
}

// Render resolution status chart
function renderResolutionChart() {
    const ctx = document.getElementById('resolutionChart');
    
    let inResolution = 0;
    let outResolution = 0;
    
    allData.forEach(row => {
        const status = row['FMI/ TITULARES EN RESOLUCIÓN (SI/NO)'];
        if (status && status.toUpperCase() === 'SI') {
            inResolution++;
        } else {
            outResolution++;
        }
    });
    
    if (charts.resolutionChart) {
        charts.resolutionChart.destroy();
    }
    
    charts.resolutionChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Dentro de Resolución', 'Fuera de Resolución'],
            datasets: [{
                data: [inResolution, outResolution],
                backgroundColor: ['#1B5E20', '#F9A825'],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12, weight: 'bold' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Render data table
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    document.getElementById('tableInfo').textContent = `Mostrando ${data.length} de ${allData.length} registros`;
    
    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.className = index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100';
        tr.className += ' transition-colors duration-150';
        
        const terminosVencimiento = row['VENCIMIENTO DE TERMINO '] || '-';
        const recurso = row['PRESENTÓ RECURSO SI/NO'] || '-';
        const telefono = row['TELÉFONO'] || '-';
        const estadoFinal = row['ESTADO FINAL NOTIFICACION '] || '-';
        
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${row['N°'] || '-'}</td>
            <td class="px-6 py-4 text-sm text-gray-900 max-w-xs">${row['NOMBRE COMPLETO DE TITULARES'] || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${row['DOCUMENTO DE IDENTIDAD '] || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${telefono}</td>
            <td class="px-6 py-4 text-sm">
                <span class="px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(estadoFinal)}">
                    ${estadoFinal}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">${terminosVencimiento}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 py-1 rounded-full text-xs font-semibold ${recurso.toUpperCase() === 'SI' ? 'bg-red-100 text-red-800' : recurso.toUpperCase() === 'NO' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                    ${recurso}
                </span>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Get status badge class
function getStatusClass(status) {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes('exitosa') || statusLower.includes('efectiva')) {
        return 'bg-green-100 text-green-800 border border-green-300';
    } else if (statusLower.includes('sin confirmación') || statusLower.includes('pendiente') || statusLower.includes('proceso')) {
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
    } else if (statusLower.includes('fallida') || statusLower.includes('devuelta') || statusLower.includes('devolución')) {
        return 'bg-red-100 text-red-800 border border-red-300';
    } else if (statusLower.includes('citacion') || statusLower.includes('citación')) {
        return 'bg-blue-100 text-blue-800 border border-blue-300';
    }
    return 'bg-gray-100 text-gray-800';
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterData);
    }
    
    const estadoFinalFilter = document.getElementById('estadoFinalFilter');
    if (estadoFinalFilter) {
        estadoFinalFilter.addEventListener('change', filterData);
    }
    
    const telefonoFilter = document.getElementById('telefonoFilter');
    if (telefonoFilter) {
        telefonoFilter.addEventListener('change', filterData);
    }
    
    const recursoFilter = document.getElementById('recursoFilter');
    if (recursoFilter) {
        recursoFilter.addEventListener('change', filterData);
    }
}

// Filter data based on search and filters
function filterData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const estadoFinalFilter = document.getElementById('estadoFinalFilter').value;
    const telefonoFilter = document.getElementById('telefonoFilter').value;
    const recursoFilter = document.getElementById('recursoFilter').value;
    
    let filteredData = allData;
    
    // Filter by search term (nombre, documento, número)
    if (searchTerm) {
        filteredData = filteredData.filter(row => {
            return (
                (row['NOMBRE COMPLETO DE TITULARES'] && row['NOMBRE COMPLETO DE TITULARES'].toLowerCase().includes(searchTerm)) ||
                (row['DOCUMENTO DE IDENTIDAD '] && row['DOCUMENTO DE IDENTIDAD '].toLowerCase().includes(searchTerm)) ||
                (row['N°'] && row['N°'].toString().includes(searchTerm))
            );
        });
    }
    
    // Filter by Estado Final Notificación
    if (estadoFinalFilter) {
        filteredData = filteredData.filter(row => {
            const estado = row['ESTADO FINAL NOTIFICACION '] || '';
            return estado === estadoFinalFilter;
        });
    }
    
    // Filter by Teléfono (con/sin)
    if (telefonoFilter) {
        filteredData = filteredData.filter(row => {
            const telefono = (row['TELÉFONO'] || '').trim();
            if (telefonoFilter === 'CON_TELEFONO') {
                return telefono !== '' && telefono !== '-';
            } else if (telefonoFilter === 'SIN_TELEFONO') {
                return telefono === '' || telefono === '-';
            }
            return true;
        });
    }
    
    // Filter by Recurso SI/NO
    if (recursoFilter) {
        filteredData = filteredData.filter(row => {
            const recurso = row['PRESENTÓ RECURSO SI/NO'];
            return recurso && recurso.toUpperCase() === recursoFilter;
        });
    }
    
    renderTable(filteredData);
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

// Show error message
function showError(message) {
    console.error(message);
    alert(message + '. Por favor, recargue la página.');
}

// Start auto-refresh
function startAutoRefresh() {
    setInterval(async () => {
        console.log('Auto-refreshing data...');
        await loadData();
    }, REFRESH_INTERVAL);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
