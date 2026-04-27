import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { API_ENDPOINTS } from '../../utils/api';
import {
    LayoutDashboard, Briefcase, LogOut, FileText, User,
    Bell, Mail, Smartphone, MapPin, Upload, CheckCircle, Trash2, Shield, Info, ExternalLink, Moon, Sun
} from 'lucide-react';

const Profile = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.STUDENT}/profile/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${API_ENDPOINTS.STUDENT}/profile/${userId}/upload-resume`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProfile({ ...profile, resumeUrl: data.resumeUrl });
                alert('Resume uploaded successfully!');
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Error uploading file');
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className={`flex justify-center items-center h-screen transition-colors duration-500 ${isCurrentDesign ? 'bg-slate-50' : 'bg-[#0D1B4B]'}`}>
                <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isCurrentDesign ? 'border-indigo-600' : 'border-blue-500'}`}></div>
            </div>
        );
    }

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
                    <h2 className={`text-xl font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Student Profile</h2>
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

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
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
                    <div className={`rounded-[2.5rem] border shadow-sm overflow-hidden transition-all duration-500 ${
                        isCurrentDesign ? 'bg-white border-slate-100 shadow-slate-100' : 'portal-card border-white/5 shadow-blue-900/10'
                    }`}>
                        <div className={`h-32 bg-gradient-to-r ${
                            isCurrentDesign ? 'from-indigo-500 to-purple-600' : 'from-blue-600/40 to-indigo-700/40 opacity-80'
                        }`}></div>
                        <div className="px-10 pb-10">
                            <div className="relative flex justify-between items-end -mt-12 mb-8">
                                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center font-black text-4xl shadow-xl border-4 transition-all ${
                                    isCurrentDesign ? 'bg-white border-white text-indigo-600' : 'bg-[#0D1B4B] border-blue-500/30 text-white'
                                }`}>
                                    {profile?.fullName?.charAt(0).toUpperCase() || 'S'}
                                </div>
                                <button className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                                    isCurrentDesign ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                                }`}>
                                    Edit Profile
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div>
                                        <h1 className={`text-3xl font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>{profile?.fullName}</h1>
                                        <p className={`font-bold flex items-center gap-2 mt-1 transition-colors ${isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'}`}>
                                            <Shield size={16} /> Verified {profile?.role} Account
                                        </p>
                                    </div>
                                    
                                    <div className={`space-y-4 pt-4 border-t transition-colors ${isCurrentDesign ? 'border-slate-50' : 'border-white/5'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isCurrentDesign ? 'bg-slate-50 text-slate-400' : 'bg-white/5 text-slate-500'}`}>
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Username / Email</p>
                                                <p className={`font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-slate-200'}`}>{profile?.username}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isCurrentDesign ? 'bg-slate-50 text-slate-400' : 'bg-white/5 text-slate-500'}`}>
                                                <Smartphone size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile</p>
                                                <p className={`font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-slate-200'}`}>+91 98765 43210</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`rounded-[2rem] p-8 border space-y-6 transition-all duration-500 ${
                                    isCurrentDesign ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/5'
                                }`}>
                                    <div className={`flex items-center gap-2 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>
                                        <FileText className={isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'} size={20} />
                                        <h3 className="font-black uppercase tracking-tight">Resume Management</h3>
                                    </div>
                                    
                                    {profile?.resumeUrl ? (
                                        <div className={`p-6 rounded-2xl border flex items-center justify-between group transition-all duration-500 ${
                                            isCurrentDesign ? 'bg-white border-indigo-100' : 'bg-white/5 border-white/10'
                                        }`}>
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                                    isCurrentDesign ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-500/10 text-emerald-400'
                                                }`}>
                                                    <CheckCircle size={24} />
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Resume Uploaded</p>
                                                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={`text-[10px] font-bold hover:underline flex items-center gap-1 transition-colors ${
                                                        isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'
                                                    }`}>
                                                        VIEW DOCUMENT <ExternalLink size={10} />
                                                    </a>
                                                </div>
                                            </div>
                                            <label className={`p-2 cursor-pointer transition-all ${
                                                isCurrentDesign ? 'text-slate-400 hover:text-indigo-600' : 'text-slate-500 hover:text-blue-400'
                                            }`}>
                                                <Upload size={20} />
                                                <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                                            </label>
                                        </div>
                                    ) : (
                                        <div className={`p-8 rounded-2xl border-2 border-dashed text-center space-y-4 transition-all duration-500 ${
                                            isCurrentDesign ? 'bg-white border-slate-200' : 'bg-white/5 border-white/10'
                                        }`}>
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-colors ${
                                                isCurrentDesign ? 'bg-slate-50 text-slate-300' : 'bg-white/5 text-slate-600'
                                            }`}>
                                                <Upload size={32} />
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-sm transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>No Resume Found</h4>
                                                <p className={`text-xs mt-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Upload your resume to start applying</p>
                                            </div>
                                            <label className={`inline-block px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-lg active:scale-95 ${
                                                isCurrentDesign 
                                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' 
                                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                                            }`}>
                                                {uploading ? 'UPLOADING...' : 'UPLOAD NOW'}
                                                <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                                            </label>
                                        </div>
                                    )}

                                    <div className={`flex gap-3 p-4 rounded-2xl border transition-all duration-500 ${
                                        isCurrentDesign ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                                    }`}>
                                        <Info size={18} className="shrink-0" />
                                        <p className="text-[10px] font-bold leading-relaxed lowercase leading-4">
                                            * strictly only PDF/DOCX files are allowed. Make sure the file is under 5MB for faster processing.
                                        </p>
                                    </div>
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
