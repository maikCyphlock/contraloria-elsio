import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, '../contraloria.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS complaints (
    id TEXT PRIMARY KEY,
    tipo_tramite TEXT,
    es_consulta TEXT,
    fecha TEXT,
    estado TEXT,
    solicitante TEXT,
    senalados TEXT,
    ubicacion_senalado TEXT,
    narracion TEXT,
    proyecto TEXT
  )
`);

const count = db.prepare('SELECT COUNT(*) as cnt FROM complaints').get().cnt;

if (count === 0) {
  const seed = db.prepare(`
    INSERT INTO complaints
      (id, tipo_tramite, es_consulta, fecha, estado, solicitante, senalados, ubicacion_senalado, narracion, proyecto)
    VALUES
      (@id, @tipo_tramite, @es_consulta, @fecha, @estado, @solicitante, @senalados, @ubicacion_senalado, @narracion, @proyecto)
  `);

  seed.run({
    id: 'OAC-2026-0001',
    tipo_tramite: 'denuncia',
    es_consulta: 'si',
    fecha: '2026-06-10',
    estado: 'En revisión',
    solicitante: JSON.stringify({
      tipo_doc: 'V', nro_doc: '14820392', nombres: 'Rodríguez Mendoza, Carlos Luis',
      sexo: 'M', edad: 42, correo: 'carlos.rodriguez@email.com',
      tel_cel: '0412-5551234', direccion: 'Calle principal c/ Av. Libertador, Casa 45', municipio: 'Páez'
    }),
    senalados: JSON.stringify([{
      cedula: 'V-12048591', nombre: 'Pérez Gómez, Juan Carlos',
      instancia: 'Consejo Comunal Las Flores', situr: 'CC-940294', rif: 'G-20019283'
    }]),
    ubicacion_senalado: 'Comunidad Las Flores, Sector 2',
    narracion: 'Se reporta un presunto desvío de los fondos asignados en la Consulta Popular Nacional para la impermeabilización de los techos del bloque 3.',
    proyecto: JSON.stringify({
      nombre_proyecto: 'Impermeabilización de Techos Bloque 3',
      fecha_aprobacion: '2025-11-15', monto_proyecto: '450000', ente_financiador: 'Consejo Federal de Gobierno'
    })
  });

  seed.run({
    id: 'OAC-2026-0002',
    tipo_tramite: 'queja',
    es_consulta: 'no',
    fecha: '2026-06-11',
    estado: 'Completado',
    solicitante: JSON.stringify({
      tipo_doc: 'V', nro_doc: '20881294', nombres: 'García Colmenarez, Laura María',
      sexo: 'F', edad: 28, correo: 'laura.garcia@email.com',
      tel_cel: '0424-9988776', direccion: 'Urbanización La Goajira, Calle 4, Casa 12', municipio: 'Páez'
    }),
    senalados: JSON.stringify([{
      cedula: '', nombre: 'Dirección de Servicios Públicos',
      instancia: 'Alcaldía de Páez', situr: '', rif: 'G-20000123'
    }]),
    ubicacion_senalado: 'Sede de la Alcaldía de Páez, Acarigua',
    narracion: 'Demoras excesivas y falta de recolección de basura acumulada en las principales avenidas del sector.',
    proyecto: null
  });
}

export default db;
