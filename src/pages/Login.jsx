import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Briefcase, ShieldCheck, Mail, Lock, UserCircle, ArrowLeft } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('Student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

        if (!password) newErrors.password = 'Password is required';

        if ((role === 'Admin' || role === 'Employee') && !employeeId) {
            newErrors.employeeId = 'Employee ID is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            login(role, email, employeeId);
            navigate(`/${role.toLowerCase()}/dashboard`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4 relative">
            <Link
                to="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>
            <div className="max-w-md w-full glass rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="p-8">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full mb-4 shadow-inner">
                            <GraduationCap size={40} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Campus Placement</h1>
                        <p className="text-gray-500 mt-2">Manage your career with ease</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Login As</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Student', 'Employee', 'Admin'].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${role === r ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className={`input-field ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={`input-field ${errors.password ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            {(role === 'Admin' || role === 'Employee') && (
                                <div className="relative animate-in slide-in-from-top-2 duration-300">
                                    <input
                                        type="text"
                                        placeholder="Employee ID"
                                        className={`input-field ${errors.employeeId ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                        value={employeeId}
                                        onChange={(e) => setEmployeeId(e.target.value)}
                                    />
                                    {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="w-full btn-primary py-3 text-lg font-semibold shadow-xl">
                            Log In
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
