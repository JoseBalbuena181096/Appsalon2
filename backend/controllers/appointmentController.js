import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
    const appointment = req.body;
    appointment.user = req.user._id.toString();
    console.log(appointment);
    try {
        const newAppointment = new Appointment(appointment);
        const result = await newAppointment.save();
        res.status(201).json({
            msg: 'Cita creada correctamente',
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        });
    }    
}

export {
    createAppointment
}
