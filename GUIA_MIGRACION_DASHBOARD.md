# 🚀 GUÍA DE MIGRACIÓN - Dashboard Deslinde Sector 5

## 📊 Resumen Ejecutivo

Este documento proporciona **3 rutas de migración** para alojar permanentemente el Dashboard Deslinde Sector 5, asegurando actualización automática desde Google Sheets.

**Dashboard Actual (Temporal):** https://sh4plyks.scispace.co  
**Google Sheet ID:** `1lFmHYE8f97PN0PtiRli74NOgP5t7K3Z7`  
**Gid:** `1107597135`

---

## ✅ OPCIÓN 1: GitHub Pages (RECOMENDADA - MÁS SIMPLE)

### 🎯 Por qué es la mejor opción:
- ✅ **100% Gratuito** - Sin costos mensuales
- ✅ **Más Simple** - Solo requiere cuenta GitHub (gratuita)
- ✅ **Auto-actualización** - El dashboard ya tiene lógica de actualización cada 5 minutos
- ✅ **Fácil de Codificar** - El equipo puede editar directamente en GitHub
- ✅ **URL Personalizable** - Puedes usar dominio propio (opcional)
- ✅ **Sin Mantenimiento** - GitHub se encarga de todo
- ✅ **Control Total** - Todo el código es accesible y modificable

### 📋 Pasos de Implementación:

#### **PASO 1: Crear Repositorio en GitHub (5 minutos)**

1. **Ir a GitHub:** https://github.com
2. **Crear cuenta gratuita** (si no tienes una)
3. **Crear nuevo repositorio:**
   - Click en "New repository"
   - Nombre: `dashboard-deslinde-sector5`
   - Descripción: "Dashboard en tiempo real para seguimiento de notificaciones - Sector 5"
   - Público o Privado (recomendado: Público para GitHub Pages gratuito)
   - ✅ Marcar "Add a README file"
   - Click "Create repository"

#### **PASO 2: Subir Archivos del Dashboard (5 minutos)**

**Archivos a subir:**
```
dashboard-deslinde-sector5/
├── index.html          (Dashboard principal)
├── app.js              (Lógica JavaScript)
├── assets/
│   ├── ant-logo.png
│   ├── gobierno-colombia.png
│   └── ant-banner.png
```

**Cómo subir:**
1. En tu repositorio, click "Add file" → "Upload files"
2. Arrastra los 4 archivos (index.html, app.js, y las 3 imágenes)
3. Commit message: "Initial commit - Dashboard Deslinde Sector 5"
4. Click "Commit changes"

#### **PASO 3: Activar GitHub Pages (2 minutos)**

1. En tu repositorio, ir a **Settings** (⚙️)
2. En el menú lateral, click **Pages**
3. En "Source", seleccionar:
   - Branch: `main` (o `master`)
   - Folder: `/ (root)`
4. Click **Save**
5. **¡Listo!** En 1-2 minutos, tu dashboard estará disponible en:
   ```
   https://[tu-usuario].github.io/dashboard-deslinde-sector5/
   ```

#### **PASO 4: Verificar Conexión con Google Sheet (5 minutos)**

1. **Abrir la URL del dashboard**
2. **Verificar que carga datos** (debería mostrar 493 registros totales)
3. **Esperar 5 minutos** y recargar para confirmar auto-actualización
4. **Probar filtros** para asegurar que funcionan correctamente

#### **PASO 5: (OPCIONAL) Dominio Personalizado**

Si deseas usar un dominio propio (ej: `dashboard.ant.gov.co`):

1. En GitHub Pages settings, agregar tu dominio en "Custom domain"
2. En tu proveedor de dominio, agregar registro DNS:
   ```
   Tipo: CNAME
   Nombre: dashboard (o el subdominio que desees)
   Valor: [tu-usuario].github.io
   ```
3. Esperar propagación DNS (1-24 horas)

---

### 🔧 Cómo Editar el Dashboard (Para el Equipo)

#### **Opción A: Editar Directamente en GitHub (Más Fácil)**
1. Ir al archivo que deseas editar (ej: `app.js`)
2. Click en el ícono de lápiz (✏️) "Edit this file"
3. Hacer cambios
4. Scroll down → "Commit changes"
5. **Los cambios se publican automáticamente en 1-2 minutos**

