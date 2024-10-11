const express = require('express');
const pool = require('../db');
const router = express.Router();

// Obtener todos los roles
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT ide, nombre FROM rol');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ message: 'Error al obtener roles' });
    }
});

module.exports = router;
