import { useState } from 'react';
import { getComplaints, saveComplaints } from './data/mockData';
import AdminPage from './components/admin/AdminPage';
import ComplaintFormPage from './components/form/ComplaintFormPage';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Notification from './components/layout/Notification';
import HomePage from './components/home/HomePage';
import ReportPage from './components/report/ReportPage';
import { EMPTY_SENALADO, getEmptyForm } from './utils/formDefaults';

function App() {
  const [complaints, setComplaints] = useState(() => getComplaints());
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [notification, setNotification] = useState(null);
  const [form, setForm] = useState(getEmptyForm());


  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  }

  function resetForm() {
    setForm(getEmptyForm());
    setEditingComplaint(null);
  }

  function goHome() {
    resetForm();
    setCurrentView('home');
  }

  function goRegister() {
    resetForm();
    setCurrentView('register');
  }

  function goAdmin() {
    resetForm();
    setCurrentView('admin');
  }

  function cancelForm() {
    const nextView = editingComplaint ? 'admin' : 'home';
    resetForm();
    setCurrentView(nextView);
  }

  function updateFormField(field, value) {
    setForm({ ...form, [field]: value });
  }

  function updateSolicitanteField(field, value) {
    setForm({
      ...form,
      solicitante: { ...form.solicitante, [field]: value }
    });
  }

  function updateProyectoField(field, value) {
    setForm({
      ...form,
      proyecto: { ...form.proyecto, [field]: value }
    });
  }

  function addSenalRow() {
    setForm({
      ...form,
      senales: [...form.senales, { ...EMPTY_SENALADO }]
    });
  }

  function updateSenalRow(index, field, value) {
    const updatedSenales = form.senales.map((row, rowIndex) => {
      if (rowIndex === index) {
        return { ...row, [field]: value };
      }

      return row;
    });

    setForm({ ...form, senales: updatedSenales });
  }

  function removeSenalRow(index) {
    if (form.senales.length === 1) {
      return;
    }

    const updatedSenales = form.senales.filter((row, rowIndex) => rowIndex !== index);
    setForm({ ...form, senales: updatedSenales });
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

  function saveForm(event) {
    event.preventDefault();

    if (!form.solicitante.docNum || !form.solicitante.name || !form.solicitante.email || !form.narracion) {
      alert('Por favor complete los campos obligatorios (*)');
      return;
    }

    const complaintData = buildComplaintData();
    let updatedComplaints;

    if (editingComplaint) {
      updatedComplaints = complaints.map((complaint) => {
        if (complaint.id === editingComplaint.id) {
          return { ...complaint, ...complaintData, estado: editingComplaint.estado };
        }

        return complaint;
      });
      showNotification(`Trámite ${editingComplaint.id} actualizado con éxito.`);
    } else {
      const nextId = `OAC-2026-${String(complaints.length + 1).padStart(4, '0')}`;
      const newComplaint = {
        id: nextId,
        ...complaintData,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'En revisión'
      };

      updatedComplaints = [...complaints, newComplaint];
      showNotification(`Trámite registrado con éxito. Expediente: ${nextId}`);
    }

    setComplaints(updatedComplaints);
    saveComplaints(updatedComplaints);
    resetForm();
    setCurrentView('admin');
  }

  function deleteComplaint(id) {
    if (!window.confirm(`¿Está seguro de que desea eliminar el trámite ${id}?`)) {
      return;
    }

    const updatedComplaints = complaints.filter((complaint) => complaint.id !== id);
    setComplaints(updatedComplaints);
    saveComplaints(updatedComplaints);
    showNotification(`Trámite ${id} eliminado correctamente.`);
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
      senales: complaint.señalados && complaint.señalados.length > 0 ? complaint.señalados : [{ ...EMPTY_SENALADO }],
      proyecto: {
        name: complaint.proyecto?.nombre_proyecto || '',
        date: complaint.proyecto?.fecha_aprobacion || '',
        amount: complaint.proyecto?.monto_proyecto || '',
        ente: complaint.proyecto?.ente_financiador || ''
      }
    });
    setCurrentView('register');
  }

  function toggleStatus(id) {
    const updatedComplaints = complaints.map((complaint) => {
      if (complaint.id === id) {
        const nextState = complaint.estado === 'En revisión' ? 'Completado' : 'En revisión';
        return { ...complaint, estado: nextState };
      }

      return complaint;
    });

    setComplaints(updatedComplaints);
    saveComplaints(updatedComplaints);
    showNotification(`Estado del trámite ${id} modificado.`);
  }

  const filteredComplaints = complaints.filter((complaint) => {
    const query = searchQuery.toLowerCase();
    const idMatches = complaint.id.toLowerCase().includes(query);
    const nameMatches = complaint.solicitante.nombres.toLowerCase().includes(query);
    const documentMatches = complaint.solicitante.nro_doc.includes(searchQuery);

    return idMatches || nameMatches || documentMatches;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb]">
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
          onDelete={deleteComplaint}
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