#### **Opción B: Editar en tu Computadora (Para Cambios Grandes)**
1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/[tu-usuario]/dashboard-deslinde-sector5.git
   cd dashboard-deslinde-sector5
   ```

2. **Editar archivos** con tu editor favorito (VS Code, Notepad++, etc.)

3. **Subir cambios:**
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push origin main
   ```

4. **Los cambios se publican automáticamente en 1-2 minutos**

---

### 🔄 Cómo Funciona la Auto-Actualización

El dashboard **YA TIENE** lógica de auto-actualización integrada:

**Archivo: `app.js` (línea 5-6)**
```javascript
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1lFmHYE8f97PN0PtiRli74NOgP5t7K3Z7/export?format=csv&gid=1107597135';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutos
```

**Cómo funciona:**
1. ✅ El dashboard carga datos desde Google Sheets (formato CSV público)
2. ✅ Cada 5 minutos, vuelve a consultar el Google Sheet automáticamente
3. ✅ Si hay cambios, actualiza las métricas y la tabla en tiempo real
4. ✅ **NO requiere recargar la página manualmente**

**Para cambiar el intervalo de actualización:**
```javascript
const REFRESH_INTERVAL = 3 * 60 * 1000; // 3 minutos
const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutos
```

---

### 🔐 Requisitos del Google Sheet

**IMPORTANTE:** Para que el dashboard funcione, el Google Sheet debe ser **accesible públicamente** (solo lectura):

1. **Abrir el Google Sheet**
2. **Click en "Compartir"** (botón superior derecho)
3. **En "Acceso general":**
   - Cambiar de "Restringido" a **"Cualquier persona con el enlace"**
   - Rol: **"Lector"** (solo lectura)
4. **Click "Listo"**

**Nota:** Esto NO permite que otros editen el sheet, solo lo leen. Solo tú y los editores autorizados pueden modificarlo.

---

### 📊 Variables que se Actualizan Automáticamente

El dashboard está configurado para extraer las siguientes columnas del Google Sheet:

#### **ETAPA 1: Columna R** (ESTADO NOTIFICACION antes del AVISO)
- ✅ Notificación Electrónica: Exitosa, Devolución, Sin Confirmación
- ✅ Citaciones para Notificación Personal: Exitosa, Devolución, Sin Confirmación
- ✅ Citación Página Web: Total

#### **ETAPA 2: Columna AK** (NOTIFICACIÓN POR AVISO)
- ✅ Página Web
- ✅ Particular

#### **ETAPA 3: Columna AO** (ESTADO FINAL NOTIFICACION)
- ✅ Notif Electrónica efectiva
- ✅ Notif Personal efectiva
- ✅ Notif Aviso Web efectiva
- ✅ Notif Aviso Particular efectiva
- ✅ Notif Aviso Web en proceso
- ✅ Notif Aviso Particular en proceso

#### **Tabla de Registros:**
- ✅ N° (Columna A)
- ✅ Nombre/Razón Social (Columna E)
- ✅ Documento (Columna F)
- ✅ Teléfono (Columna M)
- ✅ Estado Final Notificación (Columna AO)
- ✅ Términos Vencimiento (Columna AP)
- ✅ Recurso SI/NO (Columna AQ)

**Si agregas nuevas columnas al Google Sheet, solo necesitas actualizar el archivo `app.js` para incluirlas.**

---

### ✅ Ventajas de GitHub Pages

| Característica | GitHub Pages |
|----------------|--------------|
| **Costo** | 🟢 Gratuito (100%) |
| **Facilidad** | 🟢 Muy Fácil (5 pasos) |
| **Tiempo Setup** | 🟢 15-20 minutos |
| **Auto-actualización** | 🟢 Sí (cada 5 min) |
| **Editable por Equipo** | 🟢 Sí (GitHub web o local) |
| **Dominio Propio** | 🟢 Sí (opcional) |
| **Mantenimiento** | 🟢 Cero |
| **Escalabilidad** | 🟢 Ilimitada |
| **Respaldo** | 🟢 Automático (Git) |
| **Control de Versiones** | 🟢 Completo (Git) |

