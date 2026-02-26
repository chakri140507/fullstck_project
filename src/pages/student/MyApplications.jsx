import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase, Clock, CheckCircle, XCircle,
    ChevronRight, FileText, LayoutDashboard, User, LogOut
} from 'lucide-react';

const MyApplications = () => {
    const { user, logout } = useAuth();
    const { jobs } = useJobs();
    const navigate = useNavigate();

    // Filter jobs that the student has applied for
    const applications = jobs.filter(job => user?.appliedJobs?.includes(job.id));

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Shortlisted': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
            case 'Selected': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-amber-100 text-amber-700 border-amber-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Shortlisted': return <CheckCircle size={16} />;
            case 'Rejected': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
                        <button onClick={() => navigate('/student/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                            <LayoutDashboard size={20} />
                            Dashboard
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 transition-colors">
                            <FileText size={20} />
                            My Applications
                        </button>
                        <button onClick={() => navigate('/student/profile')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                            <User size={20} />
                            Profile
                        </button>
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
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Applications</h1>
                        <p className="text-slate-500 mt-1">Status and details of jobs you've applied for</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {applications.map((app) => (
                            <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-inner">
                                        <Briefcase size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">{app.title}</h3>
                                        <p className="text-blue-600 font-semibold">{app.company}</p>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <Clock size={12} /> Applied Recently
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className={`px-4 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-2 uppercase tracking-wide ${getStatusStyle(app.status)}`}>
                                        {getStatusIcon(app.status)}
                                        {app.status === 'Active' ? 'Pending' : app.status}
                                    </div>
                                    <button onClick={() => navigate(`/apply/${app.id}`)} className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {applications.length === 0 && (
                            <div className="text-center py-24 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                    <FileText size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">No applications yet</h3>
                                <p className="text-slate-500 max-w-xs mx-auto mt-2">Browse the job board and start your application journey today!</p>
                                <button
                                    onClick={() => navigate('/student/dashboard')}
                                    className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
                                >
                                    Explore Jobs
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyApplications;
