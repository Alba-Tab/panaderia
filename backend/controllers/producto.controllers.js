const pool = require("../db");

const getProductos = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM producto');
        res.json(result.rows);
    }catch(error){
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
}

const getProducto = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM producto WHERE ide = $1', [id]);
        res.json(result.rows);
    }catch(error){
        console.error('Error al obtener producto:', error);
        res.status(500).json({ message: 'Error al obtener producto' });
    }
}

const createProducto = async (req, res) => {
    try{
        const { nombre, precio, stock, stock_minimo, ide_categoria } = req.body;
        await pool.query('INSERT INTO producto (nombre, precio, stock, stock_minimo, ide_categoria) VALUES ($1, $2, $3, $4, $5)', [nombre, precio, stock, stock_minimo, ide_categoria]);
        res.status(201).json({ message: 'Producto creado exitosamente' });
    }catch(error){
        console.error('Error al agregar el producto:', error);
        res.status(500).json({ message: 'Error al agregar el producto' });
    }
}

const updateProducto = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, precio, stock, stock_minimo, ide_categoria } = req.body;
        await pool.query('UPDATE producto SET nombre = $1, precio = $2, stock = $3, stock_minimo = $4, ide_categoria = $5 WHERE ide = $6', [nombre, precio, stock, stock_minimo, ide_categoria, id]);
        res.json({ message: 'Producto actualizado exitosamente' });
    }catch(error){
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
}

const deleteProducto = async (req, res) => {
    try{
        const { id } = req.params;
        await pool.query('DELETE FROM producto WHERE ide = $1', [id]);
        res.json({ message: 'Producto eliminado exitosamente' });
    }catch(error){
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
}

module.exports = {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
}
