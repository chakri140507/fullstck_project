import React, { useState } from 'react';
import { Settings, Plus, X, Server, Database } from 'lucide-react';

const SystemSettings = () => {
    const [departments, setDepartments] = useState(['Computer Science', 'Electronics', 'Mechanical', 'Civil']);
    const [years, setYears] = useState(['2023-24', '2024-25', '2025-26']);
    const [newDept, setNewDept] = useState('');

    const addDept = (e) => {
        e.preventDefault();
        if (newDept && !departments.includes(newDept)) {
            setDepartments([...departments, newDept]);
            setNewDept('');
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Settings className="text-indigo-600" />
                System Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Departments */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Server className="text-slate-400" size={20} />
                        <h3 className="font-bold text-slate-800">Departments</h3>
                    </div>

                    <form onSubmit={addDept} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Add new department..."
                            value={newDept}
                            onChange={(e) => setNewDept(e.target.value)}
                            className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                        <button type="submit" className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                            <Plus size={20} />
                        </button>
                    </form>

                    <div className="space-y-2">
                        {departments.map(dept => (
                            <div key={dept} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group">
                                <span className="text-sm font-medium text-slate-700">{dept}</span>
                                <button className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Academic Years */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Database className="text-slate-400" size={20} />
                        <h3 className="font-bold text-slate-800">Academic Years</h3>
                    </div>

                    <div className="space-y-2">
                        {years.map(year => (
                            <div key={year} className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-xl transition-all">
                                <span className="text-sm font-bold text-indigo-700">{year}</span>
                                <span className="px-2 py-0.5 bg-indigo-200 text-indigo-800 rounded text-[10px] font-bold">ACTIVE</span>
                            </div>
                        ))}
                        <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-all text-sm font-bold flex items-center justify-center gap-2">
                            <Plus size={18} />
                            Add New Year
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
