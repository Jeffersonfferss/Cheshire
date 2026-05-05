require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const conectarDB = require('./db/database.js');
const rutasCompletas = require('./routes/rutas.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/views', express.static(path.join(__dirname, '../views')));

app.use('/api', rutasCompletas);

const iniciarServidor = async () => {
    try {
        await conectarDB();
        console.log(' ✓ Base de datos conectada');
        
        app.listen(PORT, () => {
            console.log(` ✓ Servidor de Golf listo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(' ✗ Error al iniciar servidor:', error.message);
        process.exit(1);
    }
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

iniciarServidor();