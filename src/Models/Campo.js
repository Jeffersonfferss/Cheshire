const mongoose = require('mongoose');

const CampoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ubicacion: String,
    direccion: String,
    telefono: String,
    email: String,
    web: String,
    hoyos: { type: Number, enum: [9, 18], default: 18 },
    par: { type: Number, default: 72 },
    precio_socio: Number,
    precio_invitado: Number,
    precio_total: Number,
    disponibilidad: { type: Boolean, default: true },
    servicios: [String],
    descripcion: String,
    imagen: String
}, { timestamps: true });

module.exports = mongoose.model('Campo', CampoSchema);