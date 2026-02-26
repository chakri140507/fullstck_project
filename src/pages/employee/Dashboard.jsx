import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, Users, Building, LogOut, Briefcase, Mail, Send, ChevronRight, UserCheck, UserX, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const { user, logout } = useAuth();
    const { addJob } = useJobs();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [showPostJob, setShowPostJob] = useState(false);

    const [jobForm, setJobForm] = useState({
        title: '',
        location: '',
        salary: '',
        description: ''
    });

    const handlePostJob = (e) => {
        e.preventDefault();
        addJob({
            ...jobForm,
            company: 'TCS Inc.', // In a real app, this would come from user profile
        });
        setJobForm({ title: '', location: '', salary: '', description: '' });
        setShowPostJob(false);
        setActiveTab('Dashboard');
        alert('Job posted successfully!');
    };

    // Dynamic state for received applications
    const [applications, setApplications] = useState([
        { id: 1, student: 'John Doe', email: 'john@example.com', phone: '+1 555-0123', job: 'Senior React Developer', date: '2024-02-15', status: 'Pending', resume: 'https://linkedin.com/in/johndoe', coverLetter: 'I am a passionate dev with 5 years of experience in modern frontend frameworks. I love building scalable UIs.' },
        { id: 2, student: 'Jane Smith', email: 'jane@dev.com', phone: '+1 555-9876', job: 'Backend Engineer', date: '2024-02-16', status: 'Shortlisted', resume: 'https://drive.google.com/resume-jane', coverLetter: 'Expert in Node.js and distributed systems. Looking to contribute to high-performance scale systems.' },
        { id: 3, student: 'Alex Johnson', email: 'alex@design.com', phone: '+1 555-4433', job: 'UI Designer', date: '2024-02-17', status: 'Rejected', resume: 'https://behance.net/alexj', coverLetter: 'Pixel perfect designs and user-centric thinking. I bridge the gap between imagination and reality.' },
    ]);

    const [selectedApp, setSelectedApp] = useState(null);

    const handleStatusChange = (id, newStatus) => {
        setApplications(prev => prev.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Application Detail Modal Component
    const ApplicationModal = ({ app, onClose }) => {
        if (!app) return null;
        return (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
                                    {app.student[0]}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">{app.student}</h2>
                                    <p className="text-blue-600 font-semibold">{app.job}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                                <UserX size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                                <p className="text-slate-700 font-medium flex items-center gap-2"><Mail size={16} className="text-slate-400" /> {app.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                                <p className="text-slate-700 font-medium flex items-center gap-2"><Send size={16} className="text-slate-400" /> {app.phone}</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resume / Portfolio</p>
                            <a href={app.resume} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <Briefcase className="text-blue-600" />
                                    <span className="font-bold text-slate-700 truncate max-w-[300px]">{app.resume}</span>
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                            </a>
                        </div>

                        <div className="mb-8">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cover Letter</p>
                            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl italic text-slate-600 leading-relaxed">
                                "{app.coverLetter}"
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-slate-100">
                            <button onClick={() => { handleStatusChange(app.id, 'Shortlisted'); onClose(); }} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-100">
                                <UserCheck size={20} /> Shortlist
                            </button>
                            <button onClick={() => { handleStatusChange(app.id, 'Rejected'); onClose(); }} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-100">
                                <UserX size={20} /> Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <ApplicationModal app={selectedApp} onClose={() => setSelectedApp(null)} />

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6">
                    <div className="mb-10 bg-white rounded-2xl p-4 shadow-sm">
                        <img
                            src="/logo.png"
                            alt="Student Placement Portal"
                            className="w-full h-auto"
                        />
                    </div>

                    <nav className="space-y-1 flex-1">
                        {[
                            { name: 'Dashboard', icon: LayoutDashboard },
                            { name: 'Post Job', icon: PlusCircle },
                            { name: 'Applications', icon: Users },
                            { name: 'Company Profile', icon: Building },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setActiveTab(item.name);
                                    if (item.name === 'Post Job') setShowPostJob(true);
                                    else setShowPostJob(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.name ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors mt-[300px] border-t border-slate-800 pt-6"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <h1 className="text-xl font-bold font-semibold text-slate-800">{activeTab}</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">{user?.employeeId}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-slate-900 uppercase">TCS Inc.</span>
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                                T
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {showPostJob ? (
                        <div className="max-w-2xl mx-auto glass rounded-2xl shadow-xl overflow-hidden p-8">
                            <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                                <PlusCircle className="text-blue-600" />
                                Post New Job Listing
                            </h2>
                            <form onSubmit={handlePostJob} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="e.g. Frontend Dev"
                                            value={jobForm.title}
                                            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder="e.g. Remote"
                                            value={jobForm.location}
                                            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Salary Package</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="e.g. 15 LPA"
                                        value={jobForm.salary}
                                        onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Eligibility Criteria</label>
                                    <textarea
                                        className="input-field min-h-[100px]"
                                        placeholder="Requirements and skills..."
                                        value={jobForm.description}
                                        onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex gap-4">
                                    <button type="button" onClick={() => setShowPostJob(false)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 btn-primary py-3">
                                        Publish Job Posting
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : activeTab === 'Company Profile' ? (
                        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
                            {/* Company Hero Section */}
                            <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                                    alt="Office"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 flex items-center gap-6">
                                    <div className="w-24 h-24 bg-white rounded-2xl p-2 shadow-xl flex items-center justify-center text-4xl font-bold text-blue-600">
                                        T
                                    </div>
                                    <div className="text-white">
                                        <h2 className="text-4xl font-extrabold tracking-tight">TCS Inc.</h2>
                                        <p className="flex items-center gap-2 text-blue-300 font-semibold mt-1">
                                            <Building size={18} /> Global Technology Consulting Leader
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">About the Company</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            TCS is an IT services, consulting and business solutions organization that has been partnering with many of the world's largest businesses in their transformation journeys for over 50 years. We believe in innovation and high-standard engineering.
                                        </p>
                                        <div className="grid grid-cols-2 gap-6 mt-8">
                                            <div className="p-4 bg-slate-50 rounded-2xl">
                                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Founded</p>
                                                <p className="text-slate-900 font-bold text-lg">1968</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 rounded-2xl">
                                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Company Size</p>
                                                <p className="text-slate-900 font-bold text-lg">500,000+ Employees</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-200">
                                        <h3 className="text-lg font-bold mb-4">Recruitment Contact</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Mail size={18} />
                                                <span className="text-sm font-medium">hr@tcs.com</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Send size={18} />
                                                <span className="text-sm font-medium">tcs.com/careers</span>
                                            </div>
                                        </div>
                                        <button className="w-full mt-8 bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Active Jobs', val: '12', color: 'blue' },
                                    { label: 'Applications', val: '248', color: 'purple' },
                                    { label: 'Shortlisted', val: '45', color: 'green' },
                                    { label: 'Pending', val: '12', color: 'orange' },
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                        <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                                        <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Applications Table */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                                    <h3 className="font-bold text-slate-900">Recent Applications</h3>
                                    <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="text-xs uppercase bg-slate-100 text-slate-500 font-bold border-b">
                                            <tr>
                                                <th className="px-6 py-4">Student Name</th>
                                                <th className="px-6 py-4">Job Role</th>
                                                <th className="px-6 py-4">Date Applied</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {applications.map((app) => (
                                                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
                                                                {app.student[0]}
                                                            </div>
                                                            <span className="font-medium text-slate-900">{app.student}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 font-medium">{app.job}</td>
                                                    <td className="px-6 py-4 text-slate-500">{app.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${app.status === 'Shortlisted' ? 'bg-green-100 text-green-700' :
                                                            app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                                'bg-orange-100 text-orange-700'
                                                            }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => setSelectedApp(app)}
                                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="View Details"><ChevronRight size={18} /></button>
                                                            <button
                                                                onClick={() => handleStatusChange(app.id, 'Shortlisted')}
                                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Shortlist"><UserCheck size={18} /></button>
                                                            <button
                                                                onClick={() => handleStatusChange(app.id, 'Rejected')}
                                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Reject"><UserX size={18} /></button>
                                                            <button
                                                                onClick={() => handleStatusChange(app.id, 'Selected')}
                                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Select Candidate"><CheckCircle size={18} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EmployeeDashboard;
