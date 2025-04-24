import { services } from '../data/beautyServices.js';
import Services from '../models/Services.js';
import mongoose from 'mongoose';


const createService = async (req, res)=>{
    if(Object.values(req.body).includes('')){
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({
            msg: error.message
        });
    }
    try {
        const service = new Services(req.body);
        const result = await service.save();
        res.status(201).json({
            msg: 'Servicio creado correctamente',
            result
        });

    } catch (error) {
        console.log(error);
    }
}

const getServices = (req, res)=>{
    res.json(services);
}

const getServiceById = async(req, res)=>{
    const {id} = req.params;
    // Validar un object id
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('El id no es válido');
        return res.status(400).json({
            msg: error.message
        }); 
   
    }
    // validar que exista
    const service = await Services.findById(id);
    if(!service){
        const error = new Error('El servicio no existe');
        return res.status(404).json({
            msg: error.message
        });
    }

    res.status(200).json(service);
}

export {
    createService,
    getServices,
    getServiceById
}
