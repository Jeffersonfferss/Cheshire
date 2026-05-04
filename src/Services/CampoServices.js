const Campo = require('../Models/Campo');

class CampoServices {
  async crearCampo(datos) {
    const campo = new Campo(datos);
    return await campo.save();
  }
 
  async obtenerTodos() {
    return await Campo.find({ disponible: true });
  }

  async obtenerPorId(id) {
    return await Campo.findById(id);
  }

  async actualizarCampo(id, datos) {
    return await Campo.findByIdAndUpdate(id, datos, { new: true });
  }

  async eliminarCampo(id) {
    return await Campo.findByIdAndDelete(id);
  }

  async cambiarDisponibilidad(id, disponible) {
    return await Campo.findByIdAndUpdate(id, { disponible }, { new: true });
  }

  async buscarCampos(criterio) {
    return await Campo.find({
      disponible: true,
      $or: [
        { nombre: { $regex: criterio, $options: 'i' } },
        { ubicacion: { $regex: criterio, $options: 'i' } }
      ]
    });
  }
}

module.exports = new CampoServices();