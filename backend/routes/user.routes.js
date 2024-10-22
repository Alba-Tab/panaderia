const express = require('express');
const pool = require('../db');
const { getUsuarios, getUsuarioLogueado, existeUsuario, getUltimoCodigoUsuario, createUser, updateUser, deleteUser } = require('../controllers/user.controllers');
const router = express.Router();


// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/usuarios', getUsuarios);

// Ruta para obtener los datos del usuario logueado
router.get('/usuarios/me', getUsuarioLogueado);

// Ruta saber si un usuario es existe
router.get('/usuarios/existe', existeUsuario);

// Ruta para obtener el último código de usuario
router.get('/usuarios/lastCode', getUltimoCodigoUsuario);

// Ruta para agregar un usuario
router.post('/add', createUser);

// Ruta para modificar un usuario
router.put('/usuarios/:codigo', updateUser);

// Ruta para eliminar un usuario
router.delete('/usuarios/:codigo', deleteUser);


module.exports = router;

