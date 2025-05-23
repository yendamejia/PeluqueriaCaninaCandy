const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios } = require('../controllers/usuarioController');

//POST = crear usuario 
router.post('/', crearUsuario);

// Get = obtener la lista de Usuario
router.get('/', obtenerUsuarios);

module.exports = router;


