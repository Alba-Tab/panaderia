const express = require('express');
const { getProductos, getProducto, createProducto, updateProducto, deleteProducto } = require('../controllers/producto.controllers');
const router = express.Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProducto);
router.post('/productos', createProducto);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);
