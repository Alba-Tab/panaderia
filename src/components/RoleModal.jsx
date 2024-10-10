import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleModal = ({ role, onClose, onUpdate }) => {
    const [nombre, setNombre] = useState(role.nombre);
    const [permisos, setPermisos] = useState([]);

    useEffect(() => {
        const fetchPermisos = async () => {
            try{
                const permisosData = await roleService.getPermisosByRoleId(role.id);
                setPermisos(permisosData);
            } catch (error) {
                console.error('Error al cargar los permisos:', error);
            }
        };
        fetchPermisos();
    }, [role]);

    const handleSave = async () => {
        try {
            await roleService.updateRole(role.id, nombre, permisos);
            onUpdate(); // Refresca la lista de roles
            onClose(); // Cierra el modal
        } catch (error) {
            console.error('Error al guardar el rol:', error);
        }
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
                            onChange={() => {
                                permiso.tiene = !permiso.tiene; // Alternar estado del permiso
                                setPermisos([...permisos]); // Actualizar el estado
                            }}
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
