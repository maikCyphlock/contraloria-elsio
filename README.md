# Sistema de Control y Recepción de Denuncias — Contraloría del Municipio Páez

Este proyecto es una aplicación web moderna e interactiva desarrollada en **React (con Vite)** para la **Oficina de Atención al Ciudadano (OAC)** de la Contraloría del Municipio Páez (Acarigua, Estado Portuguesa, Venezuela).

El objetivo principal del sistema es digitalizar, validar y gestionar de forma transparente y eficiente los trámites de denuncias, quejas, reclamos y peticiones presentados por los ciudadanos.

---

## 📋 ¿De qué trata el proyecto?

El sistema actúa como puente de comunicación y control gubernamental entre los ciudadanos y el órgano contralor municipal. Permite la captación formal de solicitudes civiles y dota a la contraloría de un panel administrativo para procesar y auditar dichos expedientes.

### Características Principales:
1. **Clasificación del Trámite:** Diferenciación clara entre *Denuncia* (irregularidades en el uso de recursos públicos), *Queja* (mala prestación de servicios), *Reclamo* (incumplimiento institucional) y *Petición* (solicitudes de información).
2. **Seguimiento a la Consulta Popular Nacional:** Sección integrada especializada para registrar irregularidades en los proyectos comunitarios aprobados por las asambleas de ciudadanos y financiados por el Estado.
3. **Formulario Ciudadano Validado:** Captación exhaustiva de datos del solicitante (identidad, contacto, ubicación) y datos geográficos e identitarios de los entes o personas señaladas.
4. **Panel de Control Administrativo (CRUD):**
   - **Visualización (Read):** Lista completa de expedientes con búsqueda inteligente.
   - **Creación Manual (Create):** Permite a los funcionarios ingresar denuncias recibidas de forma presencial.
   - **Edición y Cambio de Estado (Update):** Control del flujo del trámite (alternar entre "En revisión" y "Completado").
   - **Eliminación (Delete):** Borrado físico de expedientes bajo confirmación.
5. **Reporte General (Sin Filtros):** Generación instantánea de una sábana de datos formal en formato apto para impresión física o guardado en PDF de **todos** los registros del sistema sin aplicar ningún filtro restrictivo de búsqueda.

---

## 🛠️ Estructura del Código y Tecnologías

### Stack Tecnológico:
- **Core:** React 19 + Vite (Rápido tiempo de respuesta y recarga en caliente).
- **Iconografía:** `lucide-react` para elementos visuales modernos.
- **Estilos:** CSS3 nativo (`src/index.css`) con variables centralizadas y diseño responsivo para móviles y computadoras.
- **Persistencia:** API `LocalStorage` del navegador (los datos persisten de manera local tras recargar la página).

### Arquitectura de Archivos en `src/`:
* **`data/mockData.js`:** Actúa como la capa de acceso a datos (simulación de base de datos). Inicializa el sistema con datos semilla estructurados y maneja las lecturas y escrituras de LocalStorage de forma síncrona.
* **`index.css`:** Contiene el sistema de diseño visual (paleta de colores azul marino/dorado oficial, tipografías, botones adaptables, sombras premium y el formato especial de impresión para reportes).
* **`App.jsx`:** Componente raíz que maneja el enrutamiento interno mediante estados, la validación interactiva de datos y el flujo CRUD de expedientes.

---

## 🚀 Cómo Ejecutar el Proyecto

1. Asegúrate de tener instalado [Node.js](https://nodejs.org/).
2. Abre una terminal en la carpeta del proyecto e instala las dependencias:
   ```bash
   cd Homepage
   npm install
   ```
3. Ejecuta el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Abre en tu navegador la dirección indicada en la terminal (usualmente `http://localhost:5173`).

---

## 🔑 Explicación del Código Clave (Para Exámenes de Programación)

A continuación se analizan los fragmentos de código más importantes y su justificación técnica:

### 1. Enrutamiento Interno sin Librerías (State-Based Routing)
En lugar de usar `React Router`, la navegación entre las secciones del portal se controla reactivamente usando un estado simple en `App.jsx`:

```javascript
const [currentView, setCurrentView] = useState('home'); // home, register, admin, report
```

**Uso en el JSX:**
```jsx
{currentView === 'home' && <HomeView />}
{currentView === 'register' && <FormularioView />}
{currentView === 'admin' && <AdminDashboard />}
{currentView === 'report' && <ReporteGeneral />}
```
* **Por qué es importante:** Demuestra cómo React reconstruye el DOM Virtual de forma dinámica dependiendo de la evaluación de expresiones lógicas en el renderizado.

---

### 2. Guardado y Carga con LocalStorage (Persistencia)
En `src/data/mockData.js`, la aplicación interactúa con la memoria del navegador.

```javascript
export const getComplaints = () => {
  const data = localStorage.getItem("contraloria_complaints");
  if (!data) {
    localStorage.setItem("contraloria_complaints", JSON.stringify(initialComplaints));
    return initialComplaints;
  }
  return JSON.parse(data);
};
```
* **Concepto técnico:** 
  * `localStorage.getItem` y `setItem` solo manejan texto plano.
  * `JSON.stringify(objeto)` convierte una estructura compleja de JavaScript a una cadena de texto (JSON) para guardarla.
  * `JSON.parse(texto)` realiza el proceso inverso, convirtiendo el texto de vuelta a un objeto/arreglo manipulable por React.

---

### 3. Operación de Actualización (Update en CRUD)
Para actualizar los datos de una denuncia editada sin duplicarla en la base de datos:

```javascript
const handleSave = (e) => {
  e.preventDefault();
  // ... validaciones ...

  let updatedComplaints;

  if (editingComplaint) {
    // Modo Edición: Se mapea el arreglo y se sustituye el modificado
    updatedComplaints = complaints.map(c => 
      c.id === editingComplaint.id 
        ? { ...c, ...complaintData, estado: editingComplaint.estado } 
        : c
    );
  } else {
    // Modo Registro: Se crea un ID nuevo y se agrega al final del arreglo
    const nextId = `OAC-2026-${String(complaints.length + 1).padStart(4, '0')}`;
    const newRecord = { id: nextId, ...complaintData, fecha: "2026-06-12", estado: "En revisión" };
    updatedComplaints = [...complaints, newRecord];
  }

  setComplaints(updatedComplaints);
  saveComplaints(updatedComplaints);
};
```
* **Concepto técnico:** 
  * Se usa `.map()` porque es un método inmutable (retorna un nuevo arreglo en lugar de modificar el original, respetando el principio de inmutabilidad de React).
  * El operador spread `{...c, ...complaintData}` copia todas las propiedades anteriores del registro y sobrescribe únicamente las que han cambiado.

---

### 4. Tabla de Entradas Dinámicas (Arreglo en Estado)
Para que el usuario agregue dinámicamente filas de personas señaladas (involucrados):

```javascript
const [senales, setSenales] = useState([{ cedula: '', nombre: '', instancia: '', situr: '', rif: '' }]);

const addSenalRow = () => {
  setSenales([...senales, { cedula: '', nombre: '', instancia: '', situr: '', rif: '' }]);
};

const updateSenalRow = (index, field, value) => {
  const updated = senales.map((row, idx) => 
    idx === index ? { ...row, [field]: value } : row
  );
  setSenales(updated);
};
```
* **Concepto técnico:** Cada vez que cambia un input dentro de la celda de la tabla, `updateSenalRow` localiza la fila exacta usando su índice `index`, realiza una copia del objeto de esa fila y le asigna el nuevo valor de forma reactiva.

