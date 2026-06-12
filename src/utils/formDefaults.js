export const EMPTY_SENALADO = {
  cedula: '',
  nombre: '',
  instancia: '',
  situr: '',
  rif: ''
};

export function getEmptyForm() {
  return {
    formType: 'denuncia',
    isConsulta: 'no',
    ubicacionSenalado: '',
    narracion: '',
    solicitante: {
      docType: 'V',
      docNum: '',
      name: '',
      gender: 'M',
      age: '',
      email: '',
      phone: '',
      address: ''
    },
    senales: [{ ...EMPTY_SENALADO }],
    proyecto: {
      name: '',
      date: '',
      amount: '',
      ente: ''
    }
  };
}
