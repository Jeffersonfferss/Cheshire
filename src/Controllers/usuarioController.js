const Usuario = require('../Models/Usuario');


const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, handicap } = req.body;

        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        const nuevoUsuario = new Usuario({ nombre, email, password, handicap });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario creado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
};

// 2. Obtener perfil de usuario
const obtenerPerfil = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message });
    }
};

module.exports = { registrarUsuario, obtenerPerfil };