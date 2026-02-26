import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    User, ShoppingBag, Bell, LogOut, Search,
    Briefcase, FileText, LayoutDashboard,
    Zap, CreditCard, ShieldCheck, ChevronRight, ArrowLeft
} from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const InfoRow = ({ label, value }) => (
        <div className="flex flex-col py-3 border-b border-slate-50 last:border-0">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</span>
            <span className="text-sm font-medium text-slate-700">{value || 'Not provided'}</span>
        </div>
    );

    const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${active
                ? 'bg-blue-700/30 text-white border-r-4 border-white'
                : 'text-blue-100 hover:bg-blue-700/20 hover:text-white'
                }`}
        >
            <Icon size={20} />
            <span className="text-sm font-bold tracking-tight">{label}</span>
        </button>
    );

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            {/* Blue Sidebar */}
            <aside className="w-72 bg-[#0052FF] text-white flex flex-col shadow-2xl z-20">
                <div className="p-8">
                    <div className="mb-12 bg-white rounded-2xl p-4 shadow-sm">
                        <img
                            src="/logo.png"
                            alt="Student Placement Portal"
                            className="w-full h-auto"
                        />
                    </div>

                    <nav className="space-y-1 -mx-8">
                        <SidebarItem icon={LayoutDashboard} label="Home" onClick={() => navigate('/student/dashboard')} />
                        <SidebarItem icon={FileText} label="Contracts" onClick={() => navigate('/student/applications')} />
                        <SidebarItem icon={FileText} label="Invoices" />
                        <SidebarItem icon={Zap} label="Transaction" />
                        <SidebarItem icon={CreditCard} label="Paay Advance" />
                        <SidebarItem icon={ShieldCheck} label="Withdrawal Methods" />
                        <SidebarItem icon={Briefcase} label="Perks" />
                        <SidebarItem icon={Zap} label="Accounting" />
                        <SidebarItem icon={FileText} label="Tax Forms" />
                    </nav>
                </div>

                <div className="mt-auto p-8 pt-0">
                    <div className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-4">Setting</div>
                    <div className="bg-blue-400/20 backdrop-blur-md rounded-2xl p-4 border border-blue-400/30">
                        <SidebarItem icon={User} label="Your Profile" active />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-100 flex items-center px-10 gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search...."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <button
                            onClick={() => navigate('/student/dashboard')}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-all group shadow-sm active:scale-95"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </button>
                        <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
                            <Bell size={20} />
                        </button>
                        <button onClick={handleLogout} className="p-2.5 bg-red-50 rounded-xl text-red-500 hover:bg-red-100 transition-colors">
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                <div className="p-10 pt-8 overflow-y-auto">
                    <div className="flex items-center gap-3 text-slate-400 text-lg font-bold mb-8">
                        <span>General</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">Personal Information</span>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        {/* Left Card - Summary */}
                        <div className="xl:col-span-5 bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden text-center p-12">
                            <div className="w-24 h-24 mx-auto mb-8 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner">
                                <User size={48} strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-1">{user?.email?.split('@')[0]}</h2>
                            <p className="text-slate-400 font-bold text-sm mb-10 capitalize">Student / Developer</p>

                            <div className="bg-blue-50/50 rounded-3xl p-6 mb-12 text-left">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[13px] font-black text-slate-700">Your Profile 25% Complete</span>
                                </div>
                                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                                    <div className="w-1/4 h-full bg-[#0052FF] rounded-full"></div>
                                </div>
                            </div>

                            <div className="text-left space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Email</label>
                                    <p className="font-bold text-slate-700">{user?.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Phone</label>
                                    <p className="font-bold text-slate-700">+91 9876543210</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Location</label>
                                    <p className="font-bold text-slate-700">Bangalore, Karnataka, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="xl:col-span-7 space-y-8">
                            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                                <h3 className="text-xl font-black text-slate-900 mb-8">Contract Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    <InfoRow label="Student Type" value="Regular" />
                                    <InfoRow label="Batch" value="2021-2025" />
                                    <InfoRow label="Branch" value="Computer Science" />
                                    <InfoRow label="Current Status" value="Active" />
                                    <InfoRow label="Academic Start Date" value="Sept 12, 2021" />
                                    <InfoRow label="Scholarship" value="None" />
                                </div>
                            </div>

                            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                                <h3 className="text-xl font-black text-slate-900 mb-8">Account Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    <InfoRow label="Last Login" value="2 hours ago" />
                                    <InfoRow label="Account Email" value={user?.email} />
                                    <InfoRow label="Verification Status" value="Verified" />
                                    <InfoRow label="Profile ID" value={`STU_${user?.role === 'Student' ? '12345' : '67890'}`} />
                                    <InfoRow label="Gender" value="Male" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
