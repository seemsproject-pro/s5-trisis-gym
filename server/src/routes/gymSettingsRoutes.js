import { Router } from 'express';
import { getGymSettings, updateGymSettings } from '../controllers/gymSettingsController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Public / Member can read gym settings (status, occupancy, hours, announcement)
router.get('/', getGymSettings);

// Only admin can update settings
router.put('/', authenticateToken, requireAdmin, updateGymSettings);

export default router;
