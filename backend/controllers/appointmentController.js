import Appointment from "../models/Appointment.js";
import {parse,formatISO, startOfDay, endOfDay, isValid} from 'date-fns';
import { validateObjectId, handleNotFoundError } from '../utils/index.js';
import { sendEmailNewAppointment, sendEmailUpdateAppointment, sendEmailDeleteAppointment } from '../emails/appointmentEmailService.js';
import {formatDate} from '../utils/index.js';


const createAppointment = async (req, res) => {
    try {
        // Preparar los datos de la cita
        const appointment = req.body;
        appointment.user = req.user._id.toString();
        
        // Crear y guardar la cita
        const newAppointment = new Appointment(appointment);
        const result = await newAppointment.save();
        
        // Enviar correo de confirmación
        await sendEmailNewAppointment({
            date: formatDate(result.date),
            time: result.time,
        });

        // Responder al cliente
        //console.log("Cita creada correctamente");
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

const getAppointmentsByDate = async (req, res) => {
    const {date} = req.query;
    
    try {
        // Cambiar el formato de d/M/yyyy a dd/MM/yyyy
        const newDate = parse(date, 'd/M/yyyy', new Date());
        if(!isValid(newDate)){
            return res.status(400).json({
                ok: false,
                msg: 'Fecha inválida'
            });
        }
        
        const isoDate = formatISO(newDate);
        console.log('Fecha consultada:', isoDate);
        
        const appointments = await Appointment.find({
            date: {
                $gte: startOfDay(new Date(isoDate)),
                $lte: endOfDay(new Date(isoDate))
            }
        }).select('time');
        
        res.json({
            ok: true,
            msg: 'Citas obtenidas correctamente',
            appointments    
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener citas',
            error: error.message
        });
    }
}

const getAppointmentById = async (req, res) => {

    const {id} = req.params;
    
    // validar por ObjectId
    if(validateObjectId(id, res)) return;

    // validar que exista
    const appointment = await Appointment.findById(id).populate('services');
    if(!appointment){
        return handleNotFoundError('La cita no existe', res);
    }

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('Acceso denegado');
        return res.status(403).json({
            msg: error.message
        });
    }

    // retornar la cita
    res.status(200).json(appointment);
}

const updateAppointment = async (req, res) => {
    const {id} = req.params;
    
    // validar por ObjectId
    if(validateObjectId(id, res)) return;

    // validar que exista
    const appointment = await Appointment.findById(id).populate('services');
    if(!appointment){
        return handleNotFoundError('La cita no existe', res);
    }

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('Acceso denegado');
        return res.status(403).json({
            msg: error.message
        });
    }

    // actualizar la cita
    const {date, time, totalAmount, services} = req.body;
    appointment.date = date;
    appointment.time = time;
    appointment.totalAmount = totalAmount;
    appointment.services = services;
    try {
        const result = await appointment.save();
        await sendEmailUpdateAppointment({
            date: formatDate(result.date),
            time: result.time,
        });
        res.status(200).json({
            ok: true,
            msg: 'Cita actualizada correctamente',
            appointment: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la cita',
            error: error.message
        });
    }
}

const deleteAppointment = async (req, res) => {
    const {id} = req.params;
    
    // validar por ObjectId
    if(validateObjectId(id, res)) return;

    // validar que exista
    const appointment = await Appointment.findById(id);
    if(!appointment){
        return handleNotFoundError('La cita no existe', res);
    }

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('Acceso denegado');
        return res.status(403).json({
            msg: error.message
        });
    }

    // eliminar la cita
    try {
        const result = await appointment.deleteOne();
        await sendEmailDeleteAppointment({
            date: formatDate(appointment.date),
            time: appointment.time,
        });   
        res.status(200).json({
            ok: true,
            msg: 'Cita eliminada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la cita',
            error: error.message
        });
    }
}


export {
    createAppointment,
    getAppointmentsByDate,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}
