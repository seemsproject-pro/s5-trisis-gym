import { Router } from 'express';
import { getMyMembership, getAllMembers, createMember, updateMember, deleteMember } from '../controllers/membershipController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Member gets their own membership
router.get('/my', authenticateToken, getMyMembership);

// Admin member management (CRUD)
router.get('/all', authenticateToken, requireAdmin, getAllMembers);
router.post('/', authenticateToken, requireAdmin, createMember);
router.put('/:id', authenticateToken, requireAdmin, updateMember);
router.delete('/:id', authenticateToken, requireAdmin, deleteMember);

export default router;
