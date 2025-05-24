const express = require('express');
const router = express.Router();

const {
  crearReserva, 
  obtenerReservasPorDia,
  cancelarReserva
} = require("../controllers/reservaController");

router.post('/', crearReserva);
router.get('/dia', obtenerReservasPorDia);
router.patch('/cancelar/:id', cancelarReserva);

module.exports = router;


