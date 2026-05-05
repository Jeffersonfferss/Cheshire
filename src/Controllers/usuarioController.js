const Usuario = require('../Models/Usuario');
const jwt = require('jsonwebtoken');


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

const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña son requeridos' });
        }

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const esValido = await usuario.comparePassword(password);
        if (!esValido) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                handicap: usuario.handicap
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

const obtenerPerfil = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-password');
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar usuarios', error: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
    }
};

module.exports = { registrarUsuario, iniciarSesion, obtenerPerfil, listarUsuarios, eliminarUsuario };