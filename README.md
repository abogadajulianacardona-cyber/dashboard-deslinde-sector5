# 📊 Dashboard Deslinde Sector 5 - ANT Colombia

Dashboard en tiempo real para seguimiento del proceso agrario de deslinde del Sector 5 de la Agencia Nacional de Tierras (ANT) de Colombia.

## 🌐 Demo en Vivo

**URL Actual:** https://sh4plyks.scispace.co

## 🎯 Características

✅ **Actualización Automática** - Datos en tiempo real desde Google Sheets cada 5 minutos  
✅ **3 Etapas de Notificación** - Seguimiento completo del proceso  
✅ **Filtros Dinámicos** - 4 filtros para búsqueda avanzada  
✅ **Gráficos Interactivos** - Visualización de estadísticas clave  
✅ **Tabla de Registros** - 493 registros con información detallada  
✅ **Diseño Responsivo** - Funciona en desktop, tablet y móvil  
✅ **Identidad Corporativa ANT** - Colores y logos oficiales  

## 📋 Estructura del Dashboard

### ETAPA 1: Envío Comunicaciones
- **Notificación Electrónica:** Exitosa, Devolución, Sin Confirmación
- **Citaciones para Notificación Personal:** Exitosa, Devolución, Sin Confirmación
- **Citación Página Web:** Total

### ETAPA 2: Notificación por Aviso
- **Página Web**
- **Particular**

### ETAPA 3: Estado Final
- Notif Electrónica efectiva
- Notif Personal efectiva
- Notif Aviso Web efectiva
- Notif Aviso Particular efectiva
- Notif Aviso Web en proceso
- Notif Aviso Particular en proceso

## 🚀 Instalación

### Opción 1: GitHub Pages (Recomendado)

1. **Fork este repositorio**
2. **Ir a Settings → Pages**
3. **Seleccionar:**
   - Branch: `main`
   - Folder: `/ (root)`
4. **Guardar**
5. **¡Listo!** Tu dashboard estará en: `https://[tu-usuario].github.io/dashboard-deslinde-sector5/`

### Opción 2: Descargar y Abrir Localmente

```bash
git clone https://github.com/[tu-usuario]/dashboard-deslinde-sector5.git
cd dashboard-deslinde-sector5
# Abrir index.html en tu navegador
```

## 🔧 Configuración

### Cambiar URL del Google Sheet

**Archivo:** `app.js` (línea 5)
```javascript
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv&gid=TU_GID';
```

### Cambiar Intervalo de Actualización

**Archivo:** `app.js` (línea 6)
```javascript
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutos (cambiar el 5)
```

### Requisitos del Google Sheet

⚠️ **IMPORTANTE:** El Google Sheet debe ser público (solo lectura):

1. Abrir el Google Sheet
2. Click en **"Compartir"**
3. En "Acceso general" → **"Cualquier persona con el enlace"**
4. Rol: **"Lector"**
5. Click "Listo"

## 📂 Estructura del Proyecto

```
dashboard-deslinde-sector5/
│
├── index.html                       # Página principal
├── app.js                           # Lógica JavaScript
├── assets/                          # Recursos visuales
│   ├── ant-logo.png
│   ├── gobierno-colombia.png
│   └── ant-banner.png
├── README.md                        # Este archivo
├── INSTRUCCIONES_RAPIDAS.md         # Guía paso a paso (15 minutos)
└── GUIA_MIGRACION_DASHBOARD.md     # Guía completa (3 opciones)
```

## 🛠️ Tecnologías

- **HTML5** - Estructura
- **TailwindCSS** - Estilos (vía CDN)
- **JavaScript Vanilla** - Lógica
- **Chart.js** - Gráficos interactivos
- **PapaParse** - Parsing de CSV desde Google Sheets

## 📊 Fuente de Datos

**Google Sheets ID:** `1lFmHYE8f97PN0PtiRli74NOgP5t7K3Z7`  
**Gid:** `1107597135`

El dashboard extrae datos de las siguientes columnas:
- **Columna A:** N°
- **Columna C:** FMI/TITULARES EN RESOLUCIÓN (SI/NO)
- **Columna E:** Nombre/Razón Social
- **Columna F:** Documento
- **Columna M:** Teléfono
- **Columna Q:** Medio de Notificación Histórico
- **Columna R:** Estado Notificación antes del Aviso
- **Columna AK:** Notificación por Aviso
- **Columna AO:** Estado Final Notificación
- **Columna AP:** Términos Vencimiento
- **Columna AQ:** Recurso SI/NO

## 🔄 Actualización Automática

El dashboard se actualiza automáticamente cada **5 minutos** sin necesidad de recargar la página manualmente.

**Cómo funciona:**
1. Carga inicial de datos desde Google Sheets (formato CSV)
2. Cada 5 minutos, vuelve a consultar el Google Sheet
3. Si hay cambios, actualiza métricas, gráficos y tabla en tiempo real

## 🎨 Colores Corporativos ANT

```css
--ant-gold: #F9A825    /* Amarillo dorado */
--ant-green: #1B5E20   /* Verde oscuro */
```

## 📞 Soporte

Para cualquier duda o problema:
1. Revisar **INSTRUCCIONES_RAPIDAS.md** (guía paso a paso)
2. Revisar **GUIA_MIGRACION_DASHBOARD.md** (guía completa)
3. Abrir un **Issue** en este repositorio
4. Consultar la **consola del navegador** (F12) para errores

## 📄 Licencia

Este proyecto es de uso interno de la Agencia Nacional de Tierras (ANT) de Colombia.

## 🏛️ Créditos

**Desarrollado para:**  
Agencia Nacional de Tierras (ANT)  
Gobierno de Colombia

**Slogan:** "Colombia es Reforma Agraria"

---

**Última Actualización:** 25 de Marzo de 2026  
**Versión:** 1.0
