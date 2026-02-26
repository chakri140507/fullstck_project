import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
    LayoutDashboard, Users, ShieldCheck, Settings, PieChart as PieChartIcon,
    LogOut, Briefcase, TrendingUp, CheckCircle, XCircle, UserPlus, Factory
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import ManageUsers from './ManageUsers';
import PlacementStats from './PlacementStats';
import SystemSettings from './SystemSettings';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Quick Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Placed', val: '1,248', icon: CheckCircle, color: 'emerald' },
                                { label: 'Pending Apps', val: '432', icon: TrendingUp, color: 'blue' },
                                { label: 'Employers', val: '56', icon: Factory, color: 'amber' },
                                { label: 'Open Roles', val: '124', icon: Briefcase, color: 'indigo' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <span className="text-emerald-500 text-xs font-bold">+12%</span>
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-slate-900">{stat.val}</p>
                                </div>
                            ))}
                        </div>

                        {/* Summary Charts */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-8">Weekly Placement Trend</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={[
                                        { day: 'Mon', apps: 45 }, { day: 'Tue', apps: 52 }, { day: 'Wed', apps: 48 },
                                        { day: 'Thu', apps: 70 }, { day: 'Fri', apps: 65 }
                                    ]}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="apps" stroke="#6366f1" strokeWidth={3} dot={{ r: 6, fill: '#6366f1' }} />
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
                                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-indigo-300 transition-all cursor-pointer"
                                >
                                    <div className="p-3 bg-slate-50 text-indigo-600 rounded-xl">
                                        <panel.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">{panel.title}</h4>
                                        <p className="text-slate-500 text-xs mb-3">{panel.desc}</p>
                                        <button className="text-indigo-600 text-xs font-bold hover:underline">{panel.action}</button>
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
            case 'Role Permissions':
                return (
                    <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
                        <ShieldCheck size={64} className="mx-auto text-indigo-200" />
                        <h3 className="text-xl font-bold text-slate-800">Role-Based Access Control</h3>
                        <p className="text-slate-500 max-w-md mx-auto">This module allows you to define granular permissions for Admin, Employee, and Student roles. Security audit required before activation.</p>
                        <button className="btn-primary py-2 px-6">Access RBAC Settings</button>
                    </div>
                );
            default:
                return <div>Content for {activeTab}</div>;
        }
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
                <div className="p-6 h-full flex flex-col">
                    <div className="mb-10 bg-slate-50 rounded-2xl p-4 shadow-sm border border-slate-200">
                        <img
                            src="/logo.png"
                            alt="Student Placement Portal"
                            className="w-full h-auto"
                        />
                    </div>

                    <nav className="space-y-1 flex-1">
                        {[
                            { name: 'Dashboard', icon: LayoutDashboard },
                            { name: 'Manage Users', icon: Users },
                            { name: 'Role Permissions', icon: ShieldCheck },
                            { name: 'Placement Stats', icon: PieChartIcon },
                            { name: 'System Settings', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === item.name ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors mt-auto pt-6 border-t"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden ml-64">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-800">{activeTab}</h2>
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-bold">V 2.1.0</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" onClick={() => setActiveTab('System Settings')}><Settings size={20} /></button>
                        </div>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900">Super Admin</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">System Root</p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white ring-4 ring-white shadow-lg font-bold">
                                SA
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
