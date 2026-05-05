const express = require('express');
const router = express.Router();

const usuarioController = require('../Controllers/usuarioController');
const campoController = require('../Controllers/campoController');
const reservaController = require('../Controllers/reservaController');
const resultadoController = require('../Controllers/resultadoController');
const { verificarToken, verificarAdmin } = require('../Middleware/auth');

router.post('/usuarios/registro', usuarioController.registrarUsuario);
router.post('/usuarios/login', usuarioController.iniciarSesion);

router.get('/usuarios/perfil/:id', verificarToken, usuarioController.obtenerPerfil);

router.get('/usuarios', verificarToken, verificarAdmin, usuarioController.listarUsuarios);
router.delete('/usuarios/:id', verificarToken, verificarAdmin, usuarioController.eliminarUsuario);

router.get('/campos/lista', verificarToken, campoController.listarCampos);
router.get('/campos', verificarToken, campoController.listarCampos);
router.get('/campos/:id', verificarToken, campoController.obtenerCampo);
router.post('/campos', verificarToken, verificarAdmin, campoController.crearCampo);
router.post('/campos/nuevo', verificarToken, verificarAdmin, campoController.crearCampo);
router.put('/campos/:id', verificarToken, verificarAdmin, campoController.actualizarCampo);
router.delete('/campos/:id', verificarToken, verificarAdmin, campoController.eliminarCampo);

router.post('/reservas/crear', verificarToken, reservaController.crearReserva);
router.post('/reservas', verificarToken, reservaController.crearReserva);
router.get('/reservas', verificarToken, verificarAdmin, reservaController.listarReservas);
router.get('/reservas/usuario/:usuarioId', verificarToken, reservaController.misReservas);
router.get('/reservas/:id', verificarToken, reservaController.obtenerReserva);
router.put('/reservas/:id', verificarToken, reservaController.actualizarReserva);
router.delete('/reservas/:id', verificarToken, reservaController.cancelarReserva);
router.delete('/reservas/cancelar/:id', verificarToken, reservaController.cancelarReserva);

router.post('/resultados/guardar', verificarToken, resultadoController.guardarTarjeta);
router.post('/resultados', verificarToken, resultadoController.guardarTarjeta);
router.get('/resultados', verificarToken, verificarAdmin, resultadoController.listarResultados);
router.get('/resultados/usuario/:usuarioId', verificarToken, resultadoController.verHistorial);
router.get('/resultados/:id', verificarToken, resultadoController.obtenerResultado);
router.put('/resultados/:id', verificarToken, resultadoController.actualizarResultado);
router.delete('/resultados/:id', verificarToken, verificarAdmin, resultadoController.eliminarResultado);

module.exports = router;