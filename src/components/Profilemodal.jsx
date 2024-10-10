import React, { useState, useEffect } from 'react';
// Importar funciones del servicio de usuarios
import { fetchCurrentUser, fetchUsers, deleteUser } from '../services/userService'; 
// Importar funciones del servicio de roles
import { fetchRoles, addRole } from '../services/roleService'; 

import {EditUserModal} from './EditUserModal';
import { AddUserModal } from './AddUserModal';
import { AddRoleModal } from './AddRoleModal';
import { EditRoleModal } from './EditRoleModal';
import '../styles/ProfileModal.css';

const ProfileModal = ({ onClose,userRole }) => {
    const [activeSection, setActiveSection] = useState('Usuario');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRoleEditModalOpen, setIsRoleEditModalOpen] = useState(false);
    // Para abrir modal de roles
    const [isRoleAddModalOpen, setIsRoleAddModalOpen] = useState(false); 
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    
    
    useEffect(() => {
        const fetchUsersAndRoles = async () => {
            const codigo = JSON.parse(localStorage.getItem('user')).codigo;
            const userRole = JSON.parse(localStorage.getItem('user')).ide_rol;

            try {
                const currentUser = await fetchCurrentUser(codigo);
                setUsers([currentUser]);

                const usersData = await fetchUsers(codigo, userRole);
                if (usersData.length > 0) {
                    setUsers(prevUsers => [...prevUsers, ...usersData]);
                }

                const rolesData = await fetchRoles();
                setRoles(rolesData);
            } catch (error) {
                console.error('Error al cargar los usuarios o roles:', error);
            }
        };
        fetchUsersAndRoles();
    }, [userRole]);

    
    const handleUpdate = async () => {
        const codigo = JSON.parse(localStorage.getItem('user')).codigo;
        const userRole = JSON.parse(localStorage.getItem('user')).ide_rol;

        const currentUser = await fetchCurrentUser(codigo);
        setUsers([currentUser]);

        const usersData = await fetchUsers(codigo, userRole);
        if (usersData.length > 0) {
            setUsers(prevUsers => [...prevUsers, ...usersData]);
        }

        const rolesdata = await fetchRoles();
        setRoles(rolesdata);
    };
    
    const handleModify = () => {
        if (selectedUser) {
           setIsEditModalOpen(true);
        }
    };
    
    const handleDelete = async () => {
        if (selectedUser) {
            try {
                const userRole = JSON.parse(localStorage.getItem('user')).ide_rol;
                await deleteUser(selectedUser, userRole);
                // Actualizar la lista
                setUsers(users.filter(user => user.codigo !== selectedUser)); 
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
    };
    // Funciones de gestión de roles
    const handleRoleModify = (role) => {
        setSelectedRole(role);
         // Abrir modal de edición de rol
    };

    const handleAddRole = () => {
        setIsRoleAddModalOpen(true); // Abrir modal de agregar rol
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
                                
                            <div className="role-cards">
                             <div className="user-card add-user-card" onClick={() => handleAddRole()}>
                                        <p>+</p> {/* Símbolo de más */}
                                        <p>Agregar Rol</p>
                                    </div>
                                {roles.map((role) => (
                                    <div key={role.ide} 
                                    className={`role-card ${selectedUser === role.ide ? 'selected' : ''}`} 
                                    onClick={() => setSelectedRole(role.ide)}>

                                        <p>Rol: {role.nombre}</p>
                                        <p>Descripcion: {role.descripcion}</p>
                                    </div>
                                ))}
                            </div>
                                <button className='modify-btn' onClick={handleRoleModify}>Modificar Rol</button>
                                <button className='delete-btn' onClick={handleAddRole}>Eliminar Rol</button>

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
                        {isRoleEditModalOpen && (
                <EditRoleModal
                    role={selectedRole}
                    onClose={() => setIsRoleEditModalOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}

            {isRoleAddModalOpen && (
                <AddRoleModal
                    onClose={() => setIsRoleAddModalOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default ProfileModal;
