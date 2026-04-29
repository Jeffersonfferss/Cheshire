const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    rol: { type: String, enum: ['admin', 'jugador'], default: 'jugador' },
    handicap: { type: Number, default: 36.0 } 
}, { timestamps: true }); 

module.exports = mongoose.model('Usuario', UsuarioSchema);