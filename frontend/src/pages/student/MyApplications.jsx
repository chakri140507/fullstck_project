import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { API_ENDPOINTS } from '../../utils/api';
import {
    LayoutDashboard, Briefcase, LogOut, FileText, User,
    Bell, Search, MapPin, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink, Filter, Moon, Sun
} from 'lucide-react';

const MyApplications = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                console.log("Fetching applications for student ID:", userId);
                const response = await fetch(`${API_ENDPOINTS.APPLICATIONS}/student/${userId}`);
                console.log("Fetch Applications Response Status:", response.status);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Applications fetched successfully:", data);
                    setApplications(data);
                } else {
                    const errorText = await response.text();
                    console.error("Fetch failed with status:", response.status, "body:", errorText);
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchApplications();
        }
    }, [userId]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const filteredApplications = filterStatus === 'All' 
        ? applications 
        : applications.filter(app => {
            const status = app.status?.toUpperCase();
            if (filterStatus === 'Not Seen') return status === 'APPLIED';
            if (filterStatus === 'Under Review') return status === 'PENDING';
            if (filterStatus === 'Approved') return status === 'ACCEPTED' || status === 'HIRED';
            if (filterStatus === 'Rejected') return status === 'REJECTED';
            return true;
        });

    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case 'HIRED':
            case 'ACCEPTED':
                return 'bg-emerald-50/80 text-emerald-700 border-emerald-200 backdrop-blur-sm shadow-sm shadow-emerald-50';
            case 'REJECTED':
                return 'bg-red-50/80 text-red-700 border-red-200 backdrop-blur-sm shadow-sm shadow-red-50';
            case 'INTERVIEWED':
                return 'bg-indigo-50/80 text-indigo-700 border-indigo-200 backdrop-blur-sm shadow-sm shadow-indigo-50';
            case 'PENDING':
                return 'bg-amber-50/80 text-amber-700 border-amber-200 backdrop-blur-sm shadow-sm shadow-amber-50';
            default:
                return 'bg-slate-50/80 text-slate-500 border-slate-200 backdrop-blur-sm shadow-sm shadow-slate-50';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case 'HIRED': 
            case 'ACCEPTED': return <CheckCircle size={14} />;
            case 'REJECTED': return <XCircle size={14} />;
            case 'INTERVIEWED': return <AlertCircle size={14} />;
            case 'PENDING': return <Clock size={14} />;
            default: return <Clock size={14} />;
        }
    };

    return (
        <div className="flex min-h-screen font-sans">
            {/* Sidebar */}
            <aside className={`w-64 border-r hidden md:flex flex-col sticky top-0 h-screen overflow-hidden portal-sidebar transition-all duration-500 ${
                isCurrentDesign ? 'bg-white border-slate-200' : 'bg-transparent border-white/10'
            }`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => navigate('/student/dashboard')}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all ${
                            isCurrentDesign ? 'bg-indigo-600 shadow-indigo-200' : 'bg-blue-600 shadow-blue-500/20'
                        }`}>
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
                    <h2 className={`text-xl font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Application History</h2>
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
                            <input type="text" placeholder="Search applications..." className={`w-full pl-10 pr-4 py-2 border-none rounded-xl text-xs focus:ring-2 outline-none transition-all ${
                                isCurrentDesign ? 'bg-slate-50 text-slate-900 focus:ring-indigo-500' : 'bg-white/5 text-white focus:ring-blue-500'
                            }`} />
                        </div>
                        <div className={`h-8 w-px mx-1 ${isCurrentDesign ? 'bg-slate-100' : 'bg-white/10'}`}></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <p className={`text-sm font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-slate-200'}`}>{username}</p>
                                <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'}`}>{userRole}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold border-2 shadow-sm transition-all ${
                                isCurrentDesign ? 'bg-indigo-600 border-white' : 'bg-blue-600 border-white/20'
                            }`}>
                                {username?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className={`text-2xl font-black uppercase tracking-tight ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Your Submissions</h1>
                            <p className={`text-sm mt-1 ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>{applications.length} applications in progress</p>
                        </div>
                        <div className="relative">
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                                    filterStatus !== 'All' 
                                    ? isCurrentDesign ? 'bg-indigo-600 text-white shadow-indigo-100 border-none' : 'bg-blue-600 text-white shadow-blue-500/20 border-none'
                                    : isCurrentDesign ? 'bg-white/70 backdrop-blur-md border border-white text-slate-600 hover:bg-slate-50' : 'bg-white/5 backdrop-blur-md border border-white/10 text-slate-400 hover:bg-white/10'
                                }`}
                            >
                                <Filter size={14} /> {filterStatus === 'All' ? 'Filter Status' : `Status: ${filterStatus}`}
                            </button>

                            {isFilterOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)}></div>
                                    <div className={`absolute right-0 mt-3 w-56 backdrop-blur-xl border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right ${
                                        isCurrentDesign ? 'bg-white/80 border-white' : 'bg-[#0D1B4B]/90 border-white/10'
                                    }`}>
                                        <div className="p-2 space-y-1">
                                            {['All', 'Not Seen', 'Under Review', 'Approved', 'Rejected'].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => {
                                                        setFilterStatus(status);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                                        filterStatus === status 
                                                        ? isCurrentDesign ? 'bg-indigo-600 text-white shadow-md' : 'bg-blue-600 text-white'
                                                        : isCurrentDesign ? 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                                    }`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isCurrentDesign ? 'border-indigo-600' : 'border-blue-500'}`}></div>
                        </div>
                    ) : filteredApplications.length === 0 ? (
                        <div className={`rounded-3xl border p-16 text-center shadow-sm ${
                            isCurrentDesign ? 'bg-white border-slate-200' : 'portal-card border-white/5'
                        }`}>
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                                isCurrentDesign ? 'bg-slate-50' : 'bg-white/5'
                            }`}>
                                <FileText className={isCurrentDesign ? 'text-slate-300' : 'text-slate-600'} size={40} />
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>No applications found</h3>
                            <p className={`mb-8 max-w-xs mx-auto ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>You haven't applied for any positions yet. Start your journey today.</p>
                            <button 
                                onClick={() => navigate('/student/available-jobs')}
                                className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
                                    isCurrentDesign ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                                }`}
                            >
                                Explore Jobs
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {filteredApplications.map((app) => (
                                <div key={app.id} className={`p-6 rounded-[2rem] border transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 group relative overflow-hidden h-full portal-card ${
                                    isCurrentDesign ? 'bg-white/70 backdrop-blur-xl border-white shadow-lg shadow-slate-100' : 'border-white/5'
                                }`}>
                                    {!isCurrentDesign && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>}
                                    <div className="flex items-center gap-5 flex-1 relative z-10">
                                        <div className={`w-16 h-16 border rounded-2xl flex items-center justify-center transition-all duration-500 font-black text-2xl shadow-sm ${
                                            isCurrentDesign 
                                                ? 'bg-white/80 border-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white' 
                                                : 'bg-white/5 border-white/5 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                                        }`}>
                                            {app.job.company.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-bold uppercase tracking-tight leading-tight transition-colors ${
                                                isCurrentDesign ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-blue-400'
                                            }`}>{app.job.title}</h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                <span className={`text-sm font-semibold ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>{app.job.company}</span>
                                                <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                                                    <MapPin size={12} className={isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'} /> {app.job.location}
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                                                    <Clock size={12} className={isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'} /> {new Date(app.appliedDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 w-full md:w-auto relative z-10">
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-colors ${
                                            isCurrentDesign ? getStatusStyle(app.status) : 'bg-white/5 border-white/10 text-slate-300'
                                        }`}>
                                            {getStatusIcon(app.status)}
                                            {app.status}
                                        </div>
                                        <button className={`p-3 rounded-xl transition-all ${
                                            isCurrentDesign ? 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50' : 'text-slate-500 hover:text-blue-400 hover:bg-white/5'
                                        }`}>
                                            <ExternalLink size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyApplications;
