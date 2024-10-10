
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [newCategoria, setNewCategoria] = useState('');
    const [editCategoria, setEditCategoria] = useState(null);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        // Obtener todas las categorías
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3001/categoria');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };
        fetchCategorias();
    }, []);

    const handleAddCategoria = async () => {
        try {
            const response = await axios.post('http://localhost:3001/categoria', { nombre_categoria: newCategoria });
            setCategorias([...categorias, response.data]);
            setNewCategoria('');
        } catch (error) {
            console.error('Error al agregar categoría:', error);
        }
    };

    const handleEditCategoria = async (id_categoria) => {
        try {
            await axios.put(`http://localhost:3001/categoria/${id_categoria}`, { nombre_categoria: editName });
            setCategorias(categorias.map(cat => (cat.id_categoria === id_categoria ? { ...cat, nombre_categoria: editName } : cat)));
            setEditCategoria(null);
            setEditName('');
        } catch (error) {
            console.error('Error al editar categoría:', error);
        }
    };

    const handleDeleteCategoria = async (id_categoria) => {
        try {
            await axios.delete(`http://localhost:3001/categoria/${id_categoria}`);
            setCategorias(categorias.filter(cat => cat.id_categoria !== id_categoria));
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
        }
    };

    return (
        <div>
            <h2>Gestión de Categorías</h2>
            <div>
                <input
                    type="text"
                    value={newCategoria}
                    onChange={(e) => setNewCategoria(e.target.value)}
                    placeholder="Nueva Categoría"
                />
                <button onClick={handleAddCategoria}>Agregar</button>
            </div>
            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id_categoria}>
                        {editCategoria === categoria.id_categoria ? (
                            <div>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <button onClick={() => handleEditCategoria(categoria.id_categoria)}>Guardar</button>
                            </div>
                        ) : (
                            <>
                                {categoria.nombre_categoria}
                                <button onClick={() => {
                                    setEditCategoria(categoria.id_categoria);
                                    setEditName(categoria.nombre_categoria);
                                }}>Editar</button>
                                <button onClick={() => handleDeleteCategoria(categoria.id_categoria)}>Eliminar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categorias;
