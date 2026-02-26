const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const {
    applyForJob,
    getStudentApplications,
    getEmployerApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');

router.post('/', verifyToken, authorizeRoles('Student'), applyForJob);
router.get('/student', verifyToken, authorizeRoles('Student'), getStudentApplications);
router.get('/employer', verifyToken, authorizeRoles('Employee'), getEmployerApplications);
router.put('/:id', verifyToken, authorizeRoles('Employee'), updateApplicationStatus);

module.exports = router;
