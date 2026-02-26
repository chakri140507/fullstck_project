const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const {
    getEmployers,
    approveEmployer,
    getAnalytics,
    getUsers,
    deleteUser,
    updateUserRole
} = require('../controllers/adminController');

router.get('/users', verifyToken, authorizeRoles('Admin'), getUsers);
router.delete('/users/:role/:id', verifyToken, authorizeRoles('Admin'), deleteUser);
router.put('/users/:role/:id/role', verifyToken, authorizeRoles('Admin'), updateUserRole);
router.get('/employers', verifyToken, authorizeRoles('Admin'), getEmployers);
router.put('/approve-employer/:id', verifyToken, authorizeRoles('Admin'), approveEmployer);
router.get('/analytics', verifyToken, authorizeRoles('Admin'), getAnalytics);

module.exports = router;
