const Campo = require('../Models/Campo');

const crearCampo = async (req, res) => {
    try {
        const { nombre, ubicacion, precio_socio, hoyos } = req.body;

        if (!hoyos || hoyos.length !== 18) {
            return res.status(400).json({ mensaje: 'Debes incluir los 18 hoyos' });
        }

        const nuevoCampo = new Campo({ nombre, ubicacion, precio_socio, hoyos });
        await nuevoCampo.save();

        res.status(201).json({ mensaje: 'Campo creado con éxito', campo: nuevoCampo });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear campo', error: error.message });
    }
};


const listarCampos = async (req, res) => {
    try {
        const campos = await Campo.find();
        res.status(200).json(campos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar campos', error: error.message });
    }
};

module.exports = { crearCampo, listarCampos };