import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      console.log(`${import.meta.env.VITE_API_URL}`);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { codigo, password });
      // Guardar el token en localStorage o en el estado
      localStorage.setItem('token', response.data.token);
      
      setLoggedIn(response.data.sucess,response.data.user);
      // Redirigir a la página de inicio o dashboard
      navigate('/dashboard');
  } catch (error) {
    console.error(`import.meta.env.VITE_API_URL: ${import.meta.env.VITE_API_URL}`);
    setError(error.response?.data.message || 'Error en el inicio de sesión');
  }
  };

  return (
    <div className="login-container">
   
      <form onSubmit={handleLogin}>
        
        <h2>Login</h2>
        <div>
          <label>Usuario:</label>
          <input 
            type="text" 
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)} 
            placeholder="Codigo" 
            required
            />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Contraseña" 
            required
            />
        </div>
        <button type="submit">Iniciar Sesión</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
