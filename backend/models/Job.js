const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String },
    eligibility: { type: String, required: true },
    companyName: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
