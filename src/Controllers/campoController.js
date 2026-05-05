const Campo = require('../Models/Campo');

const crearCampo = async (req, res) => {
    try {
        const { nombre, ubicacion, direccion, telefono, email, web, hoyos, par, precio_socio, precio_invitado, precio_total, servicios, descripcion } = req.body;

        if (!nombre || !ubicacion) {
            return res.status(400).json({ mensaje: 'Nombre y ubicación son requeridos' });
        }

        const nuevoCampo = new Campo({
            nombre,
            ubicacion,
            direccion,
            telefono,
            email,
            web,
            hoyos: hoyos || 18,
            par: par || 72,
            precio_socio,
            precio_invitado,
            precio_total,
            servicios,
            descripcion
        });
        await nuevoCampo.save();

        res.status(201).json(nuevoCampo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear campo', error: error.message });
    }
};

const listarCampos = async (req, res) => {
    try {
        const { ordenar } = req.query;
        const orden = ordenar === 'asc' ? 1 : -1;

        const campos = await Campo.find().sort({ nombre: orden });
        res.status(200).json(campos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar campos', error: error.message });
    }
};

const obtenerCampo = async (req, res) => {
    try {
        const campo = await Campo.findById(req.params.id);
        if (!campo) {
            return res.status(404).json({ mensaje: 'Campo no encontrado' });
        }
        res.status(200).json(campo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener campo', error: error.message });
    }
};

const actualizarCampo = async (req, res) => {
    try {
        const campo = await Campo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!campo) {
            return res.status(404).json({ mensaje: 'Campo no encontrado' });
        }
        res.status(200).json(campo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar campo', error: error.message });
    }
};

const eliminarCampo = async (req, res) => {
    try {
        const campo = await Campo.findByIdAndDelete(req.params.id);
        if (!campo) {
            return res.status(404).json({ mensaje: 'Campo no encontrado' });
        }
        res.status(200).json({ mensaje: 'Campo eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar campo', error: error.message });
    }
};

module.exports = { crearCampo, listarCampos, obtenerCampo, actualizarCampo, eliminarCampo };