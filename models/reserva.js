const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    mascota: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required:true},
    servicio: {
        type: String,
        enum: ['Baño y peluquería canina', 'baño felino'],
        required: true
    },
    precioTotal: { type: Number, required: true },
    estado: { 
        type: String,
        enum: ['pendiente', 'confirmado', 'cancelado', 'completado'],
        default: 'pendiente'
    }
});

module.exports = mongoose.model('Reserva', reservaSchema);