const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI;

const conectarDB = async () => {
    try {
        console.log(` Intentando conectar a MongoDB...`);
        
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log(` ✓ Conectado a MongoDB: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(' ✗ Error de conexión:', error.message);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log(' ⚠ Conexión a MongoDB perdida');
});

mongoose.connection.on('error', (err) => {
    console.error(' ✗ Error en MongoDB:', err);
});

module.exports = conectarDB;