import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import MainLayout from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// Función para verificar si el token está en localStorage
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  // Aquí podrías validar el token (si es válido o ha expirado)
  return !!token; // Si hay token, devuelve true, sino false
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

    // Verifica la autenticación al cargar la aplicación
    useEffect(() => {
      const checkAuth = () => {
        const authenticated = isAuthenticated();
        setLoggedIn(authenticated);
      };
      checkAuth();
    }, []);

  const handleLogin = (status,user ) => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', status); // Guardar el estado en localStorage
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (

    <div className="App">
      <Router>
        <Routes>
          {/* Ruta de login */}
          <Route path="/" element={<Login setLoggedIn={handleLogin} />} />
          
          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          } />
          
          {/* Redirección  */}
          <Route path="*" element={<Navigate to={loggedIn ? "/dashboard" : "/"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

