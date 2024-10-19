const express = require("express");
const {
  getProveedores,
  getProveedor,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} = require("../controllers/proveedor.controllers");
const router = express.Router();

router.get("/proveedores", getProveedores);
router.get("/proveedores/:codigo", getProveedor);
router.post("/proveedores", createProveedor);
router.put("/proveedores/:codigo", updateProveedor);
router.delete("/proveedores/:codigo", deleteProveedor);

module.exports = router;
