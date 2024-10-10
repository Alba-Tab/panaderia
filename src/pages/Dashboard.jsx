import React, { useState, useEffect  } from 'react';
import ProfileModal from '../components/Profilemodal';
import Sidebar from '../components/Sidebar';
import Categorias from './Categorias';
import '../styles/MainLayout.css'; 

const MainLayout = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);

   
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserRole(storedUser.ide_rol); // Utilizas el ide_rol desde localStorage
            
        } else {
            console.error('No se encontró el usuario en localStorage');
        }
    }, []);
    
    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div className="main-layout">
            <Sidebar />
            <div className="content">
                <header className="header">
                    <button className="profile-btn" onClick={handleProfileClick}>
                        Perfil
                    </button>
                </header>
                <Categorias/>
            </div>
            {isProfileOpen && <ProfileModal onClose={handleProfileClick} userRole={userRole} />}
        </div>
    );
};

export default MainLayout;