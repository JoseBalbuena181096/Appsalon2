import express from 'express';
import { createService ,getServices, getServiceById } from '../controllers/servicesController.js';
 
const router = express.Router();

router.get('/', getServices);
router.post('/', createService);
router.get('/:id', getServiceById);



export default router; 

