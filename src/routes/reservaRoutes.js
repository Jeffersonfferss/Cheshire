const express = require('express');
const router = express.Router();
const reservaController = require('../Controllers/reservaController');


router.post('/nueva', reservaController.crearReserva);
router.get('/usuario/:usuarioId', reservaController.misReservas);

module.exports = router;