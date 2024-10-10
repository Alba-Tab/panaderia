// services/invoiceService.js
import api from './api';

export const fetchInvoices = async () => {
  try {
    const response = await api.get('/invoices');
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener las facturas';
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al crear la factura';
  }
};