---

## 🔄 OPCIÓN 2: Google Apps Script Web App

### 🎯 Ventajas:
- ✅ Integración nativa con Google Sheets
- ✅ Acceso directo a datos sin exportar CSV
- ✅ Puede ejecutar código del lado del servidor

### ⚠️ Desventajas:
- ❌ Más complejo de configurar
- ❌ Requiere conocimientos de Apps Script
- ❌ Limitaciones de cuota de Google (más restrictivo)
- ❌ Más difícil de editar para el equipo

### 📋 Pasos de Implementación:

#### **PASO 1: Abrir Google Apps Script**
1. Abrir el Google Sheet
2. **Extensiones** → **Apps Script**
3. Se abre el editor de código

#### **PASO 2: Crear Web App**
1. **Eliminar código de ejemplo**
2. **Pegar el siguiente código:**

```javascript
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('Dashboard Deslinde Sector 5')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Hoja1'); // Cambiar por el nombre real
  const data = sheet.getDataRange().getValues();
  
  // Convertir a formato JSON
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
}
```

#### **PASO 3: Crear Archivo HTML**
1. **Click en "+"** → **HTML**
2. Nombre: `index`
3. **Copiar el contenido completo de `index.html`** actual
4. **Modificar la línea del SHEET_URL en el script:**

```javascript
// REEMPLAZAR ESTA LÍNEA:
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/...';

// CON ESTA:
// No se necesita SHEET_URL, usamos google.script.run
```

5. **Agregar función para cargar datos desde Apps Script:**

```javascript
// Reemplazar la función loadData() con:
async function loadData() {
    try {
        google.script.run
            .withSuccessHandler(function(results) {
                allData = results;
                processData();
                updateLastUpdateTime();
                populateFilterOptions();
            })
            .withFailureHandler(function(error) {
                console.error('Error loading data:', error);
                showError('Error al cargar los datos');
            })
            .getData();
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Error al conectar con la fuente de datos');
    }
}
```

#### **PASO 4: Implementar Web App**
1. **Click en "Implementar"** → **Nueva implementación**
2. Tipo: **Aplicación web**
3. Descripción: "Dashboard Deslinde Sector 5"
4. Ejecutar como: **Yo**
5. Quién tiene acceso: **Cualquier persona** (o "Cualquier persona de [tu organización]")
6. **Click "Implementar"**
7. **Autorizar permisos** cuando se solicite
8. **Copiar URL de la Web App**

---

## 🌐 OPCIÓN 3: Netlify/Vercel (Alternativa Moderna)

### 🎯 Ventajas:
- ✅ Despliegue automático desde GitHub
- ✅ CDN global (más rápido)
- ✅ HTTPS automático
- ✅ Dominio personalizado incluido

### 📋 Pasos (Usando Netlify):

#### **PASO 1: Subir a GitHub**
(Seguir PASO 1 y 2 de Opción 1)

#### **PASO 2: Conectar con Netlify**
1. Ir a https://netlify.com
2. Crear cuenta gratuita (con GitHub)
3. **"Add new site"** → **"Import an existing project"**
4. Conectar con GitHub
5. Seleccionar repositorio `dashboard-deslinde-sector5`
6. **Deploy settings:**
   - Build command: (dejar vacío)
   - Publish directory: `/`
7. **Click "Deploy site"**

#### **PASO 3: Obtener URL**
- Netlify genera URL automática: `https://[random-name].netlify.app`
- Puedes cambiar el nombre en **Site settings** → **Change site name**

---

## 📊 Comparación de Opciones

| Característica | GitHub Pages | Apps Script | Netlify/Vercel |
|----------------|--------------|-------------|----------------|
| **Costo** | 🟢 Gratis | 🟢 Gratis | 🟢 Gratis |
| **Facilidad** | 🟢 Muy Fácil | 🟡 Medio | 🟢 Fácil |
| **Tiempo Setup** | 🟢 15 min | 🔴 45 min | 🟢 20 min |
| **Requiere Código** | 🟢 No | 🔴 Sí (Apps Script) | 🟢 No |
| **Auto-actualización** | 🟢 Cada 5 min | 🟢 Tiempo real | 🟢 Cada 5 min |
| **Editable Equipo** | 🟢 Muy Fácil | 🔴 Difícil | 🟢 Fácil |
| **Dominio Propio** | 🟢 Sí | 🟢 Sí | 🟢 Sí |
| **CDN Global** | 🟡 Básico | ❌ No | 🟢 Avanzado |
| **HTTPS** | 🟢 Automático | 🟢 Automático | 🟢 Automático |

