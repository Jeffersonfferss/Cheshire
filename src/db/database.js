const mongoose = require('mongoose');
require('dotenv').config();

const {
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DB,
    MONGO_PORT
} = process.env;

const buildMongoUri = () => {
    
    const user = encodeURIComponent(MONGO_USER);
    const password = encodeURIComponent(MONGO_PASSWORD);
    
    
    return `mongodb://${user}:${password}@${MONGO_HOST}:${MONGO_PORT || 27017}/${MONGO_DB}?authSource=admin`;
}

const conectarDB = async () => {
    try {
        const mongoUri = buildMongoUri();
        
        console.log(` Intentando conectar a: mongodb://***:***@${MONGO_HOST}/${MONGO_DB}`);
        
        await mongoose.connect(mongoUri);
        console.log(` Conectado a MongoDB (${MONGO_DB}@${MONGO_HOST})`);
    } catch (error) {
        console.error(' Error de conexión:', error.message);
        process.exit(1);
    }
}

module.exports = conectarDB;