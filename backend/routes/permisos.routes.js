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
router.get("/api/permisos", getPermisos);

router.get("/api/permisos/:id", getPermiso);

router.post("/api/permisos", createPermiso);

router.put("/api/permisos/:id", updatePermiso);

router.delete("/api/permisos/:id", deletePermiso);

module.exports = router;
