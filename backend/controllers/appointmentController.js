import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
    const appointment = req.body;
    appointment.user = req.user._id.toString();
    console.log(appointment);
    return;
    try {
        const newAppointment = new Appointment(appointment);
        const result = await newAppointment.save();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: error.message
        });
    }    
}

export {
    createAppointment
}
