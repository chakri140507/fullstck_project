import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
    LayoutDashboard, Users, ShieldCheck, Settings, PieChart as PieChartIcon,
    LogOut, Briefcase, TrendingUp, CheckCircle, XCircle, UserPlus, Factory, Sun, Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

import ManageUsers from './ManageUsers';
import PlacementStats from './PlacementStats';
import SystemSettings from './SystemSettings';
import AcceptedApplications from './AcceptedApplications';

const AdminDashboard = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Quick Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Placed', val: '1,248', icon: CheckCircle, color: 'emerald' },
                                { label: 'Pending Apps', val: '432', icon: TrendingUp, color: 'blue' },
                                { label: 'Employers', val: '56', icon: Factory, color: 'amber' },
                                { label: 'Open Roles', val: '124', icon: Briefcase, color: 'indigo' },
                            ].map((stat) => (
                                <div key={stat.label} className={`p-6 rounded-3xl border transition-all duration-500 portal-card ${
                                    isCurrentDesign ? 'bg-white border-slate-100 shadow-sm' : 'border-white/5 shadow-blue-900/10'
                                }`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl transition-all ${
                                            isCurrentDesign ? `bg-${stat.color}-50 text-${stat.color}-600` : `bg-${stat.color}-600/10 text-${stat.color}-400`
                                        }`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <span className={`text-xs font-black transition-colors ${isCurrentDesign ? 'text-emerald-500' : 'text-emerald-400'}`}>+12%</span>
                                    </div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors ${isCurrentDesign ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
                                    <p className={`text-2xl font-black tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>{stat.val}</p>
                                </div>
                            ))}
                        </div>

                        {/* Summary Charts */}
                        <div className={`p-8 rounded-3xl border transition-all duration-500 portal-card ${
                            isCurrentDesign ? 'bg-white border-slate-100 shadow-sm' : 'border-white/5 shadow-blue-900/10'
                        }`}>
                            <h3 className={`font-black uppercase tracking-tight mb-8 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Weekly Placement Trend</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={[
                                        { day: 'Mon', apps: 45 }, { day: 'Tue', apps: 52 }, { day: 'Wed', apps: 48 },
                                        { day: 'Thu', apps: 70 }, { day: 'Fri', apps: 65 }
                                    ]}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isCurrentDesign ? '#f1f5f9' : '#ffffff08'} />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: isCurrentDesign ? '#64748b' : '#94a3b8', fontSize: 12}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: isCurrentDesign ? '#64748b' : '#94a3b8', fontSize: 12}} />
                                        <Tooltip contentStyle={{backgroundColor: isCurrentDesign ? '#fff' : '#0D1B4B', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                        <Line type="monotone" dataKey="apps" stroke={isCurrentDesign ? '#6366f1' : '#60a5fa'} strokeWidth={4} dot={{ r: 6, fill: isCurrentDesign ? '#6366f1' : '#60a5fa', strokeWidth: 2, stroke: '#fff' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Quick Action Panels */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'New Registrations', desc: '14 employers waiting for approval', action: 'Review Now', icon: UserPlus, tab: 'Manage Users' },
                                { title: 'System Logs', desc: 'Monitor security and audit logs', action: 'View Logs', icon: ShieldCheck, tab: 'Dashboard' },
                                { title: 'Configuration', desc: 'Manage departments and academic years', action: 'Configure', icon: Settings, tab: 'System Settings' },
                            ].map((panel) => (
                                <div
                                    key={panel.title}
                                    onClick={() => setActiveTab(panel.tab)}
                                    className={`p-6 rounded-3xl border transition-all duration-500 flex items-start gap-4 cursor-pointer group portal-card ${
                                        isCurrentDesign ? 'bg-white border-slate-100 shadow-sm hover:border-indigo-300' : 'border-white/5 shadow-blue-900/10 hover:border-blue-500/30'
                                    }`}
                                >
                                    <div className={`p-3 rounded-xl transition-all ${
                                        isCurrentDesign ? 'bg-slate-50 text-indigo-600' : 'bg-blue-600/10 text-blue-400 group-hover:bg-blue-600/20'
                                    }`}>
                                        <panel.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-sm mb-1 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>{panel.title}</h4>
                                        <p className={`text-xs mb-3 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>{panel.desc}</p>
                                        <button className={`text-xs font-black uppercase tracking-widest transition-colors ${isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'}`}>{panel.action}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Manage Users':
                return <ManageUsers />;
            case 'Placement Stats':
                return <PlacementStats />;
            case 'System Settings':
                return <SystemSettings />;
            case 'Accepted Application':
                return <AcceptedApplications />;
            default:
                return <div>Content for {activeTab}</div>;
        }
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen font-sans">
            {/* Sidebar */}
            <aside className={`w-64 border-r hidden md:flex flex-col fixed h-full z-20 transition-all duration-500 portal-sidebar ${
                isCurrentDesign ? 'bg-white border-slate-200' : 'bg-transparent border-white/10'
            }`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all ${
                            isCurrentDesign ? 'bg-indigo-600 shadow-indigo-200' : 'bg-blue-600 shadow-blue-500/20'
                        }`}>
                            A
                        </div>
                        <span className={`text-xl font-black tracking-tighter italic ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>ADMIN</span>
                    </div>

                    <nav className="space-y-1 flex-1">
                        {[
                            { name: 'Dashboard', icon: LayoutDashboard },
                            { name: 'Manage Users', icon: Users },
                            { name: 'Accepted Application', icon: CheckCircle },
                            { name: 'Placement Stats', icon: PieChartIcon },
                            { name: 'System Settings', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
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
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden ml-64">
                <header className={`h-20 border-b flex items-center justify-between px-8 sticky top-0 z-10 transition-all duration-500 portal-header ${
                    isCurrentDesign ? 'bg-white border-slate-100' : 'bg-transparent border-white/10'
                }`}>
                    <div className="flex items-center gap-4">
                        <h2 className={`text-xl font-bold transition-colors ${isCurrentDesign ? 'text-slate-800' : 'text-white'}`}>{activeTab}</h2>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                            isCurrentDesign ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                        }`}>V 2.1.0</span>
                    </div>
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
                            <div className="text-right hidden sm:block">
                                <p className={`text-sm font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-slate-200'}`}>Super Admin</p>
                                <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'}`}>System Root</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ring-4 shadow-lg font-black transition-all ${
                                isCurrentDesign ? 'bg-indigo-600 ring-white' : 'bg-blue-600 ring-white/10'
                            }`}>
                                SA
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 transition-colors duration-500">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
