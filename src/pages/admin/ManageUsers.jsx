import React, { useState, useEffect } from 'react';
import { Users, Trash2, Shield, Search, Filter, MoreVertical, CheckCircle, XCircle } from 'lucide-react';

const ManageUsers = () => {
    const [users, setUsers] = useState({
        students: [
            { id: 1, name: 'John Doe', email: 'john@student.com', department: 'CS', role: 'Student' },
            { id: 2, name: 'Jane Smith', email: 'jane@student.com', department: 'EC', role: 'Student' }
        ],
        employees: [
            { id: 3, name: 'Robert Brown', email: 'robert@company.com', company: 'Google', isApproved: true, role: 'Employee' },
            { id: 4, name: 'Sarah Wilson', email: 'sarah@company.com', company: 'Microsoft', isApproved: false, role: 'Employee' }
        ]
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (role, id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            console.log(`Deleting ${role} with id ${id}`);
            // Real API call: await axios.delete(`/api/admin/users/${role}/${id}`);
        }
    };

    const handleApprove = (id, approve) => {
        console.log(`${approve ? 'Approving' : 'Declining'} employee ${id}`);
        // Real API call: await axios.put(`/api/admin/approve-employer/${id}`, { isApproved: approve });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Manage Users</h2>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Employees Section */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <Shield className="text-indigo-600" size={20} />
                        <h3 className="font-bold text-slate-900">Employers & Employees</h3>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs uppercase bg-slate-50 text-slate-500 font-bold border-b">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Company</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.employees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{emp.name}</span>
                                            <span className="text-xs text-slate-500">{emp.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">{emp.company}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${emp.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {emp.isApproved ? 'Approved' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {!emp.isApproved && (
                                                <button onClick={() => handleApprove(emp.id, true)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="Approve"><CheckCircle size={18} /></button>
                                            )}
                                            <button onClick={() => handleDelete('Employee', emp.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Students Section */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <Users className="text-blue-600" size={20} />
                        <h3 className="font-bold text-slate-900">Students</h3>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs uppercase bg-slate-50 text-slate-500 font-bold border-b">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.students.map((stu) => (
                                <tr key={stu.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{stu.name}</span>
                                            <span className="text-xs text-slate-500">{stu.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">{stu.department}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete('Student', stu.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
