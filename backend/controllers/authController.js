const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Employee = require('../models/Employee');
const Admin = require('../models/Admin');

// @route   POST api/auth/register
// @desc    Register a student or employee
exports.register = async (req, res) => {
    const { name, email, password, role, ...otherDetails } = req.body;

    try {
        let user;
        if (role === 'Student') {
            user = await Student.findOne({ email });
        } else if (role === 'Employee') {
            user = await Employee.findOne({ email });
        } else if (role === 'Admin') {
            user = await Admin.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'Student') {
            user = new Student({
                name,
                email,
                password: hashedPassword,
                department: otherDetails.department,
                academicYear: otherDetails.academicYear,
                resumeUrl: otherDetails.resumeUrl
            });
        } else if (role === 'Employee') {
            user = new Employee({
                name,
                email,
                password: hashedPassword,
                employeeId: otherDetails.employeeId,
                companyName: otherDetails.companyName,
                companyDescription: otherDetails.companyDescription
            });
        } else if (role === 'Admin') {
            user = new Admin({
                name,
                email,
                password: hashedPassword
            });
        }

        await user.save();
        res.status(201).json({ message: 'User registered successfully. Wait for admin approval if you are an employee.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   POST api/auth/login
// @desc    Authenticate user & get token
exports.login = async (req, res) => {
    const { email, password, role, employeeId } = req.body;

    try {
        let user;
        if (role === 'Student') {
            user = await Student.findOne({ email });
        } else if (role === 'Employee') {
            user = await Employee.findOne({ email });
        } else if (role === 'Admin') {
            user = await Admin.findOne({ email });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Additional validation for Admin/Employee
        if ((role === 'Admin' || role === 'Employee') && employeeId) {
            if (role === 'Employee' && user.employeeId !== employeeId) {
                return res.status(400).json({ message: 'Invalid Employee ID' });
            }
            // For Admin, you might want to validate something else or just skip if no employeeId in model
        }

        // Check if Employee is approved
        if (role === 'Employee' && !user.isApproved) {
            return res.status(403).json({ message: 'Your account is pending admin approval' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            id: user._id,
            role: user.role
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role: user.role, user: { id: user._id, name: user.name, email: user.email } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
