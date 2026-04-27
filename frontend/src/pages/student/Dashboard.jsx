import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Briefcase, UserCircle, LogOut, Search,
    Filter, MapPin, DollarSign, ChevronRight, CheckCircle, Bell, FileText, User,
    TrendingUp, Calendar, ArrowRight, Zap, Target, Moon, Sun
} from 'lucide-react';

import { useTheme } from '../../context/ThemeContext';
import { API_ENDPOINTS } from '../../utils/api';

const StudentDashboard = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
    const [stats, setStats] = useState({ appliedJobs: 0, availableJobs: 0 });
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.STUDENT}/dashboard/stats/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchStats();
        } else {
            navigate('/login');
        }
    }, [userId, navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const statCards = [
        {
            title: "Applied Positions",
            value: stats.appliedJobs,
            icon: <FileText className="text-indigo-600" />,
            color: "bg-indigo-50",
            borderColor: "border-indigo-100",
            trend: "Active applications",
            description: "Positions you've actively applied for.",
            path: '/student/applications'
        },
        {
            title: "Available Jobs",
            value: stats.availableJobs,
            icon: <Briefcase className="text-emerald-600" />,
            color: "bg-emerald-50",
            borderColor: "border-emerald-100",
            trend: "New matches found",
            description: "Explore roles that fit your profile.",
            path: '/student/available-jobs'
        }
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className={`w-64 border-r hidden md:flex flex-col sticky top-0 h-screen overflow-hidden portal-sidebar transition-all duration-500 ${
                isCurrentDesign ? 'bg-white border-slate-200' : 'bg-transparent border-white/10'
            }`}>
                <div className="p-6 flex flex-col h-full">
                    <div className={`mb-10 rounded-2xl p-4 transition-all ${
                        isCurrentDesign ? 'bg-white shadow-sm border border-slate-100' : 'bg-white/5 border border-white/10'
                    }`}>
                        <img 
                            src={isCurrentDesign ? "/logo.png" : "/darklogo.png"} 
                            alt="Student Placement Portal" 
                            className="w-full h-auto transition-all"
                        />
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
                {/* Top Navbar */}
                <header className={`h-20 border-b flex items-center justify-between px-8 z-10 transition-all duration-500 portal-header ${
                    isCurrentDesign ? 'bg-white border-slate-100' : 'bg-transparent border-white/10'
                }`}>
                    <h2 className={`text-xl font-bold hidden md:block transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Student Overview</h2>
                    
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

                        <button className={`p-2 rounded-lg relative transition-colors ${
                            isCurrentDesign ? 'text-slate-400 hover:text-indigo-600 bg-slate-50' : 'text-slate-400 hover:text-blue-400 bg-white/5'
                        }`}>
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className={`h-8 w-px mx-1 ${isCurrentDesign ? 'bg-slate-100' : 'bg-white/10'}`}></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className={`text-sm font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-slate-200'}`}>{username}</p>
                                <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'}`}>{userRole}</p>
                            </div>
                            <div
                                onClick={() => navigate('/student/profile')}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold border-2 shadow-md cursor-pointer hover:scale-105 transition-all ${
                                    isCurrentDesign ? 'bg-indigo-600 border-white' : 'bg-blue-600 border-white/20'
                                }`}
                            >
                                {username?.charAt(0).toUpperCase() || 'S'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-0">
                        <h2 className={`text-3xl font-extrabold tracking-tight ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>
                            Welcome back, <span className={isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'}>{username}</span>!
                        </h2>
                        <p className={`mt-1 font-medium italic ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Your placement journey continues here.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {statCards.map((card, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => navigate(card.path)}
                                className={`group p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden portal-card ${
                                    isCurrentDesign ? 'bg-white shadow-sm border-slate-200 hover:shadow-xl hover:border-indigo-200' : ''
                                }`}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 ${card.color} opacity-10 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
                                
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className={`p-3 rounded-xl ${isCurrentDesign ? card.color : 'bg-white/5'}`}>
                                        {React.cloneElement(card.icon, { className: isCurrentDesign ? card.icon.props.className : 'text-blue-400' })}
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-4xl font-black tracking-tighter ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>{card.value}</span>
                                        <div className={`text-[9px] uppercase font-bold mt-0.5 tracking-widest ${isCurrentDesign ? 'text-slate-400' : 'text-slate-500'}`}>{card.trend}</div>
                                    </div>
                                </div>
                                
                                <div className="relative z-10">
                                    <h3 className={`text-xl font-bold uppercase tracking-tight mb-1 transition-colors ${
                                        isCurrentDesign ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-blue-400'
                                    }`}>{card.title}</h3>
                                    <p className={`font-medium mb-4 text-xs ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>{card.description}</p>
                                    
                                    <div className={`flex items-center font-bold text-[10px] uppercase tracking-wider group-hover:gap-2 transition-all ${
                                        isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'
                                    }`}>
                                        View Details <ArrowRight size={12} className="ml-1" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl transition-all duration-500 border group ${
                        isCurrentDesign 
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-200 border-blue-400/30' 
                            : 'portal-card border-white/5 text-white shadow-blue-900/10'
                    }`}>
                        {!isCurrentDesign && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>}
                        <div className={`absolute top-0 right-0 w-80 h-80 blur-[100px] rounded-full -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-1000 ${
                            isCurrentDesign ? 'bg-white/10' : 'bg-blue-500/10'
                        }`}></div>
                        <div className={`absolute bottom-0 left-0 w-80 h-80 blur-[100px] rounded-full -ml-40 -mb-40 ${
                            isCurrentDesign ? 'bg-white/5' : 'bg-indigo-500/5'
                        }`}></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-md">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border ${
                                    isCurrentDesign ? 'bg-white/20 border-white/30 text-white' : 'bg-white/5 border-white/10 text-blue-400'
                                }`}>
                                    <Zap size={12} className={`fill-current ${isCurrentDesign ? 'text-yellow-300' : 'text-blue-400'}`} /> Placement Tip
                                </div>
                                <h2 className="text-3xl font-bold mb-4 tracking-tight">Stand out with a solid resume</h2>
                                <p className={`leading-relaxed font-medium text-sm ${isCurrentDesign ? 'text-blue-100' : 'text-slate-400'}`}>Students with an uploaded resume are prioritized by the placement algorithm. Complete your profile today.</p>
                                <button 
                                    onClick={() => navigate('/student/profile')}
                                    className={`mt-8 px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-xl active:scale-95 flex items-center gap-2 border ${
                                        isCurrentDesign 
                                            ? 'bg-white/90 backdrop-blur-md text-blue-700 hover:bg-white hover:shadow-blue-500/20 border-white/50' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 border-blue-500/50'
                                    }`}
                                >
                                    Upload Resume <Target size={20} />
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`w-28 h-28 rounded-3xl flex flex-col items-center justify-center border backdrop-blur-sm ${
                                    isCurrentDesign ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'
                                }`}>
                                    <TrendingUp size={28} className={isCurrentDesign ? 'text-white' : 'text-blue-400'} />
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${isCurrentDesign ? 'text-white/70' : 'text-slate-500'}`}>Growth</span>
                                </div>
                                <div className={`w-28 h-28 rounded-3xl flex flex-col items-center justify-center border backdrop-blur-sm mt-8 ${
                                    isCurrentDesign ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'
                                }`}>
                                    <Calendar size={28} className={isCurrentDesign ? 'text-white' : 'text-indigo-400'} />
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${isCurrentDesign ? 'text-white/70' : 'text-slate-500'}`}>Updates</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
