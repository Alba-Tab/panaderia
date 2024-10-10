const { Client } = require('pg');
const bcrypt = require('bcrypt');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

const encryptPasswords = async () => {
    try {
        await client.connect();

        // Obtener todos los usuarios
        const res = await client.query('SELECT codigo, contrasena FROM usuario'); // Asegúrate de que "users" es el nombre correcto de tu tabla
        console.log(res.rows);
        const users = res.rows;

        for (const user of users) {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(user.password, 10);

            // Actualizar la contraseña encriptada en la base de datos
            await client.query('UPDATE usuario SET contrasena = $1 WHERE codigo = $2', [hashedPassword, user.id]);

            console.log(`Contraseña encriptada para el usuario ID: ${user.id}`);
        }

        console.log('Todas las contraseñas han sido encriptadas.');
        const res2 = await client.query('SELECT codigo, contrasena FROM usuario');
    } catch (error) {
        console.error('Error al encriptar contraseñas:', error);
    } finally {
        await client.end();
    }
};

// Ejecutar la función
encryptPasswords();

