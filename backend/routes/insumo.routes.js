const express = require("express");
const {
  getInsumos,
  getInsumo,
  createInsumo,
  updateInsumo,
  deleteInsumo,
} = require("../controllers/insumo.controllers");

const router = express.Router();

router.get("/insumos", getInsumos);
router.get("/insumos/:id", getInsumo);
router.post("/insumos", createInsumo);
router.put("/insumos/:id", updateInsumo);
router.delete("/insumos/:id", deleteInsumo);

module.exports = router;
