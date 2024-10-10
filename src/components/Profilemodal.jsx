import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from '../components/EditUserModal';
import '../styles/ProfileModal.css';

const ProfileModal = ({ onClose,userRole }) => {
    const [activeSection, setActiveSection] = useState('Usuario');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const codigo = JSON.parse(localStorage.getItem('user')).codigo;
            const userRole = JSON.parse(localStorage.getItem('user')).ide_rol;
            
            // Obtenemos el usuario actual
            const userResponse = await axios.get(`http://localhost:3001/user/usuarios/me`, {
                params: { codigo } // Usar params para pasar código
            });
            const currentUser = userResponse.data;
            // Agregar el usuario actual a la lista
            setUsers([currentUser]);
            
            // Verificar si el usuario es administrador
                const response = await axios.get('http://localhost:3001/user/usuarios', {
                    params: { codigo,userRole } // Usar params para pasar código
                    
                });
                console.log(currentUser);
                if (response.data.length > 0) { // Si hay usuarios
                    setUsers(prevUsers => [...prevUsers, ...response.data]); // Agregar usuarios a la lista
                }
            
            
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setError('Error al cargar los usuarios');
        
    }
};
fetchUsers();
    }, [userRole]);


    const handleModify = () => {
        if (selectedUser) {
            const userToEdit = users.find(user => user.codigo === selectedUser);
            setIsEditModalOpen(true);
        }
    };


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


    const handleDelete = async () => {
        if (selectedUser) {
            try {
                await axios.delete(`http://localhost:3001/user/usuarios/${selectedUser}`);
                setUsers(users.filter(user => user.codigo !== selectedUser)); // Actualizar la lista
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
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
                    {activeSection === 'Roles' && <h2>Gestión de roles</h2>}
                </div>
            </div>
            {isEditModalOpen && (
                <EditUserModal
                    user={users.find(user => user.codigo === selectedUser)}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default ProfileModal;
