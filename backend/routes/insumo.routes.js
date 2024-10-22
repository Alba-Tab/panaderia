const express = require("express");
const {
  getInsumos,
  getInsumo,
  createInsumo,
  updateInsumo,
  deleteInsumo,
} = require("../controllers/insumo.controllers");

const router = express.Router();

router.get("/api/insumos", getInsumos);
router.get("/api/insumos/:id", getInsumo);
router.post("/api/insumos", createInsumo);
router.put("/api/insumos/:id", updateInsumo);
router.delete("/api/insumos/:id", deleteInsumo);

module.exports = router;
