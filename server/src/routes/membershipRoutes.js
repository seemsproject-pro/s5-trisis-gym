import { Router } from 'express';
import { getMyMembership, getAllMembers, createMember, updateMember, deleteMember, activateMembership } from '../controllers/membershipController.js';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Member gets their own membership
router.get('/my', authenticateToken, getMyMembership);
router.post('/activate', authenticateToken, activateMembership);

// Admin member management (CRUD)
router.get('/all', authenticateToken, requireAdmin, getAllMembers);
router.post('/', authenticateToken, requireAdmin, createMember);
router.put('/:id', authenticateToken, requireAdmin, updateMember);
router.delete('/:id', authenticateToken, requireAdmin, deleteMember);

export default router;
