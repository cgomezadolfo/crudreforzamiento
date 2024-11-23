// Importar dependencias
const express = require("express");
const dotenv = require("dotenv");

// Importar modelos
require("./models/usuario");
require("./models/curso");
require("./models/inscripcion");

// Cargar variables de entorno
dotenv.config();

// Importar el archivo de conexión a la base de datos
const db = require("./models/db");

// Inicializar la aplicación
const app = express();

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Registrar rutas
app.use(authRoutes);
app.use(userRoutes);
app.use(courseRoutes);
app.use(analyticsRoutes);

// Ruta de ejemplo
app.get("/", (req, res) => {
    res.send("Bienvenido a TechWorld Learning Platform");
});

// Ruta de prueba para verificar conexión a la base de datos
app.get("/db-test", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");
        res.status(200).send(`Conexión exitosa: ${result.rows[0].now}`);
    } catch (error) {
        console.error("Error al realizar consulta:", error.message);
        res.status(500).send("Error al conectar con la base de datos.");
    }
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});