const pool = require("../db");

const getRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT ide, nombre FROM rol");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener roles:", error);
    res.status(500).json({ message: "Error al obtener roles" });
  }
};

const getRol = async (req, res) => {
  console.log(req.body);
  const { ide, nombre, permisos } = req.body;

  try {
    // Verificar si el rol ya existe
    const existingRole = await pool.query("SELECT * FROM rol WHERE ide = $1", [
      ide,
    ]);
    if (existingRole.rows.length > 0) {
      return res.json({ exists: true });
    }

    // Insertar nuevo rol
    await pool.query("INSERT INTO rol (ide, nombre) VALUES ($1, $2)", [
      ide,
      nombre,
    ]);

    // Aquí puedes agregar lógica para asignar permisos al rol

    return res.status(201).json({ message: "Rol creado exitosamente" });
  } catch (error) {
    console.error("Error al agregar el rol:", error);
    return res.status(500).json({ message: "Error al agregar el rol" });
  }
};

const createRol = async (req, res) => {
  try {
    // SI NO LO TENES CON GENERAR AUTOMATICAMENTE ID DE ROL
    const { ide, nombre } = req.body;
    // Verificar si el rol ya existe
    const existingRole = await pool.query("SELECT * FROM rol WHERE ide = $1", [
      ide,
    ]);
    if (existingRole.rows.length > 0) {
      return res.status(400).json({ message: "El rol ya existe" });
    }
    // Insertar nuevo rol
    await pool.query("INSERT INTO rol (ide, nombre) VALUES ($1, $2)", [
      ide,
      nombre,
    ]);

    //SI LO TENES CON GENERARA AUTOMATICAMENTE ID DE ROL
    // const { nombre } = req.body;

    // // Insertar nuevo rol
    // await pool.query("INSERT INTO rol (nombre) VALUES ($1)", [
    //   ide,
    //   nombre,
    // ]);

    return res.status(201).json({ message: "Rol creado exitosamente" });
  } catch (error) {
    console.error("Error al crear rol:", error);
    res.status(500).json({ message: "Error al crear rol" });
  }
};

const updateRol = async (req, res) => {
  try {
    const { ide } = req.params;
    const { nombre } = req.body;
    // Actualizar el rol
    await pool.query("UPDATE rol SET nombre = $1 WHERE ide = $2", [
      nombre,
      ide,
    ]);
    return res.json({ message: "Rol actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    res.status(500).json({ message: "Error al actualizar rol" });
  }
};

// Eliminar un rol
const deleteRol = async (req, res) => {
  const { ide } = req.params;

  try {
    // Eliminar el rol de la base de datos
    await pool.query("DELETE FROM rol WHERE ide = $1", [ide]);
    return res.status(204).send().json({ message: "eliminado exitosamente" }); // No content
  } catch (error) {
    console.error("Error al eliminar el rol:", error);
    return res.status(500).json({ message: "Error al eliminar el rol" });
  }
};

module.exports = {
  getRoles,
  getRol,
  deleteRol,
  createRol,
  updateRol,
};
