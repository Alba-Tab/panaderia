import React, { useEffect,useState } from 'react';
import axios from 'axios';

const EditUserModal = ({ user, onClose, onUpdate }) => {
    const [nombre, setNombre] = useState(user.nombre);
    const [contrasena, setContrasena] = useState(user.contrasena);
    const [telefono, setTelefono] = useState(user.telefono);
    const [rol, setRol] = useState(user.ide_rol);
    const [roles, setRoles] = useState([]); // Para almacenar los roles disponibles
 
    const [showPassword, setShowPassword] = useState(false);
 
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
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(true);
        setTimeout(() => {
          setShowPassword(false); // Volver a ocultarla después de 3 segundos
        }, 3000); // Cambia el tiempo aquí (milisegundos)
      };


    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/user/usuarios/${user.codigo}`, {
                nombre,
                contrasena,
                telefono,
                ide_rol :rol
            });
            onUpdate(); // Llamar a onUpdate para refrescar la lista de usuarios
            onClose(); // Cerrar el modal
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };


     // Filtrar roles si el usuario no es administrador
     const filteredRoles = JSON.parse(localStorage.getItem('user')).ide_rol === 'RL01' 
     ? roles 
     : roles.filter(role => role.ide === rol);

    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>Editar Usuario</h2>
                <label>Nombre:</label>
                <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <label>Contraseña:</label>
                <input type={showPassword ? 'text' : 'password'} value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? 'Ocultando...' : 'Mostrar'}
                </button>
                <label>Teléfono:</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                {JSON.parse(localStorage.getItem('user')).ide_rol == 'RL01' && (
                    <>
                        <label>Rol:</label>
                        <select value={rol} onChange={(e) => setRol(JSON.parse(e.target.value))}>
                            {filteredRoles.map((role) => (
                                <option key={role.ide} value={role.ide}>
                                    {role.nombre} {/* Asume que cada rol tiene una propiedad nombre */}
                                </option>
                            ))}
                        </select>
                    </>
                )}
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default EditUserModal;