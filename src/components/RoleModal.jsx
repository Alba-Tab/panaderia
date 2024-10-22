import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleModal = ({ role, onClose, onUpdate }) => {
    const [nombre, setNombre] = useState(role.nombre);
    const [permisos, setPermisos] = useState([]);

    useEffect(() => {
        const fetchPermisos = async () => {
            const response = await axios.get(`http://localhost:3001/user/roles/${role.id}/permisos`);
            setPermisos(response.data);
        };
        fetchPermisos();
    }, [role]);

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/user/roles/${role.id}`, { nombre, permisos });
            onUpdate(); // Llamar a onUpdate para refrescar la lista de roles
            onClose(); // Cerrar el modal
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
        }
    };

    const handlePermisoChange = (id) => {
        // Crear una nueva copia de los permisos con el estado actualizado
        const updatedPermisos = permisos.map(permiso =>
            permiso.id === id ? { ...permiso, tiene: !permiso.tiene } : permiso
        );
        setPermisos(updatedPermisos);
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>Editar Rol</h2>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <h3>Permisos:</h3>
                {permisos.map((permiso) => (
                    <div key={permiso.id}>
                        <input
                            type="checkbox"
                            checked={permiso.tiene}
                            onChange={() => handlePermisoChange(permiso.id)}
                        />
                        <label>{permiso.nombre}</label>
                    </div>
                ))}
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default RoleModal;
