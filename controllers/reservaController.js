const Reserva = require('../models/reserva');
const Mascota = require('../models/mascota');

//tabla de precios por raza

const preciosPorRaza = {
  "Schnauzer": 38000,
  "French Poodle": 38000,
  "Cocker": 45000,
  "Pitbull": 40000,
  "Samoyedo": 60000,
  "Husky": 70000,
  "Malamute": 70000,
  "Bernés": 70000,
  "Bulldog Francés": 35000,
  "Bulldog Inglés": 38000,
  "Taza de Té": 38000,
  "Gato": 45000,
  "Shih Tzu": 45000,
  "Pastor": 70000,
  "Beagle": 38000,
  "Doberman": 70000,
  "Pincher": 25000,
  "Chihuahua": 25000,
  "Labrador": 50000
};

// Turnos de horarios disponibles

const turnosDisponibles = ["08:00", "9:00", "10:00", "11:00", "12:00", "14:00", "15:00"];
  const crearReserva = async (req, res) => {
  try {
    const { mascotaId, fecha } = req.body;

    const fechaReserva = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    //No permitir fechas pasadas
    if (fechaReserva < hoy) {
      return res.status(400).json ({error: "No se puede reservar fechas pasadas" })
    }

    //No permitir reservas con mas de dos meses de anticipacion
    const dosMesesDespues = new Date();
    dosMesesDespues.setMonth(dosMesesDespues.getMonth() + 2);

    if (fechaReserva > dosMesesDespues) {
      return res.status(400).json({error: "No se pueden hacer reservas con mas de 2 meses de anticipacion"});
    }

    const mascota =await Mascota.findById(mascotaId);
    if (!mascota) return res.status(404).json({ error: "Mascota no encontrada" });

    // validar si es domingo
    const dia = new Date(fecha).getDay(); // 0 = domingo , 6 = sabado
    if (dia === 0) {
      return res.status(400).json({error: "La peluquería no atiende los domingos"});   
    }

    const raza = mascota.raza.trim();
    let precio = preciosPorRaza[raza];

    if (!precio) {
      return res.status(200).json({
        mensaje: "Precio por confirmar. Recibiras un mensaje de WhatsApp confirmando el valor y la reserva"
        });
    }

    // Buscar cuantas reservas hay para ese dia
    const fechaConsulta = new Date(fecha).toISOString().split('T')[0];
    const reservaDelDia = await Reserva.find({

      fecha: { 
        $gte: new Date(`${fechaConsulta}T00:00:00.000Z`),
        $lt: new Date(`${fechaConsulta}T23:59:59.999Z`),
    }
 });

    if (reservaDelDia.length  >=  turnosDisponibles.length) {
      return res.status(400).json({error: "No hay turnos disponibles para ese dia"});
    }

    const horaAsignada = turnosDisponibles[reservaDelDia.length];

    const nuevaReserva = new Reserva({
      mascota: mascotaId,
      fecha,
      hora: horaAsignada,
      servicio: "Baño y peluquería canina",
      precioTotal: precio
  });

      await nuevaReserva.save();
      res.status(201).json(nuevaReserva);

    } catch (error) {
      console.error("Error al crear reserva:", error);
      res.status(500).json({error: error.message });
    }
  };

// Cancelar Reserva

const cancelarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });

    const ahora = new Date();
    const fechaHoraReserva = new Date(reserva.fecha);
    const horaSeparada = reserva.hora.split(':'); // ej: "10:00" → ["10", "00"]
    fechaHoraReserva.setHours(parseInt(horaSeparada[0]), parseInt(horaSeparada[1]), 0);

    const diferenciaHoras = (fechaHoraReserva - ahora) / (1000 * 60 * 60); // en horas

    if (diferenciaHoras < 4) {
      return res.status(400).json({
        error: "No es posible cancelar la reserva con menos de 4 horas de anticipación"
      });
    }

    // Cambiar estado a cancelado
    reserva.estado = 'cancelado';
    await reserva.save();

    res.status(200).json({ mensaje: "Reserva cancelada correctamente", reserva });
  } catch (error) {
    console.error("Error al cancelar reserva:", error);
    res.status(500).json({ error: error.message });
  }
};


// Consultar reservas por fecha (GET/api/reservas/dia? fecha= YYYY-MM-DD)
const obtenerReservasPorDia = async (req, res) => {
    try {
      const fecha = req.query.fecha;
      if (!fecha) return res.status(400).json({error: "Se requiere la fecha"});

      const fechaInicio = new Date(`${fecha}T00:00:00.00Z`);
      const FechaFin = new Date(`${fecha}T23:59:59.999Z`)

      const reservas = await Reserva.find({
        fecha:
        { $gte: fechaInicio,
          $lt: FechaFin
         }
        }).populate('mascota').sort({hora: 1});

        res.status(200).json(reservas);
      } catch (error) {
        res.status(500).json({ error: error.message});
      }
    };

module.exports = {
  crearReserva, 
  obtenerReservasPorDia,
  cancelarReserva
};