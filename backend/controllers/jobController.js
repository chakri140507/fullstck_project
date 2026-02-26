const Job = require('../models/Job');
const Employee = require('../models/Employee');

// @route   POST api/jobs
// @desc    Post a new job (Employee only)
exports.postJob = async (req, res) => {
    const { title, description, location, salary, eligibility } = req.body;

    try {
        const employee = await Employee.findById(req.user.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const newJob = new Job({
            title,
            description,
            location,
            salary,
            eligibility,
            companyName: employee.companyName,
            postedBy: req.user.id
        });

        const job = await newJob.save();

        // Add to employee's postedJobs array
        employee.postedJobs.push(job._id);
        await employee.save();

        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   GET api/jobs
// @desc    Get all jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   GET api/jobs/:id
// @desc    Get job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   DELETE api/jobs/:id
// @desc    Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user is the employee who posted it or is an Admin
        if (job.postedBy.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await job.deleteOne();
        res.json({ message: 'Job removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
