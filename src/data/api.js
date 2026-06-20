const BASE = '/api/complaints';

export async function getComplaints() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Error cargando trámites');
  return res.json();
}

export async function createComplaint(data) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creando trámite');
  return res.json();
}

export async function updateComplaint(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error actualizando trámite');
  return res.json();
}

export async function patchComplaintStatus(id, estado) {
  const res = await fetch(`${BASE}/${id}/estado`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado })
  });
  if (!res.ok) throw new Error('Error actualizando estado');
  return res.json();
}

export async function deleteComplaint(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error eliminando trámite');
}
