import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const AddRoleModal = ({onClose,onUpdate}) => {
  const [ide, setIde] = useState('')
  const [nombre, setNombre] = useState('');
  const [permisos, setPermisos] = useState([]);  // Lista de permisos disponibles
  const [selectedPermisos, setSelectedPermisos] = useState([]);  // Permisos seleccionados
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPermisos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/permisos/permisos');  // Endpoint para obtener permisos
            setPermisos(response.data); // Supone que la respuesta es un array de permisos
        } catch (error) {
            console.error('Error al cargar los permisos:', error);
        }
    };

    fetchPermisos();
}, []);

    // Manejar la selección de permisos
    const handlePermisoChange = (permisoId) => {
      if (selectedPermisos.includes(permisoId)) {
          setSelectedPermisos(selectedPermisos.filter(id => id !== permisoId));  // Desmarcar permiso
      } else {
          setSelectedPermisos([...selectedPermisos, permisoId]);  // Marcar permiso
      }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
        const response = await axios.post('http://localhost:3001/roles', {
            ide,
            nombre,
            permisos: selectedPermisos
        });

        // Comprobar si el rol ya existe según la respuesta del servidor
        if (response.data.exists) {
            setError('El rol ya existe.'); 
            return;
        }

        // Llamar a la función onUpdate para refrescar la lista de roles
        onUpdate();
        // Cerrar el modal
        onClose();
    } catch (error) {
        console.error('Error al agregar el rol:', error);
        setError('Ocurrió un error al agregar el rol.'); // Mostrar mensaje de error genérico
    }
};

return (
<div className="modal-background">
            <div className="modal-content">
                <h2>Agregar Rol</h2>
                {error && <p className="error-message">{error}</p>}
                <label>IDE:</label>
                <input
                    type="text"
                    value={ide}
                    onChange={(e) => setIde(e.target.value)}
                    placeholder="Código del Rol"
                />
                <label>Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del Rol"
                />
                
                <h3>Permisos</h3>
                <div className="permissions-list">
                    {permisos.map((permiso) => (
                        <label key={permiso.ide}>
                            <input
                                type="checkbox"
                                checked={selectedPermisos.includes(permiso.ide)}
                                onChange={() => handlePermisoChange(permiso.ide)}
                            />
                            {permiso.nombre} - {permiso.descripcion}
                        </label>
                    ))}
                </div>

                <button onClick={handleSave}>Guardar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};
