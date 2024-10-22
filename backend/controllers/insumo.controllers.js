const pool = require("../db");

const getInsumos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM insumo");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

const getInsumo = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM insumo WHERE ide = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Insumo no encontrado" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

const createInsumo = async (req, res) => {
  const { nombre, medida, stock, stock_minimo } = req.body;

  try {
    await pool.query(
      "INSERT INTO insumo (nombre, medida, stock, stock_minimo) VALUES ($1, $2, $3, $4)",
      [nombre, medida, stock, stock_minimo]
    );
    res
      .status(201)
      .json({ success: true, message: "Insumo creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

const updateInsumo = async (req, res) => {
  const { id } = req.params;
  const { nombre, medida, stock, stock_minimo } = req.body;

  try {
    const result = await pool.query(
      "UPDATE insumo SET nombre = $1, medida = $2, stock = $3, stock_minimo = $4 WHERE ide = $5",
      [nombre, medida, stock, stock_minimo, id]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Insumo no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Insumo actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

const deleteInsumo = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM insumo WHERE ide = $1", [id]);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Insumo no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Insumo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};

module.exports = {
  getInsumos,
  getInsumo,
  createInsumo,
  updateInsumo,
  deleteInsumo,
};
