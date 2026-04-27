import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { GraduationCap, Briefcase, ShieldCheck, Mail, Lock, UserCircle, ArrowLeft } from 'lucide-react';

const Login = () => {
    const { isCurrentDesign } = useTheme();
    const [role, setRole] = useState('Student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login, socialLogin } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = async (tokenResponse) => {
        try {
            // Fetch user info from Google using the access token
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            const data = await res.json();
            
            const result = await socialLogin('GOOGLE', data.email, data.name, data.sub, role);
            if (result && result.success) {
                navigate(`/${result.role.toLowerCase()}/dashboard`);
            } else {
                setErrors({ login: result?.message || 'Google login failed' });
            }
        } catch (error) {
            setErrors({ login: 'Failed to fetch Google user info' });
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => setErrors({ login: 'Google Login Failed' }),
    });

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Username or Email is required';
        if (!password) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const result = await login(role, email, password);
            if (result && result.success) {
                navigate(`/${result.role.toLowerCase()}/dashboard`);
            } else {
                setErrors({ login: result?.message || 'Invalid credentials' });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <Link
                to="/"
                className={`absolute top-8 left-8 flex items-center gap-2 transition-colors font-medium group ${
                    isCurrentDesign ? 'text-blue-600 hover:text-blue-700' : 'text-white/80 hover:text-white'
                }`}
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>
            <div className={`max-w-lg w-full rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-500 portal-card ${
                isCurrentDesign ? 'bg-white shadow-2xl border-slate-100' : ''
            }`}>
                <div className="p-8">
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-6">
                            <img 
                                src={isCurrentDesign ? "/logo.png" : "/darklogo.png"} 
                                alt="Logo" 
                                className="h-24 w-auto transition-all" 
                            />
                        </div>
                        <h1 className={`text-3xl font-extrabold tracking-tight ${isCurrentDesign ? 'text-gray-800' : 'text-white'}`}>Campus Placement</h1>
                        <p className={`mt-1 font-medium ${isCurrentDesign ? 'text-gray-500' : 'text-slate-400'}`}>Manage your career with ease</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className={`block text-sm font-semibold mb-2 ${isCurrentDesign ? 'text-gray-700' : 'text-slate-200'}`}>Login As</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Student', 'Officer', 'Admin'].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${
                                            role === r 
                                                ? isCurrentDesign ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-blue-500 text-white shadow-lg scale-105 shadow-blue-500/20'
                                                : isCurrentDesign ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-white/5 text-slate-400 hover:bg-white/10'
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
                                    type="text"
                                    placeholder="Username or Email"
                                    className={`input-field ${
                                        isCurrentDesign ? '' : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500'
                                    } ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={`input-field ${
                                        isCurrentDesign ? '' : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500'
                                    } ${(errors.password || errors.login) ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.login) setErrors({});
                                    }}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                {errors.login && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.login}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className={`text-sm font-bold transition-colors ${
                                    isCurrentDesign ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                                }`}
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className={`w-full py-3 text-lg font-semibold shadow-xl rounded-xl transition-all active:scale-95 ${
                            isCurrentDesign ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/10'
                        }`}>
                            Log In
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className={`w-full border-t ${isCurrentDesign ? 'border-gray-200' : 'border-white/10'}`}></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className={`px-4 font-medium italic ${isCurrentDesign ? 'bg-white text-gray-500' : 'bg-[#0D1B4B] text-slate-400'}`}>Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => googleLogin()}
                                className={`flex items-center justify-center gap-3 px-4 py-3 border rounded-xl transition-all font-semibold shadow-sm active:scale-95 ${
                                    isCurrentDesign ? 'border-gray-200 text-gray-700 hover:bg-gray-50' : 'border-white/10 text-slate-200 hover:bg-white/5'
                                }`}
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                                Sign in with Google
                            </button>
                        </div>
                    </div>

                    <p className={`mt-8 text-center text-sm ${isCurrentDesign ? 'text-gray-500' : 'text-slate-400'}`}>
                        Don't have an account? <Link to="/register" className={`font-bold hover:underline ${
                            isCurrentDesign ? 'text-blue-600' : 'text-blue-400'
                        }`}>Register Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
