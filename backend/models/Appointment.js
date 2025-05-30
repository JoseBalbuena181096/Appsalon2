import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services'
        }
    ],
    date: {
        type: Date,
    },
    time: {
        type: String,
    },
    totalAmount: {
        type: Number,
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;

