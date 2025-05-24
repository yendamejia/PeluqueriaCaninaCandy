const express = require('express');
const router = express.Router();
const {crearMascota, obtenerMascotas } = require('../controllers/mascotaController');

router.post('/', crearMascota);
router.get('/', obtenerMascotas);

module.exports = router;
