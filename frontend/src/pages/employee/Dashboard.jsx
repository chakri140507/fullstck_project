import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, PlusCircle, Users, Building, LogOut, Briefcase, Mail, Send, ChevronRight, UserCheck, UserX, Calendar, CheckCircle, FileText, ExternalLink, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { API_ENDPOINTS } from '../../utils/api';

const EmployeeDashboard = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
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

    const [successMessage, setSuccessMessage] = useState('');

    const handlePostJob = (e) => {
        e.preventDefault();
        addJob({
            ...jobForm,
            company: 'TCS Inc.', // In a real app, this would come from user profile
        });
        setJobForm({ title: '', location: '', salary: '', description: '' });
        setShowPostJob(false);
        setActiveTab('Dashboard');
        
        // Show success notification
        setSuccessMessage('Job posted successfully!');
        setTimeout(() => setSuccessMessage(''), 5000);
    };

    // Live data from backend
    const [applications, setApplications] = useState([]);
    const [appsLoading, setAppsLoading] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    const fetchApplications = useCallback(async () => {
        setAppsLoading(true);
        try {
            console.log('Fetching all applications for employee portal...');
            const res = await fetch(API_ENDPOINTS.APPLICATIONS);
            console.log('Applications fetch status:', res.status);
            if (res.ok) {
                const data = await res.json();
                console.log('Applications data:', data);
                setApplications(data);
            }
        } catch (err) {
            console.error('Failed to fetch applications:', err);
        } finally {
            setAppsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`${API_ENDPOINTS.APPLICATIONS}/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                const updated = await res.json();
                setApplications(prev => prev.map(app => app.id === id ? updated : app));
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        }
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
                <div className={`rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300 border transition-all duration-500 ${
                    isCurrentDesign ? 'bg-white border-white' : 'portal-card border-white/10'
                }`}>
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
                                    isCurrentDesign ? 'bg-blue-100 text-blue-600' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                }`}>
                                    {(app.student?.fullName || app.student?.username || '?')[0]}
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>{app.student?.fullName || app.student?.username}</h2>
                                    <p className={`font-semibold transition-colors ${isCurrentDesign ? 'text-blue-600' : 'text-blue-400'}`}>{app.job?.title}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className={`p-2 rounded-full transition-colors ${
                                isCurrentDesign ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/10 text-slate-500'
                            }`}>
                                <UserX size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                                <p className={`font-medium flex items-center gap-2 transition-colors ${isCurrentDesign ? 'text-slate-700' : 'text-slate-200'}`}>
                                    <Mail size={16} className="text-slate-400" /> {app.email || '—'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                                <p className={`font-medium flex items-center gap-2 transition-colors ${isCurrentDesign ? 'text-slate-700' : 'text-slate-200'}`}>
                                    <Send size={16} className="text-slate-400" /> {app.phoneNumber || '—'}
                                </p>
                            </div>
                        </div>

                        <div className="mb-8 space-y-3">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resume &amp; Profile</p>

                            {/* PDF Resume Button */}
                            {app.resumeName ? (
                                <a
                                    href={`${API_ENDPOINTS.APPLICATIONS}/${app.id}/resume`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl hover:border-red-400 hover:bg-red-100 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-red-500" size={22} />
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">{app.resumeName}</p>
                                            <p className="text-xs text-slate-500">Click to view PDF resume</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="text-red-400 group-hover:text-red-600 transition-colors" size={18} />
                                </a>
                            ) : (
                                <div className="flex items-center gap-3 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-slate-400 text-sm">
                                    <FileText size={20} />
                                    <span>No resume uploaded</span>
                                </div>
                            )}

                            {/* LinkedIn / Portfolio Link */}
                            {app.linkedinProfile && (
                                <a href={app.linkedinProfile} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-100 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="text-blue-600" size={20} />
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm truncate max-w-[260px]">{app.linkedinProfile}</p>
                                            <p className="text-xs text-slate-500">LinkedIn / Portfolio</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="text-blue-400 group-hover:text-blue-600 transition-colors" size={18} />
                                </a>
                            )}
                        </div>


                        <div className="mb-8">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Applied For</p>
                            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 leading-relaxed">
                                <strong>{app.job?.title}</strong> at <strong>{app.job?.company}</strong> — {app.job?.location}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-slate-100">
                            <button onClick={() => { handleStatusChange(app.id, 'SHORTLISTED'); onClose(); }} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-100">
                                <UserCheck size={20} /> Shortlist
                            </button>
                            <button onClick={() => { handleStatusChange(app.id, 'REJECTED'); onClose(); }} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-100">
                                <UserX size={20} /> Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen font-sans">
            <ApplicationModal app={selectedApp} onClose={() => setSelectedApp(null)} />

            {/* Sidebar */}
            <aside className={`w-64 border-r hidden md:flex flex-col sticky top-0 h-screen overflow-hidden portal-sidebar transition-all duration-500 ${
                isCurrentDesign ? 'bg-white border-slate-200' : 'bg-transparent border-white/10'
            }`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/employee/dashboard')}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all ${
                            isCurrentDesign ? 'bg-indigo-600 shadow-indigo-200' : 'bg-blue-600 shadow-blue-500/20'
                        }`}>
                            P
                        </div>
                        <span className={`text-xl font-black tracking-tighter italic ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>OFFICER</span>
                    </div>

                    <nav className="space-y-1">
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
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                    activeTab === item.name 
                                        ? isCurrentDesign ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100' : 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                                        : isCurrentDesign ? 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all mt-auto ${
                            isCurrentDesign ? 'text-red-500 hover:bg-red-50' : 'text-red-400 hover:bg-red-500/10'
                        }`}
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className={`h-20 border-b flex items-center justify-between px-8 z-10 transition-all duration-500 portal-header ${
                    isCurrentDesign ? 'bg-white border-slate-100' : 'bg-transparent border-white/10'
                }`}>
                    <h2 className={`text-xl font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>{activeTab}</h2>
                    <div className="flex items-center gap-6">
                        {/* Theme Toggle Button */}
                        <button 
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-colors ${
                                isCurrentDesign ? 'text-slate-500 hover:bg-slate-100' : 'text-yellow-400 hover:bg-white/10'
                            }`}
                            title="Toggle Theme"
                        >
                            {isCurrentDesign ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <div className={`h-8 w-px mx-1 ${isCurrentDesign ? 'bg-slate-100' : 'bg-white/10'}`}></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className={`text-sm font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-slate-200'}`}>TCS Inc.</p>
                                <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'}`}>Officer Portal</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold border-2 shadow-sm transition-all ${
                                isCurrentDesign ? 'bg-indigo-600 border-white' : 'bg-blue-600 border-white/20'
                            }`}>
                                T
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 transition-colors duration-500">
                    {successMessage && (
                        <div className="max-w-2xl mx-auto mb-6 animate-in slide-in-from-top-4 duration-500">
                            <div className={`px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm border ${
                                isCurrentDesign ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            }`}>
                                <CheckCircle size={20} className={isCurrentDesign ? 'text-emerald-500' : 'text-emerald-400'} />
                                <span className="font-bold text-sm uppercase tracking-wider">{successMessage}</span>
                            </div>
                        </div>
                    )}

                    {showPostJob ? (
                        <div className={`max-w-2xl mx-auto rounded-3xl shadow-xl overflow-hidden p-8 border transition-all duration-500 ${
                            isCurrentDesign ? 'bg-white border-slate-100' : 'portal-card border-white/10'
                        }`}>
                            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>
                                <PlusCircle className={isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'} />
                                Post New Job Listing
                            </h2>
                            <form onSubmit={handlePostJob} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-xs font-bold uppercase tracking-wider ml-1 mb-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Job Title</label>
                                        <input
                                            type="text"
                                            className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                                isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                            }`}
                                            placeholder="e.g. Frontend Dev"
                                            value={jobForm.title}
                                            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-bold uppercase tracking-wider ml-1 mb-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Location</label>
                                        <input
                                            type="text"
                                            className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                                isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                            }`}
                                            placeholder="e.g. Remote"
                                            value={jobForm.location}
                                            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold uppercase tracking-wider ml-1 mb-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Salary Package</label>
                                    <input
                                        type="text"
                                        className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`}
                                        placeholder="e.g. 15 LPA"
                                        value={jobForm.salary}
                                        onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block text-xs font-bold uppercase tracking-wider ml-1 mb-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Eligibility Criteria</label>
                                    <textarea
                                        className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all min-h-[100px] ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`}
                                        placeholder="Requirements and skills..."
                                        value={jobForm.description}
                                        onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setShowPostJob(false)} className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                                        isCurrentDesign ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white/5 text-slate-400 hover:bg-white/10'
                                    }`}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={`flex-1 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
                                        isCurrentDesign ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                                    }`}>
                                        Publish Job Listing
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : activeTab === 'Company Profile' ? (
                        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
                            {/* Company Hero Section */}
                            <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                <img
                                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
                                    alt="Office"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 transition-opacity duration-500 ${
                                    isCurrentDesign ? 'bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent' : 'bg-gradient-to-t from-[#060D2E] via-[#0D1B4B]/40 to-transparent'
                                }`}></div>
                                <div className="absolute bottom-8 left-8 flex items-center gap-6">
                                    <div className={`w-24 h-24 rounded-2xl p-2 shadow-2xl flex items-center justify-center text-4xl font-black border-4 transition-all ${
                                        isCurrentDesign ? 'bg-white text-indigo-600 border-white' : 'bg-blue-600 text-white border-white/20'
                                    }`}>
                                        T
                                    </div>
                                    <div className="text-white">
                                        <h2 className="text-4xl font-black tracking-tight drop-shadow-lg">TCS Inc.</h2>
                                        <p className="flex items-center gap-2 text-blue-300 font-bold mt-1 drop-shadow-md">
                                            <Building size={18} /> Global Technology Consulting Leader
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className={`p-8 rounded-3xl border transition-all duration-500 portal-card ${
                                        isCurrentDesign ? 'bg-white border-slate-100 shadow-sm' : 'border-white/5'
                                    }`}>
                                        <h3 className={`text-xl font-black uppercase tracking-tight mb-4 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>About the Company</h3>
                                        <p className={`leading-relaxed transition-colors ${isCurrentDesign ? 'text-slate-600' : 'text-slate-400'}`}>
                                            TCS is an IT services, consulting and business solutions organization that has been partnering with many of the world's largest businesses in their transformation journeys for over 50 years. We believe in innovation and high-standard engineering.
                                        </p>
                                        <div className="grid grid-cols-2 gap-6 mt-8">
                                            <div className={`p-4 rounded-2xl transition-colors ${isCurrentDesign ? 'bg-slate-50' : 'bg-white/5 border border-white/5'}`}>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Founded</p>
                                                <p className={`font-black text-lg ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>1968</p>
                                            </div>
                                            <div className={`p-4 rounded-2xl transition-colors ${isCurrentDesign ? 'bg-slate-50' : 'bg-white/5 border border-white/5'}`}>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Company Size</p>
                                                <p className={`font-black text-lg ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>500,000+</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className={`p-8 rounded-3xl text-white shadow-xl transition-all duration-500 ${
                                        isCurrentDesign ? 'bg-indigo-600 shadow-indigo-100' : 'bg-blue-600 shadow-blue-500/10'
                                    }`}>
                                        <h3 className="text-lg font-black uppercase tracking-tight mb-4">Contact</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Mail size={18} className="opacity-70" />
                                                <span className="text-sm font-bold">hr@tcs.com</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Send size={18} className="opacity-70" />
                                                <span className="text-sm font-bold">tcs.com/careers</span>
                                            </div>
                                        </div>
                                        <button className={`w-full mt-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 ${
                                            isCurrentDesign ? 'bg-white text-indigo-600 hover:bg-slate-50' : 'bg-[#060D2E] text-blue-400 hover:bg-[#060D2E]/80'
                                        }`}>
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in duration-700">
                            {/* Live Stats from API */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Applications', val: applications.length, color: 'blue' },
                                    { label: 'Shortlisted', val: applications.filter(a => a.status === 'SHORTLISTED').length, color: 'emerald' },
                                    { label: 'Rejected', val: applications.filter(a => a.status === 'REJECTED').length, color: 'red' },
                                    { label: 'Pending', val: applications.filter(a => a.status === 'PENDING').length, color: 'amber' },
                                ].map((stat) => (
                                    <div key={stat.label} className={`p-6 rounded-3xl border transition-all duration-500 h-full portal-card ${
                                        isCurrentDesign ? 'bg-white border-slate-100 shadow-sm shadow-slate-100' : 'border-white/5 shadow-blue-900/10'
                                    }`}>
                                        <p className={`text-xs font-black uppercase tracking-widest mb-2 transition-colors ${isCurrentDesign ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
                                        <p className={`text-4xl font-black tracking-tight transition-colors ${
                                            stat.color === 'blue' ? isCurrentDesign ? 'text-indigo-600' : 'text-blue-400' :
                                            stat.color === 'emerald' ? 'text-emerald-500' :
                                            stat.color === 'red' ? 'text-red-500' :
                                            'text-amber-500'
                                        }`}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Applications Table */}
                            <div className={`rounded-3xl border shadow-sm overflow-hidden transition-all duration-500 ${
                                isCurrentDesign ? 'bg-white border-slate-100 shadow-slate-100' : 'portal-card border-white/5 shadow-blue-900/10'
                            }`}>
                                <div className={`p-6 border-b flex justify-between items-center transition-colors ${
                                    isCurrentDesign ? 'bg-slate-50/50 border-slate-100' : 'bg-white/5 border-white/5'
                                }`}>
                                    <h3 className={`font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Recent Submissions</h3>
                                    <button className={`text-xs font-black uppercase tracking-widest hover:underline transition-colors ${
                                        isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'
                                    }`}>View Pipeline</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className={`text-[10px] font-black uppercase tracking-widest border-b transition-colors ${
                                            isCurrentDesign ? 'bg-slate-100/50 text-slate-400 border-slate-100' : 'bg-white/5 text-slate-500 border-white/5'
                                        }`}>
                                            <tr>
                                                <th className="px-6 py-4">Student Identity</th>
                                                <th className="px-6 py-4">Position</th>
                                                <th className="px-6 py-4">Submission Date</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className={`divide-y transition-colors ${isCurrentDesign ? 'divide-slate-50' : 'divide-white/5'}`}>
                                            {appsLoading ? (
                                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading pipeline data...</td></tr>
                                            ) : applications.length === 0 ? (
                                                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">No applications received yet.</td></tr>
                                            ) : applications.map((app) => (
                                                <tr key={app.id} className={`transition-colors ${isCurrentDesign ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-sm transition-all ${
                                                                isCurrentDesign ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                                                            }`}>
                                                                {(app.student?.fullName || app.student?.username || '?')[0].toUpperCase()}
                                                            </div>
                                                            <span className={`font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-slate-200'}`}>{app.student?.fullName || app.student?.username}</span>
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-4 text-sm font-semibold transition-colors ${isCurrentDesign ? 'text-slate-600' : 'text-slate-400'}`}>{app.job?.title}</td>
                                                    <td className={`px-6 py-4 text-sm font-medium transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : '—'}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                                            app.status === 'SHORTLISTED' ? isCurrentDesign ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                            app.status === 'REJECTED' ? isCurrentDesign ? 'bg-red-50 text-red-700 border-red-100' : 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                            app.status === 'PENDING'  ? isCurrentDesign ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                            isCurrentDesign ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                        }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2 justify-center">
                                                            <button onClick={() => setSelectedApp(app)} className={`p-2 rounded-xl transition-all ${
                                                                isCurrentDesign ? 'text-indigo-600 hover:bg-indigo-50' : 'text-blue-400 hover:bg-blue-600/20'
                                                            }`} title="View Dossier"><ChevronRight size={20} /></button>
                                                            <button onClick={() => handleStatusChange(app.id, 'SHORTLISTED')} className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all" title="Shortlist"><UserCheck size={20} /></button>
                                                            <button onClick={() => handleStatusChange(app.id, 'REJECTED')} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all" title="Reject"><UserX size={20} /></button>
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
