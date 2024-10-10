const express = require('express');
const pool = require('../db');
const router = express.Router();


// Middleware para verificar si es administrador
const isAdmin = (req, res, next) => {
    const { userRole } = req.body;
    if (userRole !== 'RL01') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
    }
    next();
};

// Obtener todos los roles
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rol');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ message: 'Error al obtener roles' });
    }
});


// Ruta para crear un nuevo rol
router.post('/roles', isAdmin, async (req, res) => {
    const { nombre_rol } = req.body;

    try {
        const result = await pool.query('INSERT INTO rol (nombre_rol) VALUES ($1) RETURNING *', [nombre_rol]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear rol:', error);
        res.status(500).json({ message: 'Error al crear rol' });
    }
});

// Ruta para actualizar un rol
router.put('/roles/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    const { nombre_rol } = req.body;

    try {
        const result = await pool.query(
            'UPDATE rol SET nombre_rol = $1 WHERE id_rol = $2',
            [nombre_rol, id]
        );
        res.json({ message: 'Rol actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ message: 'Error al actualizar rol' });
    }
});

// Ruta para eliminar un rol
router.delete('/roles/:id', isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM rol WHERE id_rol = $1', [id]);
        res.json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar rol:', error);
        res.status(500).json({ message: 'Error al eliminar rol' });
    }
});


module.exports = router;
