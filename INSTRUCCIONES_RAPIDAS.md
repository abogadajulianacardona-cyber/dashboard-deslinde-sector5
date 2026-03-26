# 🚀 INSTRUCCIONES RÁPIDAS - Migración Dashboard a GitHub Pages

## ⏱️ Tiempo Total: 15 minutos

---

## 📦 Paso 1: Descargar Archivos (2 minutos)

Has recibido el archivo **`dashboard-deslinde-sector5-COMPLETO.zip`** que contiene:

```
dashboard-migracion-completo/
├── index.html                          # Dashboard principal
├── app.js                              # Lógica JavaScript
├── assets/                             # Imágenes
│   ├── ant-logo.png
│   ├── gobierno-colombia.png
│   └── ant-banner.png
├── README.md                           # Documentación del repositorio
└── GUIA_MIGRACION_DASHBOARD.md        # Guía completa (3 opciones)
```

**Acción:** Descomprime el archivo ZIP en tu computadora.

---

## 🌐 Paso 2: Crear Cuenta en GitHub (3 minutos)

**Si ya tienes cuenta GitHub, salta al Paso 3.**

1. Ir a: https://github.com
2. Click en **"Sign up"**
3. Ingresar:
   - Email
   - Contraseña
   - Username (ejemplo: `ant-colombia`)
4. Verificar email
5. **¡Listo!** Ya tienes cuenta GitHub gratuita.

---

## 📁 Paso 3: Crear Repositorio (3 minutos)

1. **Iniciar sesión en GitHub**
2. **Click en "+" (arriba derecha) → "New repository"**
3. **Configurar repositorio:**
   - **Repository name:** `dashboard-deslinde-sector5`
   - **Description:** `Dashboard en tiempo real para seguimiento de notificaciones - Sector 5`
   - **Visibilidad:** 
     - ✅ **Public** (recomendado - GitHub Pages es gratis)
     - O **Private** (si tienes GitHub Pro)
   - ✅ Marcar **"Add a README file"**
4. **Click "Create repository"**

---

## 📤 Paso 4: Subir Archivos (4 minutos)

1. **Dentro de tu repositorio recién creado:**
2. **Click en "Add file" → "Upload files"**
3. **Arrastrar TODOS los archivos descomprimidos:**
   - `index.html`
   - `app.js`
   - `README.md`
   - `GUIA_MIGRACION_DASHBOARD.md`
   - Carpeta `assets/` completa (con las 3 imágenes)

4. **En "Commit changes":**
   - Mensaje: `Initial commit - Dashboard Deslinde Sector 5`
5. **Click "Commit changes"**

⏳ **Esperar a que termine de subir (puede tardar 1-2 minutos por las imágenes)**

---

## 🚀 Paso 5: Activar GitHub Pages (2 minutos)

1. **En tu repositorio, click en "Settings" ⚙️** (pestaña superior)
2. **En el menú lateral izquierdo, click en "Pages"**
3. **En la sección "Source":**
   - **Branch:** Seleccionar `main` (o `master`)
   - **Folder:** Seleccionar `/ (root)`
4. **Click "Save"**

✅ **¡Listo!** Verás un mensaje:

```
Your site is live at https://[tu-usuario].github.io/dashboard-deslinde-sector5/
```

⏳ **Esperar 1-2 minutos para que se publique.**

---

## ✅ Paso 6: Verificar Dashboard (1 minuto)

1. **Abrir la URL:** `https://[tu-usuario].github.io/dashboard-deslinde-sector5/`
2. **Verificar que carga:**
   - ✅ Logos ANT y Gobierno de Colombia
   - ✅ Banner de resolución
   - ✅ 3 ETAPAS con datos (ETAPA 1 debe mostrar 493 registros totales)
   - ✅ Gráficos
   - ✅ Filtros
   - ✅ Tabla de registros

3. **Si todo funciona correctamente:**
   - ✅ El dashboard se actualiza automáticamente cada 5 minutos
   - ✅ Ya está listo para compartir con el equipo

---

## 🔐 IMPORTANTE: Verificar Google Sheet Público

Para que el dashboard funcione, el Google Sheet **DEBE** ser público (solo lectura):

1. **Abrir el Google Sheet:**
   ```
   https://docs.google.com/spreadsheets/d/1lFmHYE8f97PN0PtiRli74NOgP5t7K3Z7/edit
   ```

2. **Click en "Compartir" (botón superior derecha)**

3. **En "Acceso general":**
   - Cambiar de "Restringido" a **"Cualquier persona con el enlace"**
   - **Rol:** "Lector" (solo lectura)

4. **Click "Listo"**

⚠️ **Nota:** Esto NO permite que otros editen el sheet. Solo lo pueden leer. Solo tú y los editores autorizados pueden modificarlo.

---

## 🎉 ¡Dashboard Migrado Exitosamente!

**URL Permanente:** `https://[tu-usuario].github.io/dashboard-deslinde-sector5/`

### ✅ Características Activas:

