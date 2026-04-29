const express = require('express');
const router = express.Router();


const usuarioController = require('../Controllers/usuarioController');
const campoController = require('../Controllers/campoController');
const reservaController = require('../Controllers/reservaController');
const resultadoController = require('../Controllers/resultadoController');


router.post('/usuarios/registro', usuarioController.registrarUsuario);
router.get('/usuarios/perfil/:id', usuarioController.obtenerPerfil);
router.post('/campos/nuevo', campoController.crearCampo);
router.get('/campos/lista', campoController.listarCampos);
router.post('/reservas/crear', reservaController.crearReserva);
router.get('/reservas/usuario/:usuarioId', reservaController.misReservas);
router.delete('/reservas/cancelar/:id', reservaController.cancelarReserva);
router.post('/resultados/guardar', resultadoController.guardarTarjeta);
router.get('/resultados/historial/:usuarioId', resultadoController.verHistorial);

module.exports = router;