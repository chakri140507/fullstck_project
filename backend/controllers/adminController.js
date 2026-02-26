const Student = require('../models/Student');
const Employee = require('../models/Employee');
const Application = require('../models/Application');
const Job = require('../models/Job');
const Admin = require('../models/Admin');

// @route   GET api/admin/users
// @desc    Get all users (Students, Employees, Admins)
exports.getUsers = async (req, res) => {
    try {
        const students = await Student.find().select('-password');
        const employees = await Employee.find().select('-password');
        const admins = await Admin.find().select('-password');

        res.json({ students, employees, admins });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   DELETE api/admin/users/:role/:id
// @desc    Delete a user
exports.deleteUser = async (req, res) => {
    const { role, id } = req.params;
    try {
        let user;
        if (role === 'Student') user = await Student.findByIdAndDelete(id);
        else if (role === 'Employee') user = await Employee.findByIdAndDelete(id);
        else if (role === 'Admin') user = await Admin.findByIdAndDelete(id);

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   PUT api/admin/users/:role/:id/role
// @desc    Update user role
exports.updateUserRole = async (req, res) => {
    const { role, id } = req.params;
    const { newRole } = req.body;
    try {
        // This is complex because moving between schemas is not ideal.
        // For simplicity in this specific request, we'll just return a placeholder or handle it if roles are within same schema.
        // But since they are separate schemas, we'll just log it for now or return a message.
        res.status(400).json({ message: 'Role migration between schemas is restricted. Please delete and re-register.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   GET api/admin/employers
// @desc    Get all employers
exports.getEmployers = async (req, res) => {
    try {
        const employers = await Employee.find().select('-password');
        res.json(employers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   PUT api/admin/approve-employer/:id
// @desc    Approve/Decline employer
exports.approveEmployer = async (req, res) => {
    const { isApproved } = req.body;

    try {
        const employer = await Employee.findById(req.params.id);
        if (!employer) {
            return res.status(404).json({ message: 'Employer not found' });
        }

        employer.isApproved = isApproved;
        await employer.save();

        res.json(employer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   GET api/admin/analytics
// @desc    Get placement analytics
exports.getAnalytics = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalEmployers = await Employee.countDocuments({ isApproved: true });
        const totalJobs = await Job.countDocuments();
        const totalPlaced = await Application.countDocuments({ status: 'Selected' });

        // Department-wise placements
        const deptPlacements = await Application.aggregate([
            { $match: { status: 'Selected' } },
            {
                $lookup: {
                    from: 'students',
                    localField: 'student',
                    foreignField: '_id',
                    as: 'studentInfo'
                }
            },
            { $unwind: '$studentInfo' },
            {
                $group: {
                    _id: '$studentInfo.department',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Company hiring stats
        const companyStats = await Application.aggregate([
            { $match: { status: 'Selected' } },
            {
                $group: {
                    _id: '$employer',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'employerInfo'
                }
            },
            { $unwind: '$employerInfo' },
            {
                $project: {
                    companyName: '$employerInfo.companyName',
                    count: 1
                }
            }
        ]);

        res.json({
            stats: {
                totalStudents,
                totalEmployers,
                totalJobs,
                totalPlaced
            },
            deptPlacements,
            companyStats
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
