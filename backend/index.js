require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
// const facturaRoutes = require("./routes/factura");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use("/auth", authRoutes);
// Rutas de factura
// app.use("/factura", facturaRoutes);
// Rutas de usuarios
// app.use("/user", userRoutes);
// Rutas de roles (solo una vez)
app.use(require("./routes/roles.routes"));
app.use(require("./routes/rol_permiso.routes"));

app.use(require("./routes/categoria.routes"));
app.use(require("./routes/insumo.routes"));
app.use(require("./routes/permisos.routes"));
app.use(require("./routes/producto.routes"));
app.use(require("./routes/proveedor.routes"));
app.use(require("./routes/user.routes"));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

module.exports = pool;
