require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const facturaRoutes = require('./routes/factura');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/roles');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);
// Rutas de factura
app.use('/factura', facturaRoutes);
// Rutas de usuarios
app.use('/user', userRoutes);
// Rutas de roles
app.use('/roles', roleRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

module.exports = pool;
