const Mascota = require('../models/mascota');

// Crear nueva mascota
const crearMascota = async (req, res) => {
  try {
    const nuevaMascota = new Mascota(req.body);
    await nuevaMascota.save();
    res.status(201).json(nuevaMascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las mascotas
const obtenerMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.find().populate('dueño');
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearMascota,
  obtenerMascotas
};
