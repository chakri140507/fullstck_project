const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { postJob, getJobs, getJobById, deleteJob } = require('../controllers/jobController');

router.post('/', verifyToken, authorizeRoles('Employee'), postJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.delete('/:id', verifyToken, authorizeRoles('Employee', 'Admin'), deleteJob);

module.exports = router;