---

## 🎯 RECOMENDACIÓN FINAL

### ✅ **USAR GITHUB PAGES (OPCIÓN 1)**

**Razones:**
1. ✅ **Más Simple** - 5 pasos, 15 minutos total
2. ✅ **Cero Costo** - Completamente gratuito
3. ✅ **Fácil de Mantener** - El equipo puede editar fácilmente
4. ✅ **Auto-actualización** - Ya funciona con el código actual
5. ✅ **Control Total** - Todo el código es visible y modificable
6. ✅ **Sin Dependencias** - No requiere servicios adicionales

**Cuándo usar Apps Script (Opción 2):**
- Si necesitas acceso a datos privados del Google Sheet
- Si necesitas ejecutar lógica compleja del lado del servidor
- Si tu organización ya usa Apps Script extensivamente

**Cuándo usar Netlify/Vercel (Opción 3):**
- Si necesitas CDN global ultra-rápido
- Si planeas agregar funciones serverless en el futuro
- Si quieres integración CI/CD avanzada

---

## 📞 Soporte y Mantenimiento

### 🔧 Cambios Futuros Comunes:

#### **1. Cambiar Intervalo de Actualización**
**Archivo:** `app.js` (línea 6)
```javascript
const REFRESH_INTERVAL = 5 * 60 * 1000; // Cambiar el 5 por los minutos deseados
```

#### **2. Agregar Nueva Columna a la Tabla**
**Archivo:** `app.js` (función `renderTable`)
```javascript
// Agregar nueva variable
const nuevaColumna = row['NOMBRE_COLUMNA_SHEET'] || '-';

// Agregar nuevo <td> en el innerHTML
<td class="px-6 py-4 text-sm">${nuevaColumna}</td>
```

**Archivo:** `index.html` (tabla header)
```html
<th class="px-6 py-3 text-left text-xs font-medium uppercase">Nueva Columna</th>
```

#### **3. Cambiar Colores Corporativos**
**Archivo:** `index.html` (sección `<style>`)
```css
:root {
    --ant-gold: #F9A825;    /* Cambiar aquí */
    --ant-green: #1B5E20;   /* Cambiar aquí */
}
```

#### **4. Agregar Nuevo Filtro**
**Archivo:** `index.html` (sección Filtros)
```html
<select id="nuevoFiltro" class="px-4 py-2 border border-gray-300 rounded-lg">
    <option value="">Nuevo Filtro (Todos)</option>
</select>
```

**Archivo:** `app.js` (función `setupEventListeners` y `filterData`)
```javascript
// Agregar event listener
const nuevoFiltro = document.getElementById('nuevoFiltro');
if (nuevoFiltro) {
    nuevoFiltro.addEventListener('change', filterData);
}

// Agregar lógica de filtrado
if (nuevoFiltro) {
    filteredData = filteredData.filter(row => {
        // Tu lógica aquí
    });
}
```

---

## 🚨 Solución de Problemas

### **Problema: Dashboard no carga datos**
**Solución:**
1. Verificar que el Google Sheet es público (ver sección "Requisitos del Google Sheet")
2. Verificar URL del sheet en `app.js` línea 5
3. Abrir consola del navegador (F12) y revisar errores

### **Problema: Datos no se actualizan**
**Solución:**
1. Verificar que `REFRESH_INTERVAL` está configurado (app.js línea 6)
2. Recargar página manualmente (Ctrl+F5)
3. Verificar conexión a internet

### **Problema: Filtros no funcionan**
**Solución:**
1. Verificar que los IDs de los filtros coinciden con los del HTML
2. Abrir consola del navegador (F12) y revisar errores
3. Verificar que la columna existe en el Google Sheet

