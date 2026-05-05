const Reserva = require('../Models/Reserva');

const crearReserva = async (req, res) => {
    try {
        const usuario = req.body.usuario || req.body.usuario_id || req.usuario._id;
        
        if (req.usuario.rol !== 'admin' && usuario !== req.usuario._id.toString()) {
            return res.status(403).json({ mensaje: 'Solo puedes crear reservas para ti mismo' });
        }
        
        const campo = req.body.campo || req.body.campo_id;
        const { fecha, hora, num_jugadores, hoyos } = req.body;

        if (!usuario || !campo || !fecha || !hora) {
            return res.status(400).json({ mensaje: 'Usuario, campo, fecha y hora son requeridos' });
        }

        const reservaExistente = await Reserva.findOne({ campo_id: campo, fecha, hora });
        if (reservaExistente) {
            return res.status(400).json({ mensaje: 'Lo sentimos, este horario ya está reservado.' });
        }

        const nuevaReserva = new Reserva({
            usuario_id: usuario,
            campo_id: campo,
            fecha,
            hora,
            hoyos: hoyos || 18,
            num_jugadores: num_jugadores || 1,
            estado: 'pendiente'
        });

        await nuevaReserva.save();
        const populated = await Reserva.findById(nuevaReserva._id)
            .populate('campo_id', 'nombre ubicacion par')
            .populate('usuario_id', 'nombre email');
        res.status(201).json(populated);

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar la reserva', error: error.message });
    }
};

const misReservas = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { ordenar, anio, estado, activo } = req.query;
        
        if (req.usuario.rol !== 'admin' && usuarioId !== req.usuario._id.toString()) {
            return res.status(403).json({ mensaje: 'No tienes permiso para ver reservas de otros usuarios' });
        }
        
        const orden = ordenar === 'asc' ? 1 : -1;
        const filtro = { usuario_id: usuarioId };
        
        if (anio) {
            const inicioAnio = new Date(`${anio}-01-01`);
            const finAnio = new Date(`${anio}-12-31T23:59:59`);
            filtro.fecha = { $gte: inicioAnio, $lte: finAnio };
        }
        
        if (estado) {
            filtro.estado = estado;
        } else if (activo === 'true') {
            filtro.estado = { $in: ['pendiente', 'confirmada'] };
        }

        const reservas = await Reserva.find(filtro)
            .populate('campo_id', 'nombre par')
            .sort({ fecha: orden });
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener mis reservas', error: error.message });
    }
};

const listarReservas = async (req, res) => {
    try {
        if (req.usuario.rol !== 'admin') {
            return res.status(403).json({ mensaje: 'Solo el administrador puede ver todas las reservas' });
        }
        
        const { ordenar, anio, estado } = req.query;
        const orden = ordenar === 'asc' ? 1 : -1;
        const filtro = {};
        
        if (anio) {
            const inicioAnio = new Date(`${anio}-01-01`);
            const finAnio = new Date(`${anio}-12-31T23:59:59`);
            filtro.fecha = { $gte: inicioAnio, $lte: finAnio };
        }
        
        if (estado) {
            filtro.estado = estado;
        }

        const reservas = await Reserva.find(filtro)
            .populate('campo_id', 'nombre ubicacion par')
            .populate('usuario_id', 'nombre email')
            .sort({ fecha: orden });
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar reservas', error: error.message });
    }
};

const obtenerReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id)
            .populate('campo_id', 'nombre ubicacion par')
            .populate('usuario_id', 'nombre email');
        
        if (!reserva) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }
        
        if (req.usuario.rol !== 'admin' && reserva.usuario_id._id.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ mensaje: 'No tienes permiso para ver esta reserva' });
        }
        
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reserva', error: error.message });
    }
};

const actualizarReserva = async (req, res) => {
    try {
        const reservaExistente = await Reserva.findById(req.params.id);
        if (!reservaExistente) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }
        
        if (req.usuario.rol !== 'admin' && reservaExistente.usuario_id.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ mensaje: 'No tienes permiso para modificar esta reserva' });
        }
        
        const reserva = await Reserva.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('campo_id', 'nombre par').populate('usuario_id', 'nombre');
        
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar reserva', error: error.message });
    }
};

const cancelarReserva = async (req, res) => {
    try {
        const reservaExistente = await Reserva.findById(req.params.id);
        if (!reservaExistente) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }
        
        if (req.usuario.rol !== 'admin' && reservaExistente.usuario_id.toString() !== req.usuario._id.toString()) {
            return res.status(403).json({ mensaje: 'No tienes permiso para cancelar esta reserva' });
        }
        
        const reserva = await Reserva.findByIdAndUpdate(
            req.params.id,
            { estado: 'cancelada' },
            { new: true }
        );
        res.status(200).json({ mensaje: 'Reserva cancelada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al cancelar reserva', error: error.message });
    }
};

module.exports = { crearReserva, misReservas, listarReservas, obtenerReserva, actualizarReserva, cancelarReserva };