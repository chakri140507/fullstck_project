import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import {
    LayoutDashboard, Briefcase, UserCircle, LogOut, Search,
    Filter, MapPin, DollarSign, ChevronRight, CheckCircle, Bell, FileText, User
} from 'lucide-react';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const { jobs } = useJobs();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                <div className="p-6">
                    <div className="mb-10 bg-slate-100 rounded-2xl p-4 shadow-sm border border-slate-200">
                        <img
                            src="/logo.png"
                            alt="Student Placement Portal"
                            className="w-full h-auto"
                        />
                    </div>

                    <nav className="space-y-1">
                        {[
                            { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
                            { name: 'My Applications', icon: FileText, path: '/student/applications' },
                            { name: 'Profile', icon: User, path: '/student/profile' },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-[400px]"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
                    <div className="relative w-96 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-slate-500 hover:text-blue-600 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-1"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
                                <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                            </div>
                            <div
                                onClick={() => navigate('/student/profile')}
                                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all"
                            >
                                {user?.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Body */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">Welcome back, <span className="text-blue-600 capitalize">{user?.email?.split('@')[0]}</span>!</h2>
                        <p className="text-slate-500 mt-1">Explore and apply for the latest job opportunities.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                        <Briefcase size={24} />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user?.appliedJobs?.includes(job.id) ? 'bg-emerald-100 text-emerald-600' :
                                        job.status === 'Active' ? 'bg-blue-100 text-blue-600' :
                                            'bg-slate-100 text-slate-400'
                                        }`}>
                                        {user?.appliedJobs?.includes(job.id) ? 'Applied' : job.status}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{job.title}</h3>
                                <p className="text-blue-600 font-medium mb-4">{job.company}</p>

                                <div className="space-y-2 mb-6 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <DollarSign size={16} />
                                        <span>{job.salary}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => (job.status === 'Active' && !user?.appliedJobs?.includes(job.id)) && navigate(`/apply/${job.id}`)}
                                    disabled={user?.appliedJobs?.includes(job.id)}
                                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition-all ${user?.appliedJobs?.includes(job.id)
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                                        : job.status === 'Active'
                                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                        }`}
                                >
                                    {user?.appliedJobs?.includes(job.id) ? (
                                        <>
                                            <CheckCircle size={18} />
                                            Applied
                                        </>
                                    ) : job.status === 'Active' ? (
                                        <>
                                            Apply Now
                                            <ChevronRight size={18} />
                                        </>
                                    ) : (
                                        'Already Applied'
                                    )}
                                </button>
                            </div>
                        ))}

                        {filteredJobs.length === 0 && (
                            <div className="col-span-full py-20 text-center">
                                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                                <h3 className="text-lg font-bold text-slate-800">No jobs found</h3>
                                <p className="text-slate-500">Try adjusting your search criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
