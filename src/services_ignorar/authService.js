// services/userService.js
import api from './api';

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al iniciar sesión';
  }
};

export const fetchUsers = () => {
  return axios.get('/api/users');
};
