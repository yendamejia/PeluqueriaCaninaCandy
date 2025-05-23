# Peluquería Canina Candy - Backend

Este es el backend del sistema de gestión de reservas para la Peluquería Canina Candy.  
Fue desarrollado con **Node.js**, **Express.js** y **MongoDB (Mongoose)** como parte del segundo proyecto del Bootcamp de desarrollo web de BIT.

##  Descripción del proyecto

El sistema permite:
- Registrar usuarios (cliente o administrador)
- Registrar mascotas asociadas a cada usuario
- Crear reservas de turnos para baño y peluquería
- Calcular el precio automáticamente según la raza de la mascota
- Asignar horarios de atención con un máximo de 7 turnos diarios
- Cancelar reservas con más de 4 horas de anticipación
- Consultar las reservas del día (para la peluquera)

##  Horarios de atención

- Horario: de lunes a sábado, de **8:00 am a 3:00 pm**
- La peluquería **no atiende los domingos**
- Se aceptan **máximo 7 perros por día**
- Turnos por hora:
  1. 08:00
  2. 09:00
  3. 10:00
  4. 11:00
  5. 12:00
  6. 14:00
  7. 15:00

## Lógica del sistema

### Asignación de turnos:
- El backend detecta cuántas reservas ya existen para una fecha
- Si hay disponibilidad, se asigna automáticamente el siguiente horario
- Si ya hay 7 reservas ese día, el sistema muestra error: “No hay turnos disponibles”

### Precio por raza:
- El backend contiene una lista con precios según la raza del perro
- Si la raza no está en la lista, el sistema indica: “Precio por confirmar...”
- El precio se guarda automáticamente en la reserva

### Cancelaciones:
- Las reservas solo pueden cancelarse si faltan más de **4 horas**
- Si no, se muestra un error indicando que ya no es posible cancelar

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Postman (para pruebas)