import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Send, ArrowLeft, FileText, Phone, User, Mail, Link as LinkIcon, Upload, CheckCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ApplyJob = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
    const { jobId } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);

    const [formData, setFormData] = useState({
        email: localStorage.getItem('email') || '',
        phoneNumber: '',
        linkedinProfile: '',
        portfolioUrl: '',
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                // In a real app, you'd fetch specific job details
                // For now, we'll fetch all and find the one from the list or a specific endpoint
                const response = await fetch(`/api/jobs/available/${userId}`);
                if (response.ok) {
                    const jobs = await response.json();
                    const foundJob = jobs.find(j => j.id.toString() === jobId.toString());
                    setJob(foundJob);
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resumeFile) {
            alert('Please upload your resume');
            return;
        }

        setSubmitting(true);

        const data = new FormData();
        data.append('studentId', userId);
        data.append('jobId', jobId);
        data.append('email', formData.email);
        data.append('phoneNumber', formData.phoneNumber);
        data.append('linkedinProfile', formData.linkedinProfile);
        data.append('portfolioUrl', formData.portfolioUrl);
        data.append('resume', resumeFile);

        try {
            console.log("Submitting application via FormData...");
            const response = await fetch('/api/applications/apply', {
                method: 'POST',
                body: data, // No Content-Type header! Browser sets it automatically for FormData
            });
            console.log("Submit Response Status:", response.status);

            if (response.ok) {
                const successData = await response.json();
                console.log("Submission success:", successData);
                alert('Application submitted successfully!');
                navigate('/student/dashboard');
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("Submission failed:", errorData);
                alert(errorData.message || 'Failed to submit application');
            }
        } catch (err) {
            console.error('Submission error details:', err);
            alert(`Submission Error: ${err.message || 'Network error or server unreachable'}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isCurrentDesign ? 'bg-slate-50' : 'bg-transparent'}`}>
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isCurrentDesign ? 'border-indigo-600' : 'border-blue-400'}`}></div>
        </div>
    );

    if (!job) return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${isCurrentDesign ? 'bg-slate-50' : 'bg-transparent'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${isCurrentDesign ? 'text-slate-800' : 'text-white'}`}>Job not found or already applied</h2>
            <button onClick={() => navigate(-1)} className={`font-bold hover:underline ${isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'}`}>Go Back</button>
        </div>
    );

    return (
        <div className={`min-h-screen p-4 md:p-8 lg:p-12 transition-colors duration-500 ${isCurrentDesign ? 'bg-slate-50' : 'bg-transparent'}`}>
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className={`flex items-center gap-2 transition-all font-black uppercase text-[10px] tracking-widest ${
                            isCurrentDesign ? 'text-slate-400 hover:text-indigo-600' : 'text-slate-500 hover:text-blue-400'
                        }`}
                    >
                        <ArrowLeft size={16} />
                        Back to Positions
                    </button>

                    <button 
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${
                            isCurrentDesign ? 'text-slate-500 hover:bg-slate-100' : 'text-yellow-400 hover:bg-white/10'
                        }`}
                        title="Toggle Theme"
                    >
                        {isCurrentDesign ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Job Details Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className={`p-8 rounded-[2rem] shadow-sm relative overflow-hidden border transition-all duration-500 portal-card ${
                            isCurrentDesign ? 'bg-white border-slate-100' : 'border-white/5 shadow-blue-900/10'
                        }`}>
                            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-12 -mt-12 ${isCurrentDesign ? 'bg-indigo-50' : 'bg-blue-600/5'}`}></div>
                            
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl font-black text-2xl transition-all ${
                                isCurrentDesign ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-blue-600 text-white shadow-blue-500/20'
                            }`}>
                                {job.company.charAt(0)}
                            </div>
                            
                            <h2 className={`text-2xl font-black mb-2 leading-tight uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>{job.title}</h2>
                            <p className={`font-black text-sm mb-8 tracking-widest uppercase transition-colors ${isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'}`}>{job.company}</p>

                            <div className={`space-y-4 font-black text-[10px] uppercase tracking-widest pt-6 border-t transition-colors ${isCurrentDesign ? 'border-slate-50 text-slate-500' : 'border-white/5 text-slate-400'}`}>
                                <div className="flex items-center gap-3">
                                    <MapPin size={18} className={isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'} />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign size={18} className={isCurrentDesign ? 'text-emerald-500' : 'text-emerald-400'} />
                                    <span>{job.salary}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className={`p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden transition-all duration-500 ${
                            isCurrentDesign ? 'bg-indigo-600 shadow-indigo-100' : 'bg-white/5 border border-white/10 shadow-blue-900/10'
                        }`}>
                             <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-2xl ${isCurrentDesign ? 'bg-white/10' : 'bg-blue-500/10'}`}></div>
                             <h4 className="font-black mb-4 relative z-10 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                                <CheckCircle size={16} className={isCurrentDesign ? 'text-white' : 'text-emerald-400'} /> Application Tips
                             </h4>
                             <p className={`text-sm font-medium leading-relaxed relative z-10 ${isCurrentDesign ? 'text-indigo-100' : 'text-slate-400'}`}>
                                Make sure your resume is up to date and clearly highlights your skills for the <strong>{job.title}</strong> role at {job.company}.
                             </p>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className={`lg:col-span-2 rounded-[2.5rem] shadow-sm p-8 md:p-12 border transition-all duration-500 portal-card ${
                        isCurrentDesign ? 'bg-white border-slate-100' : 'border-white/5 shadow-blue-900/10'
                    }`}>
                        <div className="mb-10">
                            <h3 className={`text-3xl font-black mb-2 tracking-tight uppercase transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Submit Profile</h3>
                            <p className={`font-black italic text-sm transition-colors ${isCurrentDesign ? 'text-slate-400' : 'text-slate-500'}`}>Complete the form below to initiate your application.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                                        <User size={14} /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={username || ''}
                                        disabled
                                        className={`w-full px-6 py-4 rounded-2xl font-black text-sm cursor-not-allowed transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border border-slate-100 text-slate-400' : 'bg-white/5 border border-white/5 text-slate-600'
                                        }`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                                        <Mail size={14} /> Gmail Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your Gmail"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full px-6 py-4 rounded-2xl font-black text-sm outline-none transition-all ${
                                            isCurrentDesign ? 'bg-white border border-slate-100 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white'
                                        }`}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                                        <Phone size={14} /> Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Enter your phone number"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        className={`w-full px-6 py-4 rounded-2xl font-black text-sm outline-none transition-all ${
                                            isCurrentDesign ? 'bg-white border border-slate-100 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white'
                                        }`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                                        <LinkIcon size={14} /> LinkedIn Profile
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        placeholder="https://linkedin.com/in/..."
                                        value={formData.linkedinProfile}
                                        onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                                        className={`w-full px-6 py-4 rounded-2xl font-black text-sm outline-none transition-all ${
                                            isCurrentDesign ? 'bg-white border border-slate-100 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white'
                                        }`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                                    <LinkIcon size={14} /> Portfolio / Project Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://yourportfolio.com or GitHub repo"
                                    value={formData.portfolioUrl}
                                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                                    className={`w-full px-6 py-4 rounded-2xl font-black text-sm outline-none transition-all ${
                                        isCurrentDesign ? 'bg-white border border-slate-100 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white'
                                    }`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-1 text-slate-500">
                                    <FileText size={14} /> Resume (PDF or Doc)
                                </label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setResumeFile(e.target.files[0])}
                                        className="hidden"
                                        id="resume-upload"
                                    />
                                    <label 
                                        htmlFor="resume-upload"
                                        className={`flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed rounded-[2rem] cursor-pointer transition-all ${
                                            resumeFile 
                                            ? isCurrentDesign ? 'border-emerald-200 bg-emerald-50/30' : 'border-emerald-500/30 bg-emerald-500/5'
                                            : isCurrentDesign ? 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-200' : 'border-white/10 bg-white/5 hover:border-blue-500/30'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {resumeFile ? (
                                                <>
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isCurrentDesign ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                                        <CheckCircle size={24} />
                                                    </div>
                                                    <p className={`text-sm font-black uppercase tracking-tight ${isCurrentDesign ? 'text-emerald-700' : 'text-emerald-400'}`}>{resumeFile.name}</p>
                                                    <p className={`text-[10px] mt-1 font-black uppercase tracking-widest ${isCurrentDesign ? 'text-emerald-500' : 'text-emerald-600'}`}>Click to change file</p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${isCurrentDesign ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-600/20 text-blue-400'}`}>
                                                        <Upload size={24} />
                                                    </div>
                                                    <p className={`text-sm font-black uppercase tracking-tight ${isCurrentDesign ? 'text-slate-600' : 'text-slate-400'}`}>Upload Resume</p>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">PDF, DOC, or DOCX up to 10MB</p>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                                    submitting 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                    : isCurrentDesign 
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 hover:shadow-indigo-200' 
                                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20'
                                }`}
                            >
                                {submitting ? 'Submitting...' : 'Initiate Application'}
                                {!submitting && <Send size={20} />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
