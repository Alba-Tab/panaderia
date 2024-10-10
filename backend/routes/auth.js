const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    const { codigo, password } = req.body;

    try {
        const userQuery = 'SELECT * FROM usuario WHERE codigo = $1';
        const result = await pool.query(userQuery, [codigo]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({success: true, message: 'Usuario no encontrado' });
        }
        
            const user = result.rows[0];

            // Verifica la contraseña cifrada
            //const isMatch = await bcrypt.compare(password, user.contrasena);
            if ((password !== user.contrasena)) {
                return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
            } 
            // Genera un token
            const token = jwt.sign({ codigo: user.codigo, userRole: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, user, token });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

module.exports = router;
