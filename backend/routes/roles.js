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

router.post('/roles', async (req, res) => {
    const { ide, nombre, permisos } = req.body;

    try {
        // Verificar si el rol ya existe
        const existingRole = await pool.query('SELECT * FROM roles WHERE ide = $1', [ide]);
        if (existingRole.rows.length > 0) {
            return res.json({ exists: true });
        }

        // Insertar nuevo rol
        await pool.query('INSERT INTO roles (ide, nombre) VALUES ($1, $2)', [ide, nombre]);
        
        // Aquí podrías agregar la lógica para asignar permisos al rol, si es necesario

        return res.status(201).json({ message: 'Rol creado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el rol:', error);
        return res.status(500).json({ message: 'Error al agregar el rol' });
    }
});

module.exports = router;
