import { services } from '../data/beautyServices.js';
import Services from '../models/Services.js';
import mongoose from 'mongoose';
import { validateObjectId, handleNotFoundError } from '../utils/index.js';


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

    // validar que se se un id valido
    if(validateObjectId(id, res)) return;
    
    // validar que exista
    const service = await Services.findById(id);
    if(!service){
        return handleNotFoundError('El servicio no existe', res);
    }

    res.status(200).json(service);
}

const updateService = async (req, res) => {
    const {id} = req.params;

    // Validar un object id
    if(validateObjectId(id, res)) return;

    // validar que exista
    const service = await Services.findById(id);
    if(!service){
        return handleNotFoundError('El servicio no existe', res);
    }

    // Escribimos en el objeto los valores nuevos
    service.name = req.body.name ||  service.name;
    service.price = req.body.price || service.price;
    try{
        const result = await service.save();
        res.status(200).json({
            msg: 'Servicio actualizado correctamente',
            result
        });
    }
    catch(error){
        console.log(error);
    }
}

export {
    createService,
    getServices,
    getServiceById,
    updateService
}
