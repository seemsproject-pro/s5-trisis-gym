import { Router } from 'express';
import { performCheckIn, getMyCheckIns, getAllCheckIns, resetTodayCheckIn } from '../controllers/checkinController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authenticateToken, performCheckIn);
router.get('/my', authenticateToken, getMyCheckIns);
router.post('/reset-today', authenticateToken, resetTodayCheckIn);
router.get('/all', authenticateToken, requireAdmin, getAllCheckIns);

export default router;
