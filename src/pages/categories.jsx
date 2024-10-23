import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'; // Asegúrate de importar tu componente Sidebar
import ProfileModal from '../components/Profilemodal'; // Asegúrate de importar tu componente ProfileModal
import axios from 'axios';

const Categorias = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categorias`); // ruta modificada
                setCategorias(response.data); // Asumiendo que la respuesta es un array de categorías
            } catch (error) {
                console.error('Error al cargar las categorías:', error);
            }
        };

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserRole(storedUser.ide_rol); // Utilizas el ide_rol desde localStorage
        } else {
            console.error('No se encontró el usuario en localStorage');
        }

        fetchCategorias(); // Cargar categorías al montar el componente
    }, []);

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div className="categorias-layout">
            <Sidebar />
            <div className="content">
                <header className="header">
                    <button className="profile-btn" onClick={handleProfileClick}>
                        Perfil
                    </button>
                </header>
                <h2>Categorías</h2>
                <ul>
                    {categorias.map(categoria => (
                        <li key={categoria.ide}>{categoria.nombre}</li>
                    ))}
                </ul>
            </div>
            {isProfileOpen && <ProfileModal onClose={handleProfileClick} userRole={userRole} />}
        </div>
    );
};

export default Categorias;

