const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    mascota { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: True }
    fecha: {type: Date, required: true },
    servicios: [String],
    estado: { type: String, enum: ['pendiente', 'confirmado', 'cancelado', 'completado'], default:
})

module.exports = mongoose.model('Reserva', reservaSchema);
