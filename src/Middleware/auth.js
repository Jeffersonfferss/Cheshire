const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario');

const verificarToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select('-password');
    
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

const verificarAdmin = (req, res, next) => {
  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado. Se requiere rol de administrador' });
  }
  next();
};

const verificarPropietarioReserva = async (req, res, next) => {
  const Reserva = require('../Models/Reserva');
  const reservaId = req.params.id;
  
  if (req.usuario.rol === 'admin') {
    return next();
  }
  
  try {
    const reserva = await Reserva.findById(reservaId);
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    
    if (reserva.usuario_id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({ mensaje: 'No tienes permiso para acceder a esta reserva' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al verificar reserva', error: error.message });
  }
};

const verificarPropiedadReserva = async (req, res, next) => {
  const Reserva = require('../Models/Reserva');
  const reservaId = req.params.id;
  
  if (req.usuario.rol === 'admin') {
    return next();
  }
  
  try {
    const reserva = await Reserva.findById(reservaId);
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    
    if (reserva.usuario_id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({ mensaje: 'No tienes permiso para modificar esta reserva' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al verificar reserva', error: error.message });
  }
};

const esPropietario = (req, res, next) => {
  const usuarioId = req.params.usuarioId;
  
  if (req.usuario.rol === 'admin') {
    return next();
  }
  
  if (usuarioId !== req.usuario._id.toString()) {
    return res.status(403).json({ mensaje: 'No tienes permiso para ver información de otros usuarios' });
  }
  
  next();
};

module.exports = { verificarToken, verificarAdmin, verificarPropietarioReserva, verificarPropiedadReserva, esPropietario };