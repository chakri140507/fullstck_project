import React, { useState, useEffect } from 'react';
import { CheckCircle, Search, Mail, Phone, ExternalLink, Calendar, Briefcase, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { API_ENDPOINTS } from '../../utils/api';

const AcceptedApplications = () => {
    const { isCurrentDesign } = useTheme();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.APPLICATIONS);
            if (response.ok) {
                const data = await response.json();
                const accepted = data.filter(app => {
                    const status = app.status?.toUpperCase();
                    return status === 'ACCEPTED' || 
                           status === 'HIRED' || 
                           status === 'SHORTLISTED';
                });
                setApplications(accepted);
            }
        } catch (error) {
            console.error('Failed to fetch accepted applications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const filteredApps = applications.filter(app => 
        app.student?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job?.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className={`text-2xl font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Accepted Application</h2>
                    <p className={`text-sm mt-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Reviewing all applications successfully processed by officers.</p>
                </div>
                
                <div className="relative w-full md:w-72 group">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isCurrentDesign ? 'text-slate-400 group-focus-within:text-indigo-600' : 'text-slate-600 group-focus-within:text-blue-400'}`} size={16} />
                    <input 
                        type="text" 
                        placeholder="Search student or job..." 
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all shadow-sm ${
                            isCurrentDesign ? 'bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 text-white'
                        }`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className={`rounded-[2rem] border overflow-hidden transition-all duration-500 portal-card ${
                isCurrentDesign ? 'bg-white border-slate-200 shadow-sm shadow-slate-100' : 'border-white/5 shadow-blue-900/10'
            }`}>
                <div className={`p-6 border-b flex justify-between items-center transition-colors ${
                    isCurrentDesign ? 'bg-slate-50/30 border-slate-100' : 'bg-white/5 border-white/5'
                }`}>
                    <div className="flex items-center gap-2">
                        <CheckCircle className={isCurrentDesign ? 'text-emerald-600' : 'text-emerald-400'} size={20} />
                        <h3 className={`font-black uppercase tracking-tight text-sm transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Accepted Candidates</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                        isCurrentDesign ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                        {filteredApps.length} Records Found
                    </span>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-20 text-center">
                            <div className={`animate-spin rounded-full h-10 w-10 border-b-2 mx-auto ${isCurrentDesign ? 'border-indigo-600' : 'border-blue-400'}`}></div>
                            <p className={`mt-4 font-black uppercase tracking-widest text-xs transition-colors ${isCurrentDesign ? 'text-slate-400' : 'text-slate-500'}`}>Processing Data...</p>
                        </div>
                    ) : filteredApps.length === 0 ? (
                        <div className="p-20 text-center">
                            <Briefcase className={`mx-auto mb-4 transition-colors ${isCurrentDesign ? 'text-slate-200' : 'text-slate-700'}`} size={48} />
                            <h3 className={`text-lg font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-800' : 'text-white'}`}>No accepted applications yet</h3>
                            <p className={`text-sm max-w-xs mx-auto transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Once an officer accepts an application, it will appear here for your review.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className={`text-[10px] uppercase font-black tracking-widest border-b transition-colors ${
                                isCurrentDesign ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-white/5 text-slate-500 border-white/5'
                            }`}>
                                <tr>
                                    <th className="px-8 py-5">Candidate Info</th>
                                    <th className="px-8 py-5">Job Details</th>
                                    <th className="px-8 py-5">Contact</th>
                                    <th className="px-8 py-5">Applied Date</th>
                                    <th className="px-8 py-5 text-right">Resume</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y transition-colors ${isCurrentDesign ? 'divide-slate-50' : 'divide-white/5'}`}>
                                {filteredApps.map((app) => (
                                    <tr key={app.id} className={`transition-all group ${isCurrentDesign ? 'hover:bg-slate-50/50' : 'hover:bg-white/5'}`}>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-lg transition-all ${
                                                    isCurrentDesign ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-blue-600 text-white shadow-blue-500/20'
                                                }`}>
                                                    {(app.student?.fullName || app.student?.username || '?')[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className={`font-black uppercase tracking-tight text-sm transition-colors ${isCurrentDesign ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-blue-400'}`}>
                                                        {app.student?.fullName || app.student?.username}
                                                    </p>
                                                    <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isCurrentDesign ? 'text-emerald-500' : 'text-emerald-400'}`}>
                                                        {app.status}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div>
                                                <p className={`font-black text-sm leading-none transition-colors ${isCurrentDesign ? 'text-slate-800' : 'text-slate-200'}`}>{app.job?.title}</p>
                                                <p className={`text-[10px] font-black mt-1 uppercase tracking-widest transition-colors ${isCurrentDesign ? 'text-slate-400' : 'text-slate-500'}`}>{app.job?.company}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-1">
                                                <p className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${isCurrentDesign ? 'text-slate-600' : 'text-slate-400'}`}>
                                                    <Mail size={12} className={isCurrentDesign ? 'text-slate-400' : 'text-slate-600'} /> {app.email || 'N/A'}
                                                </p>
                                                <p className={`text-xs font-bold flex items-center gap-1.5 transition-colors ${isCurrentDesign ? 'text-slate-600' : 'text-slate-400'}`}>
                                                    <Phone size={12} className={isCurrentDesign ? 'text-slate-400' : 'text-slate-600'} /> {app.phoneNumber || 'N/A'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className={`text-[10px] font-black flex items-center gap-1.5 uppercase transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>
                                                <Calendar size={12} className={isCurrentDesign ? 'text-indigo-400' : 'text-blue-400'} /> 
                                                {new Date(app.appliedDate).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            {app.resumeName ? (
                                                <a 
                                                    href={`${API_ENDPOINTS.APPLICATIONS}/${app.id}/resume`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-md ${
                                                        isCurrentDesign ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                                >
                                                    View Resume <ExternalLink size={12} />
                                                </a>
                                            ) : (
                                                <span className={`text-[10px] font-black uppercase tracking-widest italic transition-colors ${isCurrentDesign ? 'text-slate-300' : 'text-slate-600'}`}>No Resume</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AcceptedApplications;
