const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuario WHERE codigo = $1', [username]);
        console.log(result.rows);
        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Verifica la contraseña cifrada
            //const isMatch = await bcrypt.compare(password, user.contrasena);
            if (password === user.contrasena) {
                // Genera un token
                const token = jwt.sign({ codigo: user.codigo }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ success: true, token });
            }
        }
        return res.status(401).json({ success: false, message: 'Código o contraseña incorrectos' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

module.exports = router;
