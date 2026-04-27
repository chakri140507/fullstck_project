import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const PlacementStats = () => {
    const { isCurrentDesign } = useTheme();
    const placementData = [
        { name: 'CS', placed: 85, total: 100 },
        { name: 'EC', placed: 65, total: 90 },
        { name: 'ME', placed: 40, total: 80 },
        { name: 'CE', placed: 35, total: 75 },
        { name: 'EE', placed: 55, total: 85 },
    ];

    const hiringStats = [
        { name: 'Tech', value: 400 },
        { name: 'Finance', value: 150 },
        { name: 'Manufacturing', value: 100 },
        { name: 'Consulting', value: 200 },
    ];

    const COLORS = ['#2563eb', '#8b5cf6', '#ec4899', '#f59e0b'];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <h2 className={`text-2xl font-black uppercase tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Placement Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`p-8 rounded-3xl border transition-all duration-500 portal-card ${
                    isCurrentDesign ? 'bg-white border-slate-200 shadow-sm shadow-slate-100' : 'border-white/5 shadow-blue-900/10'
                }`}>
                    <h3 className={`font-black uppercase tracking-tight mb-8 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Department-wise Placements</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={placementData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isCurrentDesign ? '#f1f5f9' : '#ffffff08'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isCurrentDesign ? '#64748b' : '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isCurrentDesign ? '#64748b' : '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: isCurrentDesign ? '#fff' : '#0D1B4B', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="placed" fill={isCurrentDesign ? '#6366f1' : '#60a5fa'} radius={[6, 6, 0, 0]} name="Placed Students" barSize={32} />
                                <Bar dataKey="total" fill={isCurrentDesign ? '#e2e8f0' : '#ffffff10'} radius={[6, 6, 0, 0]} name="Total Eligible" barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={`p-8 rounded-3xl border transition-all duration-500 portal-card ${
                    isCurrentDesign ? 'bg-white border-slate-200 shadow-sm shadow-slate-100' : 'border-white/5 shadow-blue-900/10'
                }`}>
                    <h3 className={`font-black uppercase tracking-tight mb-8 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Hiring by Industry</h3>
                    <div className="h-80 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={hiringStats} innerRadius={80} outerRadius={100} paddingAngle={8} dataKey="value">
                                    {hiringStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: isCurrentDesign ? '#fff' : '#0D1B4B', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementStats;
