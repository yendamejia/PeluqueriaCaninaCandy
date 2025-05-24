const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

//RUTAS
const usuarioRoutes = require("./routes/usuarioRoutes"); 
const mascotaRoutes = require('./routes/mascotaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');


app.use("/api/usuarios", usuarioRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/reservas', reservaRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("servidor de peluquería canina Candy funcionando");
});

// Conexion a MongoDB 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
     console.log("Conexion exitosa a MongoDB");
     app.listen(port, () => {
       console.log(`servidor funcionando en el puerto ${port}`);
     });
   })
   .catch((error) => {
     console.log("Error al conectarse aMongoDB:", error.message);
   });
   