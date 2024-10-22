const express = require("express");
const {
  getProveedores,
  getProveedor,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} = require("../controllers/proveedor.controllers");
const router = express.Router();

router.get("/api/proveedores", getProveedores);
router.get("/api/proveedores/:codigo", getProveedor);
router.post("/api/proveedores", createProveedor);
router.put("/api/proveedores/:codigo", updateProveedor);
router.delete("/api/proveedores/:codigo", deleteProveedor);

module.exports = router;
