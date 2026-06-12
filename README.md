# Sistema de Denuncias - Contraloría del Municipio Páez

Aplicación web para registrar, consultar y administrar denuncias, quejas, reclamos y peticiones de la Oficina de Atención al Ciudadano (OAC) de la Contraloría del Municipio Páez.

El proyecto está hecho con **React + Vite** y fue refactorizado en componentes pequeños para que sea fácil de entender, mantener y modificar por desarrolladores junior.

---

## Funcionalidades principales

- Página de inicio con resumen de trámites.
- Registro de nuevas solicitudes o denuncias.
- Edición de trámites existentes.
- Eliminación de registros.
- Búsqueda por expediente, solicitante o documento.
- Cambio rápido de estado entre:
  - `En revisión`
  - `Completado`
- Reporte general imprimible o exportable como PDF desde el navegador.
- Persistencia local usando `localStorage` mediante datos mock.

---

## Tecnologías usadas

- React
- Vite
- JavaScript
- CSS
- lucide-react para íconos
- ESLint

---

## Instalación

1. Clonar o descargar el proyecto.

2. Entrar a la carpeta del proyecto:

```bash
cd "Contraloria Pagina Denuncia/Homepage"
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

5. Abrir en el navegador la URL que indique Vite, normalmente:

```text
http://localhost:5173
```

---

## Comandos disponibles

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Genera la versión de producción en la carpeta `dist`.

```bash
npm run preview
```

Permite previsualizar la versión generada para producción.

```bash
npm run lint
```

Ejecuta ESLint para revisar errores de código.

---

## Estructura del proyecto

```text
src/
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── assets/
├── data/
│   └── mockData.js
├── utils/
│   └── formDefaults.js
└── components/
    ├── admin/
    │   ├── AdminPage.jsx
    │   ├── ComplaintTable.jsx
    │   └── SearchBox.jsx
    ├── form/
    │   ├── ApplicantSection.jsx
    │   ├── ClassificationSection.jsx
    │   ├── ComplaintFormPage.jsx
    │   ├── FormSection.jsx
    │   ├── InvolvedSection.jsx
    │   ├── NarrationSection.jsx
    │   └── ProjectSection.jsx
    ├── home/
    │   ├── HomePage.jsx
    │   └── MetricCard.jsx
    ├── layout/
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   └── Notification.jsx
    └── report/
        └── ReportPage.jsx
```

---

## Explicación simple de carpetas

### `src/App.jsx`

Archivo principal de la aplicación.

Aquí se maneja:

- La vista actual: inicio, formulario, admin o reporte.
- La lista de trámites.
- Crear, editar y eliminar registros.
- Guardar datos en `localStorage`.
- Mostrar notificaciones.

### `src/components/layout`

Componentes comunes de la página:

- `Header.jsx`: menú superior.
- `Footer.jsx`: pie de página.
- `Notification.jsx`: mensaje flotante de éxito.

### `src/components/home`

Componentes de la pantalla inicial:

- `HomePage.jsx`: portada principal.
- `MetricCard.jsx`: tarjetas con métricas.

### `src/components/admin`

Componentes del panel administrativo:

- `AdminPage.jsx`: pantalla principal del panel.
- `SearchBox.jsx`: campo de búsqueda.
- `ComplaintTable.jsx`: tabla de trámites.

### `src/components/form`

Componentes del formulario de denuncia:

- `ComplaintFormPage.jsx`: formulario completo.
- `ClassificationSection.jsx`: tipo de trámite.
- `ApplicantSection.jsx`: datos del solicitante.
- `InvolvedSection.jsx`: datos del señalado o involucrado.
- `ProjectSection.jsx`: datos de consulta popular.
- `NarrationSection.jsx`: narración de hechos.
- `FormSection.jsx`: componente reutilizable para secciones.

### `src/components/report`

Componentes del reporte:

- `ReportPage.jsx`: reporte general imprimible.

### `src/data/mockData.js`

Contiene funciones para leer y guardar trámites usando datos locales.

### `src/utils/formDefaults.js`

Contiene los valores iniciales del formulario.

---

## Flujo básico de uso

1. Entrar a la página de inicio.
2. Presionar **Registrar Solicitud / Denuncia**.
3. Completar los datos obligatorios.
4. Guardar el trámite.
5. Revisar el registro en el **Panel Admin**.
6. Editar, eliminar o cambiar estado si es necesario.
7. Generar reporte desde el panel administrativo.

---

## Notas para desarrolladores junior

- Cada componente tiene una responsabilidad pequeña.
- Los componentes reciben datos mediante `props`.
- La lógica principal está centralizada en `App.jsx`.
- Evitar agregar demasiada lógica dentro de los componentes visuales.
- Si una sección crece mucho, crear un nuevo componente dentro de la carpeta correspondiente.

Ejemplo:

```text
Si se agrega una nueva sección al formulario,
crear un archivo nuevo en:

src/components/form/NuevaSeccion.jsx
```

---

## Datos y persistencia

Actualmente la aplicación usa `localStorage`, por lo que los datos quedan guardados en el navegador del usuario.

Esto significa que:

- No hay backend real todavía.
- Los datos no se comparten entre computadoras.
- Si se limpia el almacenamiento del navegador, los datos pueden perderse.

---

## Build de producción

Para generar los archivos finales:

```bash
npm run build
```

El resultado queda en:

```text
dist/
```

Esa carpeta puede ser desplegada en un servidor estático.

---

## Estado actual

El proyecto compila correctamente con:

```bash
npm run build
```

Y pasa la revisión de código con:

```bash
npm run lint
```
