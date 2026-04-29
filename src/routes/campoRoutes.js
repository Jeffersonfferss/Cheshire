const express = require('express');
const router = express.Router();
const campoController = require('../Controllers/campoController');


router.post('/crear', campoController.crearCampo);

module.exports = router;