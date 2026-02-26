import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { Briefcase, MapPin, DollarSign, Send, ArrowLeft, FileText, Phone, User, Mail } from 'lucide-react';

const ApplyJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { user, addAppliedJob } = useAuth();
    const { jobs } = useJobs();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        phoneNumber: '',
        resumeUrl: '',
        coverLetter: ''
    });

    useEffect(() => {
        const fetchJob = () => {
            const foundJob = jobs.find(j => j.id.toString() === jobId.toString());
            if (foundJob) {
                setJob(foundJob);
            }
            setLoading(false);
        };
        fetchJob();
    }, [jobId, jobs]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Real API call would be:
            // await axios.post('/api/applications', { jobId, ...formData });

            console.log('Submitting application:', { jobId, ...formData });

            // Success simulation
            setTimeout(() => {
                setSubmitting(false);
                addAppliedJob(jobId); // Update global state
                alert('Application submitted successfully!');
                navigate('/student/dashboard'); // Return to dashboard
            }, 1000);
        } catch (err) {
            alert('Failed to submit application');
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading job details...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors font-medium"
            >
                <ArrowLeft size={20} />
                Back to Dashboard
            </button>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Job Summary */}
                <div className="lg:col-span-1 border border-slate-200 bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-8">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Briefcase size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">{job?.title}</h2>
                    <p className="text-blue-600 font-semibold mb-4">{job?.company}</p>

                    <div className="space-y-3 text-sm text-slate-600 border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{job?.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign size={16} />
                            <span>{job?.salary}</span>
                        </div>
                    </div>
                </div>

                {/* Application Form */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Complete your application</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <User size={16} className="text-slate-400" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.name || 'Student Name'}
                                    disabled
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                    <Mail size={16} className="text-slate-400" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    disabled
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <Phone size={16} className="text-slate-400" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                required
                                placeholder="+1 (555) 000-0000"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <FileText size={16} className="text-slate-400" />
                                Resume URL (LinkedIn or Drive)
                            </label>
                            <input
                                type="url"
                                required
                                placeholder="https://drive.google.com/..."
                                value={formData.resumeUrl}
                                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Cover Letter</label>
                            <textarea
                                rows="5"
                                placeholder="Introduce yourself and explain why you're a good fit..."
                                value={formData.coverLetter}
                                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70"
                        >
                            {submitting ? 'Submitting...' : 'Submit Application'}
                            {!submitting && <Send size={20} />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
