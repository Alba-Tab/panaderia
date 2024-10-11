const express = require('express');
const pool = require('../db');
const router = express.Router();

// Obtener todos los roles
router.get('/roles', async (req, res) => {
    try {
        const result = await pool.query('SELECT ide, nombre FROM rol');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ message: 'Error al obtener roles' });
    }
});

router.post('/roles', async (req, res) => {
    console.log(req.body);
    const { ide, nombre, permisos } = req.body;

    try {
        // Verificar si el rol ya existe
        const existingRole = await pool.query('SELECT * FROM rol WHERE ide = $1', [ide]);
        if (existingRole.rows.length > 0) {
            return res.json({ exists: true });
        }

        // Insertar nuevo rol
        await pool.query('INSERT INTO rol (ide, nombre) VALUES ($1, $2)', [ide, nombre]);

        // Aquí puedes agregar lógica para asignar permisos al rol

        return res.status(201).json({ message: 'Rol creado exitosamente' });
    } catch (error) {
        console.error('Error al agregar el rol:', error);
        return res.status(500).json({ message: 'Error al agregar el rol' });
    }
});

// Eliminar un rol
router.delete('/roles/:ide', async (req, res) => {
    const { ide } = req.params;

    try {
        // Eliminar el rol de la base de datos
        await pool.query('DELETE FROM rol WHERE ide = $1', [ide]);
        return res.status(204).send(); // No content
    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        return res.status(500).json({ message: 'Error al eliminar el rol' });
    }
});

module.exports = router;
