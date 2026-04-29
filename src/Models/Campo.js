const mongoose = require('mongoose');


const HoyoSchema = new mongoose.Schema({
    numero: Number,
    par: { type: Number, enum: [3, 4, 5] },
    dificultad: Number, // Hándicap del hoyo (1-18)
    metros: Number
});

const CampoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: String,
    precio_socio: Number,
    hoyos: [HoyoSchema] 
});

module.exports = mongoose.model('Campo', CampoSchema);