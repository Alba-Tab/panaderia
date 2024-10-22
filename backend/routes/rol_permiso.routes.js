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
router.get("/api/Rol/Permisos/:Id_Rol", getRol_Permisos);
router.get("/api/Rol/Permisos/:Id_Permiso/:Id_Rol", getRol_Permiso);
router.post("/api/Rol/Permisos", postRol_Permiso);
router.delete("/api/Rol/Permisos/:Id_Permiso/:Id_Rol", deleteRol_Permiso);

module.exports = router;
