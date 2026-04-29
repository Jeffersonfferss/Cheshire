const Resultado = require('../Models/Resultado');

// 1. Guardar la tarjeta de puntuación al terminar
const guardarTarjeta = async (req, res) => {
    try {
        const { reserva_id, usuario_id, puntuacion_hoyos } = req.body;

        // Sumamos los golpes automáticamente
        const total_golpes = puntuacion_hoyos.reduce((acc, h) => acc + h.golpes, 0);

        const nuevoResultado = new Resultado({
            reserva_id,
            usuario_id,
            puntuacion_hoyos,
            total_golpes
        });

        await nuevoResultado.save();
        res.status(201).json({ mensaje: 'Tarjeta guardada', resultado: nuevoResultado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al guardar tarjeta', error: error.message });
    }
};

// 2. Ver historial de partidas de un jugador
const verHistorial = async (req, res) => {
    try {
        const resultados = await Resultado.find({ usuario_id: req.params.usuarioId })
            .sort({ createdAt: -1 }); // De la más reciente a la más antigua
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener historial', error: error.message });
    }
};

module.exports = { guardarTarjeta, verHistorial };