const express = require('express');
const pool = require('../db');
const router = express.Router();

// Middleware para verificar el rol de administrador
const isAdmin = (req, res, next) => {
    const userRole = req.query.userRole; // Obtener userRole de los parámetros de la consulta
    // Verificar si el usuario es administrador
    if (userRole !== 'RL01') {
        return res.status(403).json({ message: 'No tienes permiso para ver esta información.' });
    }
    next();
};


// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/usuarios', isAdmin, async (req, res) => {
    const { codigo, userRole } = req.query; // Cambiar a req.query
    try {
        const result = await pool.query('SELECT * FROM usuario WHERE codigo != $1', [codigo]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// Ruta para obtener los datos del usuario logueado
router.get('/usuarios/me', async (req, res) => {
    const { codigo } = req.query; // Cambiar a req.query

    try {
        const result = await pool.query('SELECT * FROM usuario WHERE codigo = $1', [codigo]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario logueado:', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

// Ruta para modificar un usuario
router.put('/usuarios/:codigo', async (req, res) => {
    const { codigo } = req.params; // Código del usuario a modificar
    const { nombre,contrasena, telefono,rol } = req.body; // Nuevos valores

    try {
        const result = await pool.query(
            'UPDATE usuario SET nombre = $1, contrasena= $2, telefono = $3, ide_rol=$4 WHERE codigo = $5',
            [nombre,contrasena, telefono,rol, codigo]
        );
        res.status(204).send(); // No devuelve nada
    } catch (error) {
        console.error('Error al modificar el usuario:', error);
        res.status(500).json({ message: 'Error al modificar el usuario' });
    }
});

// Ruta para eliminar un usuario
router.delete('/usuarios/:codigo', isAdmin, async (req, res) => {
    const { codigo } = req.params; // Código del usuario a eliminar

    try {
        const result = await pool.query('DELETE FROM usuario WHERE codigo = $1', [codigo]);
        res.status(204).send(); // No devuelve nada
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});

// Ruta para obtener todos los roles
router.get('/roles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM roles'); // Ajusta la consulta según tu base de datos
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ message: 'Error al obtener roles' });
    }
});

module.exports = router;

