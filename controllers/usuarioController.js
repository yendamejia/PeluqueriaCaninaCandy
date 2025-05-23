const Usuario = require('../models/Usuario');

//crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear usuario, error");
    res.status(500).json({ error: error.message });
  }
};

// obtener los usuarios 

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
      console.error("Error al crear usuario, error");
      res.status(500).json({error: error.message });    
    }
};

module.exports ={
    crearUsuario,
    obtenerUsuarios
};