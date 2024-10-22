const pool = require("../db");

const getRol_Permiso = async (req, res) => {
  try {
    const { ide_permiso, ide_rol } = req.params;
    const result = await pool.query(
      "SELECT * FROM rol_permiso WHERE ide_permiso = $1 AND ide_rol = $2",
      [ide_permiso, ide_rol]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en la conexión" });
  }
};

const getRol_Permisos = async (req, res) => {
  try {
    const { ide_rol } = req.params;
    console.log(ide_rol);
    const result = await pool.query(
      `
      SELECT r.ide AS ide_rol, r.nombre AS nombre_rol, p.ide AS ide_permiso, p.nombre AS nombre_permiso 
      FROM rol r 
      INNER JOIN rol_permiso rp ON r.ide = rp.ide_rol 
      INNER JOIN permiso p ON rp.ide_permiso = p.ide 
      WHERE r.ide = $1
      `,
      [ide_rol]
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en la conexión" });
  }
};

const getRoles_Permisos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rol_permiso");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en la conexión" });
  }
};

const postRol_Permiso = async (req, res) => {
  try {
    const { ide_rol, ide_permiso } = req.body;

    // Buscar el ide del Permiso por su nombre
    const permisoResult = await pool.query(
      "SELECT ide FROM permiso WHERE ide = $1",
      [ide_permiso]
    );

    if (permisoResult.rows.length === 0) {
      return res.status(404).json({ msg: "Permiso no encontrado" });
    }

    const ide_permiso_db = permisoResult.rows[0].ide;
    console.log(ide_permiso_db);

    // Insertar el nuevo permiso en la tabla Rol_Permiso
    await pool.query(
      "INSERT INTO rol_permiso (ide_rol, ide_permiso) VALUES ($1, $2)",
      [ide_rol, ide_permiso_db]
    );

    // Consultar los datos del último permiso agregado
    const result = await pool.query(
      `
      SELECT r.ide AS ide_rol, r.nombre AS nombre_rol, p.ide AS ide_permiso, p.nombre AS nombre_permiso 
      FROM rol r 
      INNER JOIN rol_permiso rp ON r.ide = rp.ide_rol 
      INNER JOIN permiso p ON rp.ide_permiso = p.ide 
      WHERE rp.ide_permiso = $1 AND rp.ide_rol = $2
      `,
      [ide_permiso_db, ide_rol]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear permiso" });
  }
};

const deleteRol_Permiso = async (req, res) => {
  try {
    const { ide_permiso, ide_rol } = req.params;
    const result = await pool.query(
      "DELETE FROM rol_permiso WHERE ide_permiso = $1 AND ide_rol = $2",
      [ide_permiso, ide_rol]
    );
    res.json({ message: "Insumo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar permiso" });
  }
};

module.exports = {
  getRol_Permiso,
  getRol_Permisos,
  getRoles_Permisos,
  postRol_Permiso,
  deleteRol_Permiso,
};
