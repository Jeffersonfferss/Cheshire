const Resultado = require('../Models/Resultado');

const guardarTarjeta = async (req, res) => {
    try {
        const { usuario, campo, fecha, puntuacion, observaciones, diferencial } = req.body;

        if (!usuario || !campo || !puntuacion) {
            return res.status(400).json({ mensaje: 'Usuario, campo y puntuación son requeridos' });
        }

        const nuevoResultado = new Resultado({
            usuario_id: usuario,
            campo_id: campo,
            fecha: fecha || new Date(),
            puntuacion,
            observaciones,
            diferencial
        });

        await nuevoResultado.save();
        const populated = await Resultado.findById(nuevoResultado._id).populate('campo_id', 'nombre par').populate('usuario_id', 'nombre');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al guardar tarjeta', error: error.message });
    }
};

const verHistorial = async (req, res) => {
    try {
        const { ordenar } = req.query;
        const orden = ordenar === 'asc' ? 1 : -1;

        const resultados = await Resultado.find({ usuario_id: req.params.usuarioId })
            .populate('campo_id', 'nombre par')
            .sort({ fecha: orden });
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener historial', error: error.message });
    }
};

const listarResultados = async (req, res) => {
    try {
        const { ordenar } = req.query;
        const orden = ordenar === 'asc' ? 1 : -1;

        const resultados = await Resultado.find()
            .populate('campo_id', 'nombre par')
            .populate('usuario_id', 'nombre email')
            .sort({ fecha: orden });
        res.status(200).json(resultados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar resultados', error: error.message });
    }
};

const obtenerResultado = async (req, res) => {
    try {
        const resultado = await Resultado.findById(req.params.id)
            .populate('campo_id', 'nombre par')
            .populate('usuario_id', 'nombre email');
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Resultado no encontrado' });
        }
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener resultado', error: error.message });
    }
};

const actualizarResultado = async (req, res) => {
    try {
        const resultado = await Resultado.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('campo_id', 'nombre par').populate('usuario_id', 'nombre');
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Resultado no encontrado' });
        }
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar resultado', error: error.message });
    }
};

const eliminarResultado = async (req, res) => {
    try {
        const resultado = await Resultado.findByIdAndDelete(req.params.id);
        if (!resultado) {
            return res.status(404).json({ mensaje: 'Resultado no encontrado' });
        }
        res.status(200).json({ mensaje: 'Resultado eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar resultado', error: error.message });
    }
};

module.exports = { guardarTarjeta, verHistorial, listarResultados, obtenerResultado, actualizarResultado, eliminarResultado };