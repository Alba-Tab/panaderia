const express = require('express');
const pool = require('../db');
const router = express.Router();

// Obtener todos los permisos
router.get('/permisos', async (req, res) => {
    try {
        const permisos = await pool.query('SELECT * FROM permiso'); // Asegúrate de que la tabla exista
        res.json(permisos.rows);
    } catch (error) {
        console.error('Error al obtener permisos:', error);
        res.status(500).json({ message: 'Error al obtener permisos' });
    }
});
module.exports = router;