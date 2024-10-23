import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const EditRoleModal = ({ role, onClose, onUpdate }) => {
    // Inicializa el estado del nombre y permisos seleccionados
    const [nombre, setNombre] = useState(role ? role.nombre : '');
    const [permisos, setPermisos] = useState([]); // Para almacenar los permisos disponibles
    const [selectedPermisos, setSelectedPermisos] = useState(role ? role.permisos : []); // Permisos seleccionados

    useEffect(() => {
        const fetchPermisos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/permisos/permisos`);
                setPermisos(response.data); // Supone que la respuesta es un array de permisos
            } catch (error) {
                console.error('Error al cargar los permisos:', error);
            }
        };

        fetchPermisos();
    }, []);

    const handlePermisoChange = (permisoId) => {
        if (selectedPermisos.includes(permisoId)) {
            setSelectedPermisos(selectedPermisos.filter(id => id !== permisoId)); // Desmarcar permiso
        } else {
            setSelectedPermisos([...selectedPermisos, permisoId]); // Marcar permiso
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/roles/roles/${role.ide}`, {
                nombre,
                permisos: selectedPermisos
            });
            onUpdate(); // Llamar a onUpdate para refrescar la lista de roles
            onClose(); // Cerrar el modal
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
        }
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>Editar Rol</h2>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <h3>Permisos</h3>
                <div className="permissions-list">
                    {permisos.map((permiso) => (
                        <label key={permiso.ide}>
                            <input
                                type="checkbox"
                                checked={selectedPermisos.includes(permiso.ide)}
                                onChange={() => handlePermisoChange(permiso.ide)}
                            />
                            {permiso.nombre} - {permiso.descripcion}
                        </label>
                    ))}
                </div>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};
