const pool = require("../db");
    
const getCategorias = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM categoria');
        res.json(result.rows);
    }catch(error){
        console.error('Error al obtener categorias:', error);
        res.status(500).json({ message: 'Error al obtener categorias' });
    }
}

const getCategoria = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM categoria WHERE ide = $1', [id]);
        res.json(result.rows);
    }catch(error){
        console.error('Error al obtener categoria:', error);
        res.status(500).json({ message: 'Error al obtener categoria' });
    }
}

const createCategoria = async (req, res) => {
    try{
        const { nombre } = req.body;
        await pool.query('INSERT INTO categoria (nombre) VALUES ($1)', [nombre]);
        res.status(201).json({ message: 'Categoria creada exitosamente' });
    }catch(error){
        console.error('Error al agregar la categoria:', error);
        res.status(500).json({ message: 'Error al agregar la categoria' });
    }
}

const updateCategoria = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre } = req.body;
        await pool.query('UPDATE categoria SET nombre = $1 WHERE ide = $2', [nombre, id]);
        res.json({ message: 'Categoria actualizada exitosamente' });
    }catch(error){
        console.error('Error al actualizar la categoria:', error);
        res.status(500).json({ message: 'Error al actualizar la categoria' });
    }
}

const deleteCategoria = async (req, res) => {
    try{
        const { id } = req.params;
        await pool.query('DELETE FROM categoria WHERE ide = $1', [id]);
        res.json({ message: 'Categoria eliminada exitosamente' });
    }catch(error){
        console.error('Error al eliminar la categoria:', error);
        res.status(500).json({ message: 'Error al eliminar la categoria' });
    }
}

module.exports = {
    getCategorias,
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria
}