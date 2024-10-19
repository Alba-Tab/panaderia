const express = require('express');
const pool = require('../db');

// Obtener todos los permisos
const getPermisos = async (req, res) => {
    try {
        const permisos = await pool.query('SELECT * FROM permiso'); // Asegúrate de que la tabla exista
        res.json(permisos.rows);
    } catch (error) {
        console.error('Error al obtener permisos:', error);
        res.status(500).json({ message: 'Error al obtener permisos' });
    }
};

const getPermiso = async (req, res) => {
    const { id } = req.params;
    try {
        const permiso = await pool.query('SELECT * FROM permiso WHERE id = $1', [id]);
        res.json(permiso.rows[0]);
    } catch (error) {
        console.error('Error al obtener permiso:', error);
        res.status(500).json({ message: 'Error al obtener permiso' });
    }
};

const createPermiso = async (req, res) => {
    const { nombre } = req.body;
    try {
        const newPermiso = await pool.query('INSERT INTO permiso (nombre) VALUES ($1) RETURNING *', [nombre]);
        res.json(newPermiso.rows[0]);
    } catch (error) {
        console.error('Error al crear permiso:', error);
        res.status(500).json({ message: 'Error al crear permiso' });
    }
};

const updatePermiso = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const updatedPermiso = await pool.query('UPDATE permiso SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
        res.json(updatedPermiso.rows[0]);
    } catch (error) {
        console.error('Error al actualizar permiso:', error);
        res.status(500).json({ message: 'Error al actualizar permiso' });
    }
};

const deletePermiso = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPermiso = await pool.query('DELETE FROM permiso WHERE id = $1 RETURNING *', [id]);
        res.json(deletedPermiso.rows[0]);
    } catch (error) {
        console.error('Error al eliminar permiso:', error);
        res.status(500).json({ message: 'Error al eliminar permiso' });
    }
};


module.exports = {
    getPermisos,
    getPermiso,
    createPermiso,
    updatePermiso,
    deletePermiso
}