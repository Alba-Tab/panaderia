const express = require('express');

const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categoria'); // Ajusta la consulta según tu base de datos
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
});


module.exports = router;