const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    especie: {type: String, enum: ['perro', 'gato'], required: true },
    raza: { type: String, required: true},
    edad: Number, 
    dueño: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
});

module.exports = mongoose.model('Mascota', mascotaSchema);