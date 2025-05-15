const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre: {type: String, requiered: true },
    correo: {type: String, required: true, unique: true},
    contraseña: {type: String, required: true},
    rol: {type: String, enum: ['admin', 'usuario'], default: 'usuario'}
})

module.exports = mongoose.model('Usuario', usuarioSchema);
