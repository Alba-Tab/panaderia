const express = require("express");
const {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoria,
} = require("../controllers/categorias.controllers");
const router = express.Router();

router.get("/api/categorias", getCategorias);
router.get("/api/categorias/:id", getCategoria);
router.post("/api/categorias", createCategoria);
router.put("/api/categorias/:id", updateCategoria);
router.delete("/api/categorias/:id", deleteCategoria);

module.exports = router;
