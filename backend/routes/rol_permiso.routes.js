const express = require("express");
const {
  deleteRol_Permiso,
  getRol_Permiso,
  getRol_Permisos,
  getRoles_Permisos,
  postRol_Permiso,
} = require("../controllers/rol_permiso.controllers");
const router = express.Router();

router.get("/api/rol/permisos", getRoles_Permisos);
router.get("/api/rol/permisos/:ide_rol", getRol_Permisos);
router.get("/api/rol/permisos/:ide_permiso/:ide_rol", getRol_Permiso);
router.post("/api/rol/permisos", postRol_Permiso);
router.delete("/api/rol/permisos/:ide_permiso/:ide_rol", deleteRol_Permiso);

module.exports = router;
