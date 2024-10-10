const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Obtener todas las categorías
router.get('/categoria', async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
});

// Agregar una nueva categoría
router.post('/categoria', async (req, res) => {
    const { nombre_categoria } = req.body;
    try {
        const nuevaCategoria = await Categoria.create({ nombre_categoria });
        res.json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar categoría' });
    }
});

// Actualizar una categoría
router.put('/categoria/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre_categoria } = req.body;
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        categoria.nombre_categoria = nombre_categoria;
        await categoria.save();
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar categoría' });
    }
});

// Eliminar una categoría
router.delete('/categoria/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        await categoria.destroy();
        res.json({ message: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar categoría' });
    }
});


module.exports = router;