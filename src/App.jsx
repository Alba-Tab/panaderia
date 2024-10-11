import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import MainLayout from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Categories from './pages/categories'; // Asegúrate de que esta ruta sea correcta

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setLoggedIn(authenticated);
    };
    checkAuth();
  }, []);

  const handleLogin = (status, user) => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', status);
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={handleLogin} />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          } />
          <Route path="/categorias" element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to={loggedIn ? "/dashboard" : "/"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

