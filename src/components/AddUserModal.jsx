import React, { useState,useEffect } from 'react'
import axios from 'axios';

export const AddUserModal = ({ onClose, onUpdate }) => {
    
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [sexo, setsexo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rol, setRol] = useState('US01');
    const [roles, setRoles] = useState([]); // Para almacenar los roles disponibles
    const [error, setError] = useState(''); // Para manejar errores
    
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:3001/roles');
                setRoles(response.data); // Asumiendo que la respuesta es un array de roles
            } catch (error) {
                console.error('Error al cargar los roles:', error);
            }
        };

        fetchRoles(); 
        fetchLastUserCode(); // Obtener el último código al cargar el componente
    }, []);

    // Obtener el último código de usuario para la generación automática
    const fetchLastUserCode = async () => {
        try {
            const response = await axios.get('http://localhost:3001/user/usuarios/lastCode'); // Asegúrate de tener esta ruta en tu backend
            setCodigo(response.data.codigo); // Supone que la respuesta tiene una propiedad 'codigo'
        } catch (error) {
            console.error('Error al obtener el último código:', error);
        }
    };
    const handleSave = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores
        try {            
            const response = await axios.post(`http://localhost:3001/user/add`, {
                codigo,
                nombre,
                contrasena,
                sexo,
                telefono,
                ide_rol: rol
            });
            if (response.data.sucesss) {
                setError('El usuario ya existe.'); // Mensaje de error
                return;
            }
            onUpdate(); // Llamar a onUpdate para refrescar la lista de usuarios
            onClose(); // Cerrar el modal
        } catch (error) {
            console.error('Error al agregar el usuario:', error);

        setError('Ocurrió un error al agregar el usuario.'); // Mensaje de error
        }
    };
    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>Agregar Usuario</h2>
                {error && <p className="error-message">{error}</p>}
                <label>Codigo:</label>
                <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <label>Contraseña:</label>
                <input type="text" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                <label>Sexo:</label>
                <input type="text" value={sexo} onChange={(e) => setsexo(e.target.value)} />
                <label>Teléfono:</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        <label>Rol:</label>
                        <select value={rol} onChange={(e) => setRol(e.target.value)}>
                            {roles.map((role) => (
                                <option key={role.ide} value={role.ide}>
                                    {role.nombre} {/* Asume que cada rol tiene una propiedad nombre */}
                                </option>
                            ))}
                        </select>
                
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};