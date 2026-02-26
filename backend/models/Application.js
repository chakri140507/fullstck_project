const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    phoneNumber: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    coverLetter: { type: String },
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected'],
        default: 'Applied'
    }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
