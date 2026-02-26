const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    companyDescription: { type: String },
    isApproved: { type: Boolean, default: false },
    role: { type: String, default: 'Employee' },
    postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