### **Problema: Cambios en GitHub no se reflejan**
**Solución:**
1. Esperar 1-2 minutos (GitHub Pages tarda en actualizar)
2. Hacer hard refresh: Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)
3. Limpiar caché del navegador

---

## 📦 Archivos Incluidos en el Dashboard

```
dashboard-deslinde-sector5/
│
├── index.html                  # Página principal del dashboard
│   ├── Header con logos ANT
│   ├── Banner de resolución
│   ├── ETAPA 1: Envío Comunicaciones (3 subsecciones)
│   ├── ETAPA 2: Notificación por Aviso (2 subsecciones)
│   ├── ETAPA 3: Estado Final (6 variables)
│   ├── Gráficos (3 charts)
│   ├── Filtros y Búsqueda (4 filtros)
│   └── Tabla de Registros (7 columnas)
│
├── app.js                      # Lógica JavaScript
│   ├── Conexión con Google Sheets (CSV export)
│   ├── Auto-actualización cada 5 minutos
│   ├── Cálculo de estadísticas (3 etapas)
│   ├── Renderizado de gráficos (Chart.js)
│   ├── Lógica de filtros (4 filtros)
│   └── Renderizado de tabla
│
└── assets/                     # Recursos visuales
    ├── ant-logo.png           # Logo ANT
    ├── gobierno-colombia.png  # Logo Gobierno
    └── ant-banner.png         # Banner ANT
```

---

## 🎓 Recursos de Aprendizaje

### **Para el Equipo:**

**GitHub Básico:**
- Tutorial oficial: https://docs.github.com/es/get-started
- GitHub Desktop (interfaz visual): https://desktop.github.com/

**JavaScript Básico:**
- MDN Web Docs: https://developer.mozilla.org/es/docs/Web/JavaScript
- FreeCodeCamp: https://www.freecodecamp.org/espanol/

**HTML/CSS:**
- W3Schools: https://www.w3schools.com/html/
- TailwindCSS: https://tailwindcss.com/docs

**Chart.js (Gráficos):**
- Documentación: https://www.chartjs.org/docs/latest/

---

## ✅ Checklist de Migración

### **Pre-Migración:**
- [ ] Verificar que el Google Sheet es público (solo lectura)
- [ ] Confirmar que la URL del sheet funciona en el dashboard actual
- [ ] Descargar todos los archivos del dashboard actual
- [ ] Hacer backup del Google Sheet

### **Durante Migración (GitHub Pages):**
- [ ] Crear cuenta GitHub
- [ ] Crear repositorio `dashboard-deslinde-sector5`
- [ ] Subir archivos (index.html, app.js, assets/)
- [ ] Activar GitHub Pages en Settings
- [ ] Esperar 1-2 minutos para despliegue

### **Post-Migración:**
- [ ] Abrir URL del dashboard en GitHub Pages
- [ ] Verificar que carga todos los datos (493 registros)
- [ ] Probar los 4 filtros
- [ ] Verificar que las 3 ETAPAS muestran datos correctos
- [ ] Esperar 5 minutos y confirmar auto-actualización
- [ ] Compartir URL final con el equipo
- [ ] Documentar URL en lugar seguro

### **Opcional:**
- [ ] Configurar dominio personalizado
- [ ] Agregar colaboradores al repositorio GitHub
- [ ] Configurar protección de rama main (requiere pull requests)

---

## 📧 Contacto y Soporte

Para cualquier duda o problema con la migración:

1. **GitHub Issues:** Crear issue en el repositorio
2. **Documentación:** Revisar esta guía completa
3. **Consola del Navegador:** Presionar F12 para ver errores

---

## 🎉 ¡Listo para Migrar!

Sigue los pasos de la **OPCIÓN 1 (GitHub Pages)** y tendrás tu dashboard permanente en **15 minutos**.

**URL Temporal Actual:** https://sh4plyks.scispace.co  
**URL Permanente (Ejemplo):** https://[tu-usuario].github.io/dashboard-deslinde-sector5/

---

**Fecha de Creación:** 25 de Marzo de 2026  
**Última Actualización:** 25 de Marzo de 2026  
**Versión:** 1.0
