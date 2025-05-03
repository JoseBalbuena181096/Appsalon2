import express from 'express';
import { register, verifyAccount } from '../controllers/authController.js';

const router = express.Router();

// Rutas de Autenticacion y registro de usuarios
router.post('/register', register);

// http://localhost:4000/api/auth/verify/1iqaac11dlc3tu3abu2o
router.get('/verify/:token', verifyAccount);

export default router;