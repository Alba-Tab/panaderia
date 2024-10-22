const pool = require("../db");
const logEvent = require("../middleware/bitacora.middleware");

// Obtener todos los proveedores (solo para administradores)
const getProveedores = async (req, res) => {
  const { userRole } = req.query;

  try {
    if (userRole !== "RL01") {
      return res
        .status(403)
        .json({ message: "No tienes permiso para ver esta información." });
    }

    const response = await pool.query("SELECT * FROM proveedor");
    return res.status(200).json({ success: true, proveedores: response.rows });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
};

// Obtener un proveedor por código
const getProveedor = async (req, res) => {
  try {
    const { codigo } = req.params;
    const response = await pool.query(
      "SELECT * FROM proveedor WHERE codigo = $1",
      [codigo]
    );
    return res.status(200).json({ success: true, proveedor: response.rows });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
};

// Crear un nuevo proveedor (solo para administradores)
const createProveedor = async (req, res) => {
  const { userRole } = req.query;

  try {
    if (userRole !== "RL01") {
      await logEvent("POST", "/proveedores", req.ip, "N/A", "Acceso denegado");
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción." });
    }

    const { codigo, nombre, sexo, telefono, estado } = req.body;
    const existingProveedor = await pool.query(
      "SELECT * FROM proveedor WHERE codigo = $1",
      [codigo]
    );

    if (existingProveedor.rows.length > 0) {
      await logEvent(
        "POST",
        "/proveedores",
        req.ip,
        req.user.codigo,
        `Proveedor con código ${codigo} ya existe`
      );
      return res.status(400).json({ message: "Proveedor ya existe" });
    }

    await pool.query(
      "INSERT INTO proveedor (codigo, nombre, sexo, telefono, estado) VALUES ($1, $2, $3, $4, $5)",
      [codigo, nombre, sexo, telefono, estado]
    );
    await logEvent(
      "POST",
      "/proveedores",
      req.ip,
      "N/A",
      `Proveedor creado con código ${codigo}`
    );
    return res.status(201).json({ message: "Proveedor creado exitosamente" });
  } catch (error) {
    console.error(error);
    await logEvent(
      "POST",
      "/proveedores",
      req.ip,
      "N/A",
      "Error al crear proveedor"
    );
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
};

// Actualizar un proveedor (solo para administradores)
const updateProveedor = async (req, res) => {
  const { userRole } = req.query;

  try {
    if (userRole !== "RL01") {
      await logEvent("PUT", "/proveedores", req.ip, "N/A", "Acceso denegado");
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción." });
    }

    const { codigo } = req.params;
    const { nombre, sexo, telefono, estado } = req.body;
    await pool.query(
      "UPDATE proveedor SET nombre = $1, sexo = $2, telefono = $3, estado = $4 WHERE codigo = $5",
      [nombre, sexo, telefono, estado, codigo]
    );
    await logEvent(
      "PUT",
      `/proveedores/${codigo}`,
      req.ip,
      "N/A",
      `Proveedor actualizado con código ${codigo}`
    );
    return res
      .status(200)
      .json({ message: "Proveedor actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
};

// Eliminar un proveedor (solo para administradores)
const deleteProveedor = async (req, res) => {
  const { userRole } = req.query;

  try {
    if (userRole !== "RL01") {
      await logEvent(
        "DELETE",
        "/proveedores",
        req.ip,
        "N/A",
        "Acceso denegado"
      );
      return res
        .status(403)
        .json({ message: "No tienes permiso para realizar esta acción." });
    }

    const { codigo } = req.params;
    await pool.query("DELETE FROM proveedor WHERE codigo = $1", [codigo]);
    await logEvent(
      "DELETE",
      `/proveedores/${codigo}`,
      req.ip,
      "N/A",
      `Proveedor eliminado con código ${codigo}`
    );
    return res
      .status(200)
      .json({ message: "Proveedor eliminado exitosamente" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
};

module.exports = {
  getProveedores,
  getProveedor,
  createProveedor,
  updateProveedor,
  deleteProveedor,
};