- 🔄 **Auto-actualización cada 5 minutos**
- 📊 **493 registros en tiempo real**
- 🎯 **3 Etapas de notificación**
- 🔍 **4 Filtros dinámicos**
- 📈 **Gráficos interactivos**
- 📱 **Diseño responsivo**

---

## 🔧 Cómo Editar el Dashboard (Para el Equipo)

### Opción A: Editar Directamente en GitHub (Más Fácil)

1. **Ir al repositorio en GitHub**
2. **Click en el archivo que deseas editar** (ejemplo: `app.js`)
3. **Click en el ícono de lápiz ✏️** ("Edit this file")
4. **Hacer cambios en el código**
5. **Scroll down → "Commit changes"**
6. **Agregar descripción del cambio**
7. **Click "Commit changes"**

✅ **Los cambios se publican automáticamente en 1-2 minutos**

### Opción B: Editar en tu Computadora (Para Cambios Grandes)

**Requisitos:** Git instalado en tu computadora

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

✅ **Los cambios se publican automáticamente en 1-2 minutos**

---

## 📞 Cambios Comunes

### 1. Cambiar Intervalo de Actualización

**Archivo:** `app.js` (línea 6)

```javascript
// Cambiar de 5 minutos a 3 minutos:
const REFRESH_INTERVAL = 3 * 60 * 1000;

// O a 10 minutos:
const REFRESH_INTERVAL = 10 * 60 * 1000;
```

### 2. Cambiar URL del Google Sheet

**Archivo:** `app.js` (línea 5)

```javascript
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/TU_SHEET_ID/export?format=csv&gid=TU_GID';
```

### 3. Cambiar Colores Corporativos

**Archivo:** `index.html` (buscar `<style>` al inicio)

```css
:root {
    --ant-gold: #F9A825;    /* Cambiar aquí */
    --ant-green: #1B5E20;   /* Cambiar aquí */
}
```

---

## 🆘 Solución de Problemas

### ❌ Problema: Dashboard no carga datos

**Solución:**
1. Verificar que el Google Sheet es público (ver sección "IMPORTANTE" arriba)
2. Abrir consola del navegador (F12) y revisar errores
3. Verificar URL del sheet en `app.js` línea 5

### ❌ Problema: Cambios no se reflejan

**Solución:**
1. Esperar 1-2 minutos (GitHub Pages tarda en actualizar)
2. Hacer hard refresh: `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)
3. Limpiar caché del navegador

### ❌ Problema: Página muestra "404 Not Found"

**Solución:**
1. Verificar que GitHub Pages está activado (Settings → Pages)
2. Verificar que el Branch es `main` y Folder es `/ (root)`
3. Esperar 2-3 minutos más (primera publicación puede tardar)

---

## 📚 Documentación Completa

Para más detalles, consultar:

- **`README.md`** - Documentación del proyecto
- **`GUIA_MIGRACION_DASHBOARD.md`** - Guía completa con 3 opciones de migración (GitHub Pages, Google Apps Script, Netlify)

---

## 🎯 Próximos Pasos (Opcional)

### 1. Dominio Personalizado

Si deseas usar un dominio propio (ejemplo: `dashboard.ant.gov.co`):

1. **En GitHub Pages settings, agregar tu dominio en "Custom domain"**
2. **En tu proveedor de dominio, agregar registro DNS:**
   ```
   Tipo: CNAME
   Nombre: dashboard
   Valor: [tu-usuario].github.io
   ```
3. **Esperar propagación DNS (1-24 horas)**

### 2. Agregar Colaboradores

Para que otros miembros del equipo puedan editar:

1. **En el repositorio, ir a Settings → Collaborators**
2. **Click "Add people"**
3. **Ingresar username o email de GitHub del colaborador**
4. **Enviar invitación**

### 3. Proteger Rama Principal

Para evitar cambios accidentales:

1. **Settings → Branches**
2. **Add rule**
3. **Branch name pattern:** `main`
4. **Marcar "Require pull request reviews before merging"**
5. **Save changes**

---

## ✅ Checklist Final

- [ ] Cuenta GitHub creada
- [ ] Repositorio `dashboard-deslinde-sector5` creado
- [ ] Archivos subidos (index.html, app.js, assets/, README.md, GUIA_MIGRACION_DASHBOARD.md)
- [ ] GitHub Pages activado
- [ ] URL del dashboard funcionando
- [ ] Google Sheet configurado como público (solo lectura)
- [ ] Dashboard carga 493 registros correctamente
- [ ] Filtros funcionando
- [ ] Gráficos mostrándose correctamente
- [ ] URL compartida con el equipo

---

**🎉 ¡Felicitaciones! Tu dashboard está ahora en una ubicación permanente con actualización automática cada 5 minutos.**

**URL Permanente:** `https://[tu-usuario].github.io/dashboard-deslinde-sector5/`

---

**Fecha:** 25 de Marzo de 2026  
**Soporte:** Consultar `GUIA_MIGRACION_DASHBOARD.md` para más opciones y detalles técnicos.
