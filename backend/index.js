require('dotenv').config({path:'./.env'});
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const facturaRoutes = require('./routes/factura');
const pool = require('./db'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);
//Rutas de factura
app.use('/factura', facturaRoutes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});


module.exports = pool;
