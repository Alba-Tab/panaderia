const express = require("express");
const {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/producto.controllers");
const router = express.Router();

router.get("/api/productos", getProductos);
router.get("/api/productos/:id", getProducto);
router.post("/api/productos", createProducto);
router.put("/api/productos/:id", updateProducto);
router.delete("/api/productos/:id", deleteProducto);

module.exports = router;
