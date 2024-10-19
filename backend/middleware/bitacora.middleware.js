const pool = require('../db');

const logEvent = async (metodo, ruta, ip, usuario, mensaje) => {
    try {
        await pool.query('INSERT INTO bitacora (metodo, ruta, ip, usuario, mensaje) VALUES ($1, $2, $3, $4, $5)', 
            [metodo, ruta, ip, usuario, mensaje]);
    } catch (error) {
        console.error('Error al registrar en la bitácora:', error);
    }
};

module.exports = logEvent;