import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from '../components/EditUserModal';
import { AddUserModal } from './AddUserModal';
import '../styles/ProfileModal.css';

const ProfileModal = ({ onClose,userRole }) => {
    const [activeSection, setActiveSection] = useState('Usuario');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [IsRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    
    
    useEffect(() => {
        const fetchUsersAndRoles = async () => {
            const codigo = JSON.parse(localStorage.getItem('user')).codigo;
            const userRole = JSON.parse(localStorage.getItem('user')).ide_rol;

            try {
                // Obtener el usuario actual
                const userResponse = await axios.get(`http://localhost:3001/user/usuarios/me`, {
                    params: { codigo }
                });
                const currentUser = userResponse.data;
                setUsers([currentUser]);

                // Obtener usuarios
                const response = await axios.get('http://localhost:3001/user/usuarios', {
                    params: { codigo, userRole }
                });
                if (response.data.length > 0) {
                    setUsers(prevUsers => [...prevUsers, ...response.data]);
                }

                // Obtener roles
                const rolesResponse = await axios.get('http://localhost:3001/user/roles');
                setRoles(rolesResponse.data);
            } catch (error) {
                console.error('Error al cargar los usuarios o roles:', error);
            }
        };
        fetchUsersAndRoles();
    }, [userRole]);

    
    const handleUpdate = async () => {
        const userResponse = await axios.get(`http://localhost:3001/user/usuarios/me`, {
            params: { codigo: JSON.parse(localStorage.getItem('user')).codigo }
        });
        const currentUser = userResponse.data;
        setUsers([currentUser]);
        const response = await axios.get('http://localhost:3001/user/usuarios', {
            params: {  codigo: JSON.parse(localStorage.getItem('user')).codigo ,userRole }
        });
        if (response.data.length > 0) {
            setUsers(prevUsers => [...prevUsers, ...response.data]);
        }
    };
    
    const handleModify = () => {
        if (selectedUser) {
          //  const userToEdit = users.find(user => user.codigo === selectedUser);
            setIsEditModalOpen(true);
        }
    };
    
    const handleDelete = async () => {
        if (selectedUser) {
            try {
                const userRole = JSON.parse(localStorage.getItem('user')).ide_rol;
                await axios.delete(`http://localhost:3001/user/usuarios/${selectedUser}`,
                    {
                        params: { userRole } // Usar params para pasar código
                        
                    });
                setUsers(users.filter(user => user.codigo !== selectedUser)); // Actualizar la lista
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
    };

    const handleRoleModify = (role) => {
        setSelectedRole(role);
        setIsRoleModalOpen(true);
    };

    const handleAddRole = () => {
        // Lógica para agregar un nuevo rol
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>Salir</button>
                <div className="modal-sidebar">
                    <button className='sidebar-option' onClick={() => setActiveSection('Usuario')}>Usuario</button>
                    <button className='sidebar-option' onClick={() => setActiveSection('Roles')}>Roles</button>
                </div>
                <div className="modal-main-content">
                    {activeSection === 'Usuario' && (
                        <>
                            <h2>Gestión de usuario</h2>
                            
                            <div className="user-cards">
                            {userRole === 'RL01' && ( 
                                // Solo mostrar la tarjeta "Agregar usuario" si es admin
                                    <div className="user-card add-user-card" onClick={() => setIsAddModalOpen(true)}>
                                        <p>+</p> {/* Símbolo de más */}
                                        <p>Agregar Usuario</p>
                                    </div>
                                )}
                                {users.map((user) => (
                                    <div
                                        key={user.codigo}
                                        className={`user-card ${selectedUser === user.codigo ? 'selected' : ''}`}
                                        onClick={() => setSelectedUser(user.codigo)}
                                    >
                                        <p>Nombre: {user.nombre}</p>
                                        <p>Teléfono: {user.telefono}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="action-buttons">
                                <button className='modify-btn' onClick={handleModify} disabled={!selectedUser}>Modificar</button>
                                <button className='delete-btn' onClick={handleDelete} disabled={!selectedUser}>Eliminar</button>
                            </div>
                        </>
                        
                    )}
                    {activeSection === 'Roles' && (
                        <>
                            <h2>Gestión de Roles</h2>
                            <button onClick={handleAddRole}>Agregar Rol</button>
                            <div className="role-cards">
                                {roles.map((role) => (
                                    <div key={role.id} className="role-card" onClick={() => handleRoleModify(role)}>
                                        <p>Rol: {role.nombre}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            {isEditModalOpen && (
                <EditUserModal
                    user={users.find(user => user.codigo === selectedUser)}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}

            {isAddModalOpen && ( // Modal para agregar un nuevo usuario
                <AddUserModal
                    onClose={() => setIsAddModalOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default ProfileModal;
