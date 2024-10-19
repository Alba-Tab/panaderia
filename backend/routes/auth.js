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
            await pool.query('INSERT INTO bitacora (metodo, ruta, ip, usuario, mensaje) VALUES ($1, $2, $3, $4, $5)', 
                ['POST', '/login', req.ip, codigo, 'Usuario no encontrado']);
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        
        const user = result.rows[0]; 
    
        if (password !== user.contrasena) {
            await pool.query('INSERT INTO bitacora (metodo, ruta, ip, usuario, mensaje) VALUES ($1, $2, $3, $4, $5)', 
                ['POST', '/login', req.ip, codigo, 'Contraseña incorrecta']);
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Verifica la contraseña cifrada
        // const isMatch = await bcrypt.compare(password, user.contrasena);
        // if (!isMatch) {
        //     await pool.query('INSERT INTO bitacora (metodo, ruta, ip, usuario, mensaje) VALUES ($1, $2, $3, $4, $5)', 
        //         ['POST', '/login', req.ip, codigo, 'Contraseña incorrecta']);
        //     return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        // }

        const token = jwt.sign({ 
            codigo: user.codigo, 
            userRole: user.role 
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Inserting into bitacora:', 'POST', '/login', req.ip, codigo, 'Usuario no encontrado');    
        await pool.query('INSERT INTO bitacora (metodo, ruta, ip, usuario, mensaje) VALUES ($1, $2, $3, $4, $5)', 
            ['POST', '/login', req.ip, codigo, 'Login exitoso']);
        res.status(200).json({ success: true, user, token });
    } catch (error) {
        console.error(error);
        await pool.query('INSERT INTO bitacora (metodo, ruta, ip, usuario, mensaje) VALUES ($1, $2, $3, $4, $5)', 
            ['POST', '/login', req.ip, codigo, 'Error en el servidor']);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

//logout
router.post('/logout', async (req, res) => {
    try {
        await pool.query('INSERT INTO bitacora (metodo, ruta, ip, usuario, mensaje) VALUES ($1, $2, $3, $4, $5)', 
            ['POST', '/logout', req.ip, req.body.codigo, 'Logout exitoso']);
        res.status(200).json({ success: true, message: 'Logout exitoso' });
    } catch (error) {
        console.error(error);
        await pool.query('INSERT INTO bitacora (metodo, ruta, ip, usuario, mensaje) VALUES ($1, $2, $3, $4, $5)', 
            ['POST', '/logout', req.ip, req.body.codigo, 'Error en el servidor']);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});


module.exports = router;
