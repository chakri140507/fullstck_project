import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { API_ENDPOINTS } from '../../utils/api';
import {
    LayoutDashboard, Briefcase, LogOut, FileText, User,
    Bell, Search, MapPin, DollarSign, Send, Filter, ArrowRight, CheckCircle, Moon, Sun
} from 'lucide-react';

const AvailableJobs = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all active jobs
                const jobsRes = await fetch(API_ENDPOINTS.JOBS);
                const appsRes = await fetch(`${API_ENDPOINTS.APPLICATIONS}/student/${userId}`);
                
                if (jobsRes.ok && appsRes.ok) {
                    const allJobs = await jobsRes.json();
                    const studentApps = await appsRes.json();
                    
                    // Create a set of applied job IDs for efficient lookup
                    const appliedJobIds = new Set(studentApps.map(app => app.job.id.toString()));
                    
                    // Map jobs to include applied status
                    const jobsWithStatus = allJobs.map(job => ({
                        ...job,
                        isApplied: appliedJobIds.has(job.id.toString())
                    }));
                    
                    setJobs(jobsWithStatus);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleApply = async (jobId) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.APPLICATIONS}/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: userId, jobId: jobId })
            });

            if (response.ok) {
                alert('Applied successfully!');
                setJobs(jobs.filter(job => job.id !== jobId));
            } else {
                alert('Application failed');
            }
        } catch (error) {
            console.error('Apply error:', error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r hidden md:flex flex-col sticky top-0 h-screen overflow-hidden portal-sidebar border-white/5 bg-transparent">
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/student/dashboard')}>
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                            P
                        </div>
                        <span className={`text-xl font-black tracking-tighter italic ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>PORTAL</span>
                    </div>

                    <nav className="space-y-1">
                        {[
                            { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
                            { name: 'Available Jobs', icon: Briefcase, path: '/student/available-jobs' },
                            { name: 'My Applications', icon: FileText, path: '/student/applications' },
                            { name: 'Profile', icon: User, path: '/student/profile' },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                    location.pathname === item.path 
                                        ? isCurrentDesign ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100' : 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
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
                <header className={`h-20 border-b flex items-center justify-between px-8 z-10 portal-header ${
                    isCurrentDesign ? 'bg-white border-slate-100' : 'bg-transparent border-white/10'
                }`}>
                    <h2 className="text-xl font-bold text-slate-900">Live Opportunities</h2>
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

                        <div className="relative w-64 hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input type="text" placeholder="Search jobs..." className={`w-full pl-10 pr-4 py-2 border-none rounded-xl text-xs focus:ring-2 outline-none transition-all ${
                                isCurrentDesign ? 'bg-slate-50 text-slate-900 focus:ring-indigo-500' : 'bg-white/5 text-white focus:ring-blue-500'
                            }`} />
                        </div>
                        <div className={`h-8 w-px hidden md:block ${isCurrentDesign ? 'bg-slate-100' : 'bg-white/10'}`}></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className={`text-sm font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-slate-200'}`}>{username}</p>
                                <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'}`}>{userRole}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold border-2 shadow-sm transition-all ${
                                isCurrentDesign ? 'bg-indigo-600 border-white' : 'bg-blue-600 border-white/20'
                            }`}>
                                {username?.charAt(0).toUpperCase() || 'S'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight leading-none">Available Positions</h1>
                            <p className="text-slate-500 mt-2 font-medium">Discover opportunities that match your skill set</p>
                        </div>
                        <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
                            <Filter size={20} className="text-slate-600" />
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center shadow-sm">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <Briefcase size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2 uppercase tracking-tight">No new jobs available</h3>
                            <p className="text-slate-500 max-w-xs mx-auto">You've either applied to everything or there are no active postings at the moment. Check back later!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <div key={job.id} className={`group ${job.isApplied ? 'opacity-60 grayscale-[0.3]' : ''} portal-card rounded-[2rem] p-6 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full ${
                                    isCurrentDesign ? 'bg-white/70 backdrop-blur-xl border-white shadow-lg shadow-slate-100' : ''
                                }`}>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>
                                    <div className={`absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 rounded-bl-full transition-opacity duration-500 ${
                                        isCurrentDesign ? 'bg-indigo-50/50' : 'bg-blue-500/10'
                                    }`}></div>
                                    
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className="flex gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 font-bold text-xl shadow-sm border ${
                                                isCurrentDesign 
                                                    ? 'bg-white/80 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white border-slate-50' 
                                                    : 'bg-white/5 text-blue-400 group-hover:bg-blue-600 group-hover:text-white border-white/5'
                                            }`}>
                                                {job.company.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className={`font-bold text-base transition-colors uppercase tracking-tight leading-tight line-clamp-1 ${
                                                    isCurrentDesign ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-blue-400'
                                                }`}>{job.title}</h3>
                                                <p className={`font-bold text-[10px] tracking-wide mt-0.5 ${
                                                    isCurrentDesign ? 'text-slate-400' : 'text-slate-500'
                                                }`}>{job.company}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded-full tracking-widest backdrop-blur-sm border ${
                                            isCurrentDesign ? 'bg-emerald-50/80 text-emerald-700 border-emerald-100' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                            New
                                        </span>
                                    </div>

                                    <p className={`text-xs mb-6 line-clamp-2 leading-relaxed font-medium transition-colors ${
                                        isCurrentDesign ? 'text-slate-500' : 'text-slate-400'
                                    }`}>
                                        {job.description || "Join our world-class team and help us build the future of technology."}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 mb-6 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} className={isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'} />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} className={isCurrentDesign ? 'text-emerald-500' : 'text-emerald-400'} />
                                            {job.salary}
                                        </div>
                                    </div>

                                    <button 
                                        disabled={job.isApplied}
                                        onClick={() => !job.isApplied && navigate(`/apply/${job.id}`)}
                                        className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-95 mt-auto ${
                                            job.isApplied 
                                            ? isCurrentDesign ? 'bg-emerald-100 text-emerald-700 shadow-none border border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : isCurrentDesign ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                                        }`}
                                    >
                                        {job.isApplied ? (
                                            <>
                                                <CheckCircle size={14} /> Applied
                                            </>
                                        ) : (
                                            <>
                                                <Send size={14} /> Apply Now
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AvailableJobs;
