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
    const ide_rol = req.params.ide_rol;
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
    const { ide_rol, permiso } = req.body;

    // Buscar el ide del Permiso por su nombre
    const permisoResult = await pool.query(
      "SELECT ide FROM permiso WHERE nombre = $1",
      [permiso]
    );
    const ide_permiso = permisoResult.rows[0].ide;

    // Insertar el nuevo permiso en la tabla Rol_Permiso
    await pool.query(
      "INSERT INTO rol_permiso (ide_permiso, ide_rol) VALUES ($1, $2)",
      [ide_permiso, ide_rol]
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
      [ide_permiso, ide_rol]
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
    res.json(result.rows);
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
