const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    especie: {type: String, enum: ['perro', 'gato'], required: true },
    raza: String, 
    tamaño: {type: String, enum: ['pequeño', 'mediano', 'grande'], required: true },
    edad: Number, 
    dueño: {type: mongoose.Schema.Types.ObjectId, ref: usuario, required: true }
});

module.exports = mongoose.model('Mascota', mascotaSchema);