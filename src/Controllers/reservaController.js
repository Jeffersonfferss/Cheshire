const Reserva = require('../Models/Reserva');


const crearReserva = async (req, res) => {
    try {
        const { usuario_id, campo_id, fecha, hora, num_jugadores } = req.body;

        
        const ocupado = await Reserva.findOne({ campo_id, fecha, hora });
        if (ocupado) {
            return res.status(400).json({ mensaje: 'Lo sentimos, este horario ya está reservado.' });
        }

        const nuevaReserva = new Reserva({
            usuario_id,
            campo_id,
            fecha,
            hora,
            num_jugadores
        });

        await nuevaReserva.save();
        res.status(201).json({ mensaje: 'Reserva confirmada', reserva: nuevaReserva });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar la reserva', error: error.message });
    }
};


const misReservas = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        

        const reservas = await Reserva.find({ usuario_id: usuarioId })
            .populate('campo_id', 'nombre ubicación')
            .sort({ fecha: 1 }); 

        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reservas', error: error.message });
    }
};

const cancelarReserva = async (req, res) => {
    try {
        const { reservaId } = req.params;

        const reserva = await Reserva.findByIdAndDelete(reservaId);
        if (!reserva) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }

        res.status(200).json({ mensaje: 'Reserva cancelada', reserva });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al cancelar reserva', error: error.message });
    }
};

module.exports = { crearReserva, misReservas, cancelarReserva };