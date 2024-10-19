const express = require("express");
const {
  getPermisos,
  getPermiso,
  updatePermiso,
  deletePermiso,
  createPermiso,
} = require("../controllers/permisos.controllers");
const router = express.Router();

// Obtener todos los permisos
router.get("/permisos", getPermisos);

router.get("/permisos/:id", getPermiso);

router.post("/permisos", createPermiso);

router.put("/permisos/:id", updatePermiso);

router.delete("/permisos/:id", deletePermiso);

module.exports = router;
