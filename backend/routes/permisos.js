const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/permisos', async (req, res) => {
    const permisos = await pool.query('SELECT * FROM permiso');
    res.json(permisos.rows);
});

module.exports = router;