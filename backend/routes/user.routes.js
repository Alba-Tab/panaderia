const express = require("express");
const {
  getUsuarios,
  getUsuarioLogueado,
  existeUsuario,
  getUltimoCodigoUsuario,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");
const router = express.Router();

// Ruta para obtener todos los usuarios (solo para administradores)
router.get("/api/usuarios", getUsuarios);

// Ruta para obtener los datos del usuario logueado
router.get("/api/usuarios/me", getUsuarioLogueado);

// Ruta saber si un usuario es existe
router.get("/api/usuarios/existe", existeUsuario);

// Ruta para obtener el último código de usuario
router.get("/api/usuarios/lastCode", getUltimoCodigoUsuario);

// Ruta para agregar un usuario
router.post("/api/add", createUser);

// Ruta para modificar un usuario
router.put("/api/usuarios/:codigo", updateUser);

// Ruta para eliminar un usuario
router.delete("/api/usuarios/:codigo", deleteUser);

module.exports = router;
