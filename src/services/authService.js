import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';


// Función de login
export const login = async (codigo, password) => {
  const response = await axios.post(`${API_URL}/login`, { codigo, password });
  return response.data;
};
