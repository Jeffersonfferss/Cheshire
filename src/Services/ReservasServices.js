const Reserva = require('../Models/Reserva');

class ReservasServices {
  async crearReserva(datos) {
    const reservaExistente = await Reserva.findOne({
      campo: datos.campo,
      fecha: datos.fecha,
      hora: datos.hora,
      estado: { $ne: 'cancelada' }
    });

    if (reservaExistente) {
      throw new Error('Ya existe una reserva para este horario');
    }

    const reserva = new Reserva(datos);
    return await reserva.save();
  }

  async obtenerTodos() {
    return await Reserva.find()
      .populate('usuario', 'nombre email')
      .populate('campo', 'nombre ubicacion');
  }

  async obtenerPorId(id) {
    return await Reserva.findById(id)
      .populate('usuario', 'nombre email')
      .populate('campo', 'nombre ubicacion');
  }

  async obtenerPorUsuario(usuarioId) {
    return await Reserva.find({ usuario: usuarioId })
      .populate('campo', 'nombre ubicacion')
      .sort({ fecha: -1 });
  }

  async obtenerPorCampo(campoId, fecha) {
    const filtro = { campo: campoId, estado: { $ne: 'cancelada' } };
    if (fecha) {
      filtro.fecha = fecha;
    }
    return await Reserva.find(filtro).populate('usuario', 'nombre email');
  }

  async actualizarReserva(id, datos) {
    return await Reserva.findByIdAndUpdate(id, datos, { new: true })
      .populate('usuario', 'nombre email')
      .populate('campo', 'nombre ubicacion');
  }

  async cancelarReserva(id) {
    return await Reserva.findByIdAndUpdate(id, { estado: 'cancelada' }, { new: true });
  }

  async eliminarReserva(id) {
    return await Reserva.findByIdAndDelete(id);
  }

  async verificarDisponibilidad(campoId, fecha, hora) {
    const reserva = await Reserva.findOne({
      campo: campoId,
      fecha: fecha,
      hora: hora,
      estado: { $ne: 'cancelada' }
    });
    return !reserva;
  }
}

module.exports = new ReservasServices();