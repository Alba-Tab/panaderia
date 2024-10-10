import axios from 'axios';

const API_URL = 'http://localhost:3001/roles'; // Cambia la URL según sea necesario

const roleService = {
    // Obtener permisos de un rol específico
    getPermisosByRoleId: async (roleId) => {
        try {
            const response = await axios.get(`${API_URL}/roles/${roleId}/permisos`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener permisos:', error);
            throw error; 
        }
    },

    // Actualizar rol
    updateRole: async (roleId, nombre, permisos) => {
        try {
            await axios.put(`${API_URL}/roles/${roleId}`, { nombre, permisos });
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
            throw error; 
        }
    }
};

export default roleService;
