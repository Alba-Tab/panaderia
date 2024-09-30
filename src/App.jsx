import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Facturacion from './pages/Facturacion';

//<Route path="/perfil" element={<Perfil />} />          
//<Route path="/inventario" element={<Inventario />} />  

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div className="App">
      <Router>
        <Routes>
          {loggedIn ? (
            <>
            {/* Rutas cuando el usuario está logueado */}
            <Route path="/factura" element={<Facturacion />} />
          </>
          ) : (
            
            <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} /> 
          )}
          {/* Rutas cuando la ruta no esta especificada */}
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;


