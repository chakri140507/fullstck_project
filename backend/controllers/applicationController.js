const Application = require('../models/Application');
const Job = require('../models/Job');
const Student = require('../models/Student');

// @route   POST api/applications
// @desc    Apply for a job (Student only)
exports.applyForJob = async (req, res) => {
    const { jobId, phoneNumber, resumeUrl, coverLetter } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Check if student already applied
        const alreadyApplied = await Application.findOne({ student: req.user.id, job: jobId });
        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const newApplication = new Application({
            student: req.user.id,
            job: jobId,
            employer: job.postedBy,
            phoneNumber,
            resumeUrl,
            coverLetter
        });

        const application = await newApplication.save();

        // Add to student's appliedJobs
        student.appliedJobs.push(jobId);
        await student.save();

        // Add to job's applicants
        job.applicants.push(req.user.id);
        await job.save();

        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   GET api/applications/student
// @desc    Get student's applications
exports.getStudentApplications = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user.id })
            .populate('job')
            .populate('employer', 'name companyName');
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   GET api/applications/employer
// @desc    Get employer's received applications
exports.getEmployerApplications = async (req, res) => {
    try {
        const applications = await Application.find({ employer: req.user.id })
            .populate('student', 'name email department academicYear resumeUrl')
            .populate('job');
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   PUT api/applications/:id
// @desc    Update application status (Employer only)
exports.updateApplicationStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if user is the employer for this application
        if (application.employer.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        application.status = status;
        await application.save();

        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
