import { Router } from 'express';
import db from '../db.js';

const router = Router();

function toRow(complaint) {
  return {
    tipo_tramite: complaint.tipo_tramite,
    es_consulta: complaint.es_consulta,
    fecha: complaint.fecha,
    estado: complaint.estado,
    solicitante: JSON.stringify(complaint.solicitante),
    senalados: JSON.stringify(complaint.señalados ?? []),
    ubicacion_senalado: complaint.ubicacion_señalado ?? '',
    narracion: complaint.narracion ?? '',
    proyecto: complaint.proyecto ? JSON.stringify(complaint.proyecto) : null
  };
}

function fromRow(row) {
  return {
    id: row.id,
    tipo_tramite: row.tipo_tramite,
    es_consulta: row.es_consulta,
    fecha: row.fecha,
    estado: row.estado,
    solicitante: JSON.parse(row.solicitante),
    señalados: JSON.parse(row.senalados),
    ubicacion_señalado: row.ubicacion_senalado,
    narracion: row.narracion,
    proyecto: row.proyecto ? JSON.parse(row.proyecto) : null
  };
}

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT * FROM complaints ORDER BY fecha ASC').all();
  res.json(rows.map(fromRow));
});

router.post('/', (req, res) => {
  const { cnt } = db.prepare('SELECT COUNT(*) as cnt FROM complaints').get();
  const id = `OAC-2026-${String(cnt + 1).padStart(4, '0')}`;
  const row = { id, ...toRow(req.body) };

  db.prepare(`
    INSERT INTO complaints
      (id, tipo_tramite, es_consulta, fecha, estado, solicitante, senalados, ubicacion_senalado, narracion, proyecto)
    VALUES
      (@id, @tipo_tramite, @es_consulta, @fecha, @estado, @solicitante, @senalados, @ubicacion_senalado, @narracion, @proyecto)
  `).run(row);

  res.status(201).json(fromRow(db.prepare('SELECT * FROM complaints WHERE id = ?').get(id)));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const row = toRow(req.body);

  db.prepare(`
    UPDATE complaints SET
      tipo_tramite = @tipo_tramite, es_consulta = @es_consulta, fecha = @fecha, estado = @estado,
      solicitante = @solicitante, senalados = @senalados, ubicacion_senalado = @ubicacion_senalado,
      narracion = @narracion, proyecto = @proyecto
    WHERE id = @id
  `).run({ ...row, id });

  res.json(fromRow(db.prepare('SELECT * FROM complaints WHERE id = ?').get(id)));
});

router.patch('/:id/estado', (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  db.prepare('UPDATE complaints SET estado = ? WHERE id = ?').run(estado, id);
  res.json(fromRow(db.prepare('SELECT * FROM complaints WHERE id = ?').get(id)));
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM complaints WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

export default router;
