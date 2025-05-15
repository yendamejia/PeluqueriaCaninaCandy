const express = require("express")
const app = express()
const port = 3000

const mongoose =require("mongoose")

// conectar a mongoose

mongoose.connect("mongodb://localhost:27017/peluqueriaCanina", {
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexion exitosa a mongo")
}).catch((error) =>{
    console.log("Error al conectarnos a mongo:" + error)

})
// escuchando desde el puerto 3000
app.listen(port, () => {
    console.log("servidor funcionado por el puerto " + port)
})