const mongoose = require('mongoose');


const PuntuacionHoyoSchema = new mongoose.Schema({
    num_hoyo: Number,
    golpes: { type: Number, required: true },
    putts: { type: Number, default: 0 }
});

const ResultadoSchema = new mongoose.Schema({
    reserva_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Reserva',
        required: true 
    },
    usuario_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true 
    },
    puntuacion_hoyos: [PuntuacionHoyoSchema], 
    total_golpes: { 
        type: Number, 
        required: true 
    },
    observaciones: String
}, { timestamps: true });

module.exports = mongoose.model('Resultado', ResultadoSchema);