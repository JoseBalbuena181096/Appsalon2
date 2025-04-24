import express from 'express';
import { createService ,getServices, getServiceById, updateService, deleteService} from '../controllers/servicesController.js';
 
const router = express.Router();

router.get('/', getServices);
router.post('/', createService);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);


export default router; 

