import React, { useState, useEffect } from 'react';
import { Users, Trash2, Shield, Search, Filter, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { API_ENDPOINTS } from '../../utils/api';

const ManageUsers = () => {
    const { isCurrentDesign } = useTheme();
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_ENDPOINTS.ADMIN}/pending-users`);
            if (response.ok) {
                const data = await response.json();
                setPendingUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch pending users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.ADMIN}/approve/${id}`, {
                method: 'POST'
            });
            if (response.ok) {
                alert('User approved successfully!');
                fetchPendingUsers();
            } else {
                alert('Failed to approve user');
            }
        } catch (error) {
            console.error('Approval error:', error);
            alert('Error connecting to the server');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this pending request?')) {
            try {
                const response = await fetch(`${API_ENDPOINTS.ADMIN}/users/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Registration deleted successfully!');
                    fetchPendingUsers();
                } else {
                    alert('Failed to delete user');
                }
            } catch (error) {
                console.error('Delete error:', error);
                alert('Error connecting to the server');
            }
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Manage Registrations</h2>
                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    isCurrentDesign ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                } flex items-center gap-2`}>
                    <Filter size={14} />
                    {pendingUsers.length} Pending Approvals
                </div>
            </div>

            {/* Pending Approvals Section */}
            <div className={`rounded-3xl border overflow-hidden transition-all duration-500 portal-card ${
                isCurrentDesign ? 'bg-white border-slate-200 shadow-sm shadow-slate-100' : 'border-white/5 shadow-blue-900/10'
            }`}>
                <div className={`p-6 border-b flex justify-between items-center transition-colors ${
                    isCurrentDesign ? 'bg-slate-50/50 border-slate-100' : 'bg-white/5 border-white/5'
                }`}>
                    <div className="flex items-center gap-2">
                        <Shield className={isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'} size={20} />
                        <h3 className={`font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Pending User Approvals</h3>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className={`p-12 text-center font-black uppercase tracking-widest text-xs transition-colors ${isCurrentDesign ? 'text-slate-400' : 'text-slate-500'}`}>Loading requests...</div>
                    ) : pendingUsers.length === 0 ? (
                        <div className={`p-12 text-center font-black uppercase tracking-widest text-xs transition-colors ${isCurrentDesign ? 'text-slate-400' : 'text-slate-500'}`}>No pending registrations found.</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className={`text-[10px] uppercase font-black tracking-widest border-b transition-colors ${
                                isCurrentDesign ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-white/5 text-slate-500 border-white/5'
                            }`}>
                                <tr>
                                    <th className="px-8 py-5">Username / Email</th>
                                    <th className="px-8 py-5">Requested Role</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y transition-colors ${isCurrentDesign ? 'divide-slate-100' : 'divide-white/5'}`}>
                                {pendingUsers.map((user) => (
                                    <tr key={user.id} className={`transition-all duration-300 ${isCurrentDesign ? 'hover:bg-slate-50/50' : 'hover:bg-white/5'}`}>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-lg transition-all ${
                                                    isCurrentDesign ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-blue-500/5'
                                                }`}>
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <span className={`font-bold transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>{user.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                                user.role === 'ADMIN' 
                                                    ? isCurrentDesign ? 'bg-purple-100 text-purple-700' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                    : user.role === 'OFFICER' 
                                                        ? isCurrentDesign ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                        : isCurrentDesign ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                                                isCurrentDesign ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button 
                                                    onClick={() => handleApprove(user.id)} 
                                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg ${
                                                        isCurrentDesign ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                                                    }`}
                                                >
                                                    <CheckCircle size={14} /> Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user.id)} 
                                                    className={`p-2 rounded-xl transition-all ${
                                                        isCurrentDesign ? 'text-red-500 hover:bg-red-50' : 'text-red-400 hover:bg-red-500/10'
                                                    }`} 
                                                    title="Decline"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
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

export default ManageUsers;
