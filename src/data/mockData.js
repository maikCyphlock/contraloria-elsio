export const initialComplaints = [
  {
    id: "OAC-2026-0001",
    tipo_tramite: "denuncia",
    es_consulta: "si",
    fecha: "2026-06-10",
    estado: "En revisión",
    solicitante: {
      tipo_doc: "V",
      nro_doc: "14820392",
      nombres: "Rodríguez Mendoza, Carlos Luis",
      sexo: "M",
      edad: 42,
      correo: "carlos.rodriguez@email.com",
      tel_cel: "0412-5551234",
      direccion: "Calle principal c/ Av. Libertador, Casa 45",
      municipio: "Páez"
    },
    señalados: [
      {
        cedula: "V-12048591",
        nombre: "Pérez Gómez, Juan Carlos",
        instancia: "Consejo Comunal Las Flores",
        situr: "CC-940294",
        rif: "G-20019283"
      }
    ],
    ubicacion_señalado: "Comunidad Las Flores, Sector 2",
    narracion: "Se reporta un presunto desvío de los fondos asignados en la Consulta Popular Nacional para la impermeabilización de los techos del bloque 3. A la fecha no se han iniciado los trabajos y los recursos ya fueron transferidos.",
    proyecto: {
      nombre_proyecto: "Impermeabilización de Techos Bloque 3",
      fecha_aprobacion: "2025-11-15",
      monto_proyecto: "450000",
      ente_financiador: "Consejo Federal de Gobierno"
    }
  },
  {
    id: "OAC-2026-0002",
    tipo_tramite: "queja",
    es_consulta: "no",
    fecha: "2026-06-11",
    estado: "Completado",
    solicitante: {
      tipo_doc: "V",
      nro_doc: "20881294",
      nombres: "García Colmenarez, Laura María",
      sexo: "F",
      edad: 28,
      correo: "laura.garcia@email.com",
      tel_cel: "0424-9988776",
      direccion: "Urbanización La Goajira, Calle 4, Casa 12",
      municipio: "Páez"
    },
    señalados: [
      {
        cedula: "",
        nombre: "Dirección de Servicios Públicos",
        instancia: "Alcaldía de Páez",
        situr: "",
        rif: "G-20000123"
      }
    ],
    ubicacion_señalado: "Sede de la Alcaldía de Páez, Acarigua",
    narracion: "Demoras excesivas y falta de recolección de basura acumulada en las principales avenidas del sector, provocando focos de contaminación que afectan a la salud pública de los residentes del sector.",
    proyecto: null
  }
];

export const getComplaints = () => {
  const data = localStorage.getItem("contraloria_complaints");
  if (!data) {
    localStorage.setItem("contraloria_complaints", JSON.stringify(initialComplaints));
    return initialComplaints;
  }
  return JSON.parse(data);
};

export const saveComplaints = (complaints) => {
  localStorage.setItem("contraloria_complaints", JSON.stringify(complaints));
};
