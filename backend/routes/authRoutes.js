import express from 'express';
import { register, verifyAccount, login, user, forgotPassword, verifyPasswordResetToken, updatePassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas de Autenticacion y registro de usuarios
router.post('/register', register);

// http://localhost:4000/api/auth/verify/1iqaac11dlc3tu3abu2o
router.get('/verify/:token', verifyAccount);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword);

// Area privada - Requiere un JWT
router.get('/user', authMiddleware, user);

export default router;