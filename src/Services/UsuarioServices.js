const Usuario = require('../Models/Usuario');
const jwt = require('jsonwebtoken');

class UsuarioServices {
  async crearUsuario(datos) {
    const usuario = new Usuario(datos);
    return await usuario.save();
  }

  async obtenerTodos() {
    return await Usuario.find().select('-password');
  }

  async obtenerPorId(id) {
    return await Usuario.findById(id).select('-password');
  }

  async obtenerPorEmail(email) {
    return await Usuario.findOne({ email });
  }

  async actualizarUsuario(id, datos) {
    if (datos.password) {
      delete datos.password;
    }
    return await Usuario.findByIdAndUpdate(id, datos, { new: true }).select('-password');
  }

  async eliminarUsuario(id) {
    return await Usuario.findByIdAndDelete(id);
  }

  async iniciarSesion(email, password) {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      throw new Error('Credenciales inválidas');
    }

    const esValido = await usuario.comparePassword(password);
    if (!esValido) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { token, usuario: { ...usuario._doc, password: undefined } };
  }

  async actualizarHandicap(id, handicap) {
    return await Usuario.findByIdAndUpdate(id, { handicap }, { new: true }).select('-password');
  }
}

module.exports = new UsuarioServices();