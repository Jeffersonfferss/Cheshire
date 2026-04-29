const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
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
        required: true 
    },
    hora: { 
        type: String, 
        required: true 
    },
    estado: { 
        type: String, 
        enum: ['pendiente', 'confirmada', 'cancelada', 'completada'], 
        default: 'confirmada' 
    },
    num_jugadores: {
        type: Number,
        default: 1,
        min: 1,
        max: 4
    }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', ReservaSchema);