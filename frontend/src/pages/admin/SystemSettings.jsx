import React, { useState } from 'react';
import { Settings, Plus, X, Server, Database } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SystemSettings = () => {
    const { isCurrentDesign } = useTheme();
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <h2 className={`text-2xl font-black uppercase tracking-tight flex items-center gap-3 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>
                <Settings className={isCurrentDesign ? 'text-indigo-600' : 'text-blue-400'} size={24} />
                System Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Departments */}
                <div className={`p-8 rounded-3xl border transition-all duration-500 portal-card ${
                    isCurrentDesign ? 'bg-white border-slate-200 shadow-sm shadow-slate-100' : 'border-white/5 shadow-blue-900/10'
                }`}>
                    <div className="flex items-center gap-2 mb-6">
                        <Server className={isCurrentDesign ? 'text-slate-400' : 'text-slate-600'} size={20} />
                        <h3 className={`font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-800' : 'text-slate-200'}`}>Departments</h3>
                    </div>

                    <form onSubmit={addDept} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Add new department..."
                            value={newDept}
                            onChange={(e) => setNewDept(e.target.value)}
                            className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all font-bold ${
                                isCurrentDesign ? 'bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 text-slate-900' : 'bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 text-white'
                            }`}
                        />
                        <button type="submit" className={`p-3 rounded-xl transition-all active:scale-95 shadow-lg ${
                            isCurrentDesign ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                        }`}>
                            <Plus size={20} />
                        </button>
                    </form>

                    <div className="space-y-2">
                        {departments.map(dept => (
                            <div key={dept} className={`flex items-center justify-between p-4 rounded-xl group transition-all ${
                                isCurrentDesign ? 'bg-slate-50' : 'bg-white/5 hover:bg-white/10'
                            }`}>
                                <span className={`text-sm font-bold transition-colors ${isCurrentDesign ? 'text-slate-700' : 'text-slate-300'}`}>{dept}</span>
                                <button className={`transition-all opacity-0 group-hover:opacity-100 ${isCurrentDesign ? 'text-slate-300 hover:text-red-500' : 'text-slate-600 hover:text-red-400'}`}>
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Academic Years */}
                <div className={`p-8 rounded-3xl border transition-all duration-500 portal-card ${
                    isCurrentDesign ? 'bg-white border-slate-200 shadow-sm shadow-slate-100' : 'border-white/5 shadow-blue-900/10'
                }`}>
                    <div className="flex items-center gap-2 mb-6">
                        <Database className={isCurrentDesign ? 'text-slate-400' : 'text-slate-600'} size={20} />
                        <h3 className={`font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-800' : 'text-slate-200'}`}>Academic Years</h3>
                    </div>

                    <div className="space-y-2">
                        {years.map(year => (
                            <div key={year} className={`flex items-center justify-between p-4 border rounded-xl transition-all ${
                                isCurrentDesign ? 'bg-indigo-50 border-indigo-100' : 'bg-blue-600/10 border-blue-500/20 shadow-lg shadow-blue-500/5'
                            }`}>
                                <span className={`text-sm font-black transition-colors ${isCurrentDesign ? 'text-indigo-700' : 'text-blue-400'}`}>{year}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                                    isCurrentDesign ? 'bg-indigo-200 text-indigo-800' : 'bg-blue-600 text-white'
                                }`}>ACTIVE</span>
                            </div>
                        ))}
                        <button className={`w-full mt-4 py-4 border-2 border-dashed rounded-xl transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${
                            isCurrentDesign ? 'border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500' : 'border-white/10 text-slate-600 hover:border-blue-500/30 hover:text-blue-400'
                        }`}>
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
