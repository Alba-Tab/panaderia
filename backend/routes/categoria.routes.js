const express = require('express');
const { getCategorias, createCategoria, updateCategoria, deleteCategoria, getCategoria } = require('../controllers/categorias.controllers');
const router = express.Router();

router.get('/categorias', getCategorias);
router.get('/categorias/:id', getCategoria);
router.post('/categorias', createCategoria);
router.put('/categorias/:id', updateCategoria);
router.delete('/categorias/:id', deleteCategoria);

module.exports = router;