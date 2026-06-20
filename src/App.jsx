import { useState, useEffect } from 'react';
import { getComplaints, createComplaint, updateComplaint, patchComplaintStatus, deleteComplaint } from './data/api';
import AdminPage from './components/admin/AdminPage';
import ComplaintFormPage from './components/form/ComplaintFormPage';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Notification from './components/layout/Notification';
import HomePage from './components/home/HomePage';
import ReportPage from './components/report/ReportPage';
import { EMPTY_SENALADO, getEmptyForm } from './utils/formDefaults';

function App() {
  const [complaints, setComplaints] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [notification, setNotification] = useState(null);
  const [form, setForm] = useState(getEmptyForm());

  useEffect(() => {
    getComplaints().then(setComplaints).catch(() => showNotification('Error cargando datos desde la base de datos.'));
  }, []);

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  }

  function resetForm() {
    setForm(getEmptyForm());
    setEditingComplaint(null);
  }

  function goHome() { resetForm(); setCurrentView('home'); }
  function goRegister() { resetForm(); setCurrentView('register'); }
  function goAdmin() { resetForm(); setCurrentView('admin'); }

  function cancelForm() {
    const nextView = editingComplaint ? 'admin' : 'home';
    resetForm();
    setCurrentView(nextView);
  }

  function updateFormField(field, value) { setForm({ ...form, [field]: value }); }
  function updateSolicitanteField(field, value) { setForm({ ...form, solicitante: { ...form.solicitante, [field]: value } }); }
  function updateProyectoField(field, value) { setForm({ ...form, proyecto: { ...form.proyecto, [field]: value } }); }

  function addSenalRow() { setForm({ ...form, senales: [...form.senales, { ...EMPTY_SENALADO }] }); }

  function updateSenalRow(index, field, value) {
    const updatedSenales = form.senales.map((row, i) => i === index ? { ...row, [field]: value } : row);
    setForm({ ...form, senales: updatedSenales });
  }

  function removeSenalRow(index) {
    if (form.senales.length === 1) return;
    setForm({ ...form, senales: form.senales.filter((_, i) => i !== index) });
  }

  function buildComplaintData() {
    return {
      tipo_tramite: form.formType,
      es_consulta: form.isConsulta,
      solicitante: {
        tipo_doc: form.solicitante.docType,
        nro_doc: form.solicitante.docNum,
        nombres: form.solicitante.name,
        sexo: form.solicitante.gender,
        edad: parseInt(form.solicitante.age) || 0,
        correo: form.solicitante.email,
        tel_cel: form.solicitante.phone,
        direccion: form.solicitante.address,
        municipio: 'Páez'
      },
      señalados: form.senales,
      ubicacion_señalado: form.ubicacionSenalado,
      narracion: form.narracion,
      proyecto: form.isConsulta === 'si' ? {
        nombre_proyecto: form.proyecto.name,
        fecha_aprobacion: form.proyecto.date,
        monto_proyecto: form.proyecto.amount,
        ente_financiador: form.proyecto.ente
      } : null
    };
  }

  async function saveForm(event) {
    event.preventDefault();

    if (!form.solicitante.docNum || !form.solicitante.name || !form.solicitante.email || !form.narracion) {
      alert('Por favor complete los campos obligatorios (*)');
      return;
    }

    const complaintData = buildComplaintData();

    try {
      if (editingComplaint) {
        const updated = await updateComplaint(editingComplaint.id, {
          ...complaintData,
          estado: editingComplaint.estado,
          fecha: editingComplaint.fecha
        });
        setComplaints(prev => prev.map(c => c.id === editingComplaint.id ? updated : c));
        showNotification(`Trámite ${editingComplaint.id} actualizado con éxito.`);
      } else {
        const created = await createComplaint({
          ...complaintData,
          fecha: new Date().toISOString().split('T')[0],
          estado: 'En revisión'
        });
        setComplaints(prev => [...prev, created]);
        showNotification(`Trámite registrado con éxito. Expediente: ${created.id}`);
      }
    } catch {
      showNotification('Error guardando el trámite. Intente nuevamente.');
      return;
    }

    resetForm();
    setCurrentView('admin');
  }

  async function handleDeleteComplaint(id) {
    if (!window.confirm(`¿Está seguro de que desea eliminar el trámite ${id}?`)) return;
    try {
      await deleteComplaint(id);
      setComplaints(prev => prev.filter(c => c.id !== id));
      showNotification(`Trámite ${id} eliminado correctamente.`);
    } catch {
      showNotification('Error eliminando el trámite.');
    }
  }

  function startEdit(complaint) {
    setEditingComplaint(complaint);
    setForm({
      formType: complaint.tipo_tramite,
      isConsulta: complaint.es_consulta || 'no',
      ubicacionSenalado: complaint.ubicacion_señalado || '',
      narracion: complaint.narracion || '',
      solicitante: {
        docType: complaint.solicitante.tipo_doc,
        docNum: complaint.solicitante.nro_doc,
        name: complaint.solicitante.nombres,
        gender: complaint.solicitante.sexo || 'M',
        age: complaint.solicitante.edad || '',
        email: complaint.solicitante.correo,
        phone: complaint.solicitante.tel_cel,
        address: complaint.solicitante.direccion
      },
      senales: complaint.señalados?.length > 0 ? complaint.señalados : [{ ...EMPTY_SENALADO }],
      proyecto: {
        name: complaint.proyecto?.nombre_proyecto || '',
        date: complaint.proyecto?.fecha_aprobacion || '',
        amount: complaint.proyecto?.monto_proyecto || '',
        ente: complaint.proyecto?.ente_financiador || ''
      }
    });
    setCurrentView('register');
  }

  async function toggleStatus(id) {
    const complaint = complaints.find(c => c.id === id);
    if (!complaint) return;
    const nextState = complaint.estado === 'En revisión' ? 'Completado' : 'En revisión';
    try {
      const updated = await patchComplaintStatus(id, nextState);
      setComplaints(prev => prev.map(c => c.id === id ? updated : c));
      showNotification(`Estado del trámite ${id} modificado.`);
    } catch {
      showNotification('Error actualizando el estado.');
    }
  }

  const filteredComplaints = complaints.filter((complaint) => {
    const query = searchQuery.toLowerCase();
    return (
      complaint.id.toLowerCase().includes(query) ||
      complaint.solicitante.nombres.toLowerCase().includes(query) ||
      complaint.solicitante.nro_doc.includes(searchQuery)
    );
  });

  return (
    <div className="app-wrapper">
      <Notification message={notification} />

      <Header
        currentView={currentView}
        editingComplaint={editingComplaint}
        onGoHome={goHome}
        onGoRegister={goRegister}
        onGoAdmin={goAdmin}
      />

      {currentView === 'home' && (
        <HomePage complaints={complaints} onRegister={() => setCurrentView('register')} onAdmin={() => setCurrentView('admin')} />
      )}

      {currentView === 'register' && (
        <ComplaintFormPage
          form={form}
          editingComplaint={editingComplaint}
          onSubmit={saveForm}
          onCancel={cancelForm}
          onFieldChange={updateFormField}
          onSolicitanteChange={updateSolicitanteField}
          onProyectoChange={updateProyectoField}
          onAddSenal={addSenalRow}
          onUpdateSenal={updateSenalRow}
          onRemoveSenal={removeSenalRow}
        />
      )}

      {currentView === 'admin' && (
        <AdminPage
          complaints={filteredComplaints}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          onReport={() => setCurrentView('report')}
          onAdd={goRegister}
          onEdit={startEdit}
          onDelete={handleDeleteComplaint}
          onToggleStatus={toggleStatus}
        />
      )}

      {currentView === 'report' && (
        <ReportPage complaints={complaints} onClose={() => setCurrentView('admin')} />
      )}

      <Footer />
    </div>
  );
}

export default App;
