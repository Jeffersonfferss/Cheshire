const mongoose = require('mongoose');

const ResultadoSchema = new mongoose.Schema({
    usuario_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true 
    },
    campo_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campo',
        required: true 
    },
    fecha: { 
        type: Date, 
        default: Date.now 
    },
    puntuacion: { 
        type: Number, 
        required: true 
    },
    observaciones: String,
    diferencial: Number
}, { timestamps: true });

module.exports = mongoose.model('Resultado', ResultadoSchema);