const express = require("express");
const {
  deleteRol,
  getRoles,
  createRol,
  getRol,
} = require("../controllers/roles.controllers");
const router = express.Router();

// Obtener todos los roles
router.get("/roles", getRoles);

router.post("/roles", createRol);

// Eliminar un rol
router.delete("/roles/:ide", deleteRol);

module.exports = router;
