import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search } from '../components/search';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate =useNavigate();
  
  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });

      if (response.data.success) {
          setLoggedIn(true);
          navigate('/factura');
      } else {
          setError('Los datos ingresados son incorrectos');
      }
  } catch (error) {
      setError('Error en el servidor jsx');
  }
  };

  return (
    <div className="login-container">
      
      <form onSubmit={handleLogin}>
        
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2>Login</h2>
        <div>
          <label>Usuario:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Usuario" 
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Contraseña" 
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
