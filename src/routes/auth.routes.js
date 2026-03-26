import express from 'express';
import { login, logout, verificarAuth } from '../controllers/authController.js';
import { validarApiKey, verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', validarApiKey, login);
router.post('/logout', verificarToken, logout);
router.get('/verify', verificarToken, verificarAuth);

export default router;