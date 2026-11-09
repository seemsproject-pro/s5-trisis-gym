import { Router } from 'express';
import { login, register, getMe, googleLogin } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/google', googleLogin);
router.get('/me', authenticateToken, getMe);

export default router;
