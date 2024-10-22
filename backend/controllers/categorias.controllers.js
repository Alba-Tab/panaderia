const pool = require("../db");

const getCategorias = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categoria");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    res.status(500).json({ message: "Error al obtener categorias" });
  }
};

const getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM categoria WHERE ide = $1", [
      id,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener categoria:", error);
    res.status(500).json({ message: "Error al obtener categoria" });
  }
};

// CREATE TABLE categoria(
//     ide SERIAL PRIMARY KEY,
//     nombre VARCHAR(30)NOT NULL,
//     descripcion VARCHAR(60) NOT NULL
//     );

const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    await pool.query(
      "INSERT INTO categoria (nombre, descripcion) VALUES ($1, $2)",
      [nombre, descripcion]
    );
    res.json({ message: "Categoria creada exitosamente" });
  } catch (error) {
    console.error("Error al crear la categoria:", error);
    res.status(500).json({ message: "Error al crear la categoria" });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    await pool.query(
      "UPDATE categoria SET nombre = $1, descripcion = $2 WHERE ide = $3",
      [nombre, descripcion, id]
    );
    res.json({ message: "Categoria actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la categoria:", error);
    res.status(500).json({ message: "Error al actualizar la categoria" });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM categoria WHERE ide = $1", [id]);
    res.json({ message: "Categoria eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la categoria:", error);
    res.status(500).json({ message: "Error al eliminar la categoria" });
  }
};

module.exports = {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
