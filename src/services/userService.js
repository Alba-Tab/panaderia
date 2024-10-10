import axios from 'axios';

const API_URL = 'http://localhost:3001/user';

// Obtener usuario actual
export const fetchCurrentUser = async (codigo) => {
    const response = await axios.get(`${API_URL}/usuarios/me`, {
        params: { codigo }
    });
    return response.data;
};

// Obtener todos los usuarios
export const fetchUsers = async (codigo, userRole) => {
    const response = await axios.get(`${API_URL}/usuarios`, {
        params: { codigo, userRole }
    });
    return response.data;
};

// Eliminar usuario
export const deleteUser = async (codigo, userRole) => {
    await axios.delete(`${API_URL}/usuarios/${codigo}`, {
        params: { userRole }
    });
};
