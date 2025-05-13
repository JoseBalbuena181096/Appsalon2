import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
    try {
        // Preparar los datos de la cita
        const appointment = req.body;
        appointment.user = req.user._id.toString();
        
        // Crear y guardar la cita
        const newAppointment = new Appointment(appointment);
        const result = await newAppointment.save();
        
        // Responder al cliente
        console.log("Cita creada correctamente");
        res.status(201).json({
            ok: true,
            msg: 'Cita creada correctamente',
            appointment: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear la cita'
        });
    }    
}

export {
    createAppointment
}
