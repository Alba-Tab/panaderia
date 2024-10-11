const express = require('express');
const pool = require('../db');
const router = express.Router();


// Ruta para obtener todos los usuarios (solo para administradores)
router.get('/usuarios', async (req, res) => {
    const { codigo, userRole } = req.query;
    
    try {
        // Aquí podrías querer validar que el rol del usuario sea 'RL01'
        if (userRole !== 'RL01') {
            return res.status(403).json({ message: 'No tienes permiso para ver esta información.' });
        }
        
        // Suponiendo que estás usando una consulta SQL para obtener los usuarios
        const query = 'SELECT * FROM usuario WHERE codigo != $1'; // Cambia esto según tus necesidades
        const result = await pool.query(query, [codigo]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        res.status(500).json({ message: 'Error al cargar los usuarios' });
    }
});

// Ruta para obtener los datos del usuario logueado
router.get('/usuarios/me', async (req, res) => {
    const { codigo } = req.query; // Cambiar a req.query
    
    try {
        const result = await pool.query('SELECT * FROM usuario WHERE codigo = $1', [codigo]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario logueado:', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

// Ruta saber si un usuario es existe
router.get('/usuarios/existe', async (req, res) => {
    const { codigo } = req.query; // Cambiar a req.query
    
    try {
        const result = await pool.query('SELECT codigo as cod FROM usuario WHERE codigo = $1', [codigo]);
        if(result.rows.length > 0){
            res.json({status :true}); 
        }
        res.json({status :false});
    } catch (error) {
        console.error('Error al obtener el usuario :', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

// Ruta para obtener el último código de usuario
router.get('/usuarios/lastCode', async (req, res) => {
    try {
        const result = await pool.query('SELECT codigo FROM usuario ORDER BY codigo DESC LIMIT 1'); // Asegúrate de que 'codigo' sea la columna que contiene el código del usuario
        if (result.rows.length > 0) {
            res.json({ codigo: result.rows[0].codigo }); // Devuelve el último código
        } else {
            res.json({ codigo: 'US01' }); // Devuelve un valor por defecto si no hay usuarios
        }
    } catch (error) {
        console.error('Error al obtener el último código:', error);
        res.status(500).json({ message: 'Error al obtener el último código' });
    }
});


// Ruta para obtener todos los roles
router.get('/roles', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM roles'); // Ajusta la consulta según tu base de datos
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener roles:', error);
        res.status(500).json({ message: 'Error al obtener roles' });
    }
});

// Ruta para agregar un usuario
router.post('/add', async (req, res) => {
    const { codigo, nombre, contrasena, sexo, telefono, ide_rol } = req.body; // Cambia `req.query` a `req.body`

    try {
        // Validar que no existe el usuario
        const existingUser = await pool.query('SELECT * FROM usuario WHERE codigo = $1', [codigo]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe.',sucess:false });
        }

        const result = await pool.query(
            'INSERT INTO usuario (codigo, nombre, contrasena, sexo, telefono, ide_rol) VALUES ($1, $2, $3, $4, $5, $6)',
            [codigo, nombre, contrasena, sexo, telefono, ide_rol]
        );
        res.status(201).json({ message: 'Usuario agregado exitosamente' , sucess:true});
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(500).json({ message: 'Error al agregar el usuario' });
    }
});

// Ruta para modificar un usuario
router.put('/usuarios/:codigo', async (req, res) => {
    const { codigo } = req.params; // Código del usuario a modificar
    const { nombre,contrasena, telefono,rol } = req.body; // Nuevos valores
    
    try {
        
        const result = await pool.query(
            'UPDATE usuario SET nombre = $1, contrasena= $2, telefono = $3, ide_rol=$4 WHERE codigo = $5',
            [nombre,contrasena, telefono,rol, codigo]
        );
        res.status(204).send(); // No devuelve nada
    } catch (error) {
        console.error('Error al modificar el usuario:', error);
        res.status(500).json({ message: 'Error al modificar el usuario' });
    }
});

// Ruta para eliminar un usuario
router.delete('/usuarios/:codigo', async (req, res) => {
    const { codigo } = req.params; // Código del usuario a eliminar
    const userRole = req.query.userRole; // Obtener userRole de los parámetros de la consulta

    try {        
        if (userRole !== 'RL01') {
        return res.status(403).json({ message: 'No tienes permiso para ver esta información.' });
    }
        const result = await pool.query('DELETE FROM usuario WHERE codigo = $1', [codigo]);
        res.status(204).send(); // No devuelve nada
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});


module.exports = router;

