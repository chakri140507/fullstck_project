import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, ShieldCheck, CheckCircle, RefreshCcw, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { API_ENDPOINTS } from '../utils/api';

const ForgotPassword = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(API_ENDPOINTS.OTP_SEND_FORGOT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                setStep(2);
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Connection failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const data = await response.json();
            if (response.ok) {
                setIsSuccess(true);
            } else {
                setError(data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError('Connection failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-500 font-sans`}>
                <div className={`max-w-md w-full rounded-[40px] shadow-2xl border p-12 text-center animate-in zoom-in duration-500 ${
                    isCurrentDesign ? 'bg-white border-slate-100' : 'portal-card border-white/10'
                }`}>
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner transition-all ${
                        isCurrentDesign ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                        <CheckCircle size={48} />
                    </div>
                    <h2 className={`text-3xl font-black mb-4 transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Password Reset!</h2>
                    <p className={`font-medium mb-10 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Your password has been successfully updated. You can now log in with your new credentials.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98] ${
                            isCurrentDesign ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                        }`}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen font-sans flex flex-col pt-12 px-6 transition-colors duration-500`}>
            {/* Navigation */}
            <div className="max-w-7xl mx-auto w-full mb-12 flex justify-between items-center">
                <Link
                    to="/login"
                    className={`inline-flex items-center gap-2 font-black group transition-colors ${
                        isCurrentDesign ? 'text-slate-400 hover:text-indigo-600' : 'text-slate-500 hover:text-white'
                    }`}
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to login
                </Link>

                {/* Theme Toggle Button */}
                <button 
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-colors ${
                        isCurrentDesign ? 'text-slate-400 hover:bg-white/10' : 'text-yellow-400 hover:bg-white/10'
                    }`}
                    title="Toggle Theme"
                >
                    {isCurrentDesign ? <Moon size={20} /> : <Sun size={20} />}
                </button>
            </div>

            <main className="flex-1 flex items-center justify-center pb-24">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10">
                        <h1 className={`text-4xl font-black mb-3 tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Password Recovery</h1>
                        <p className={`font-bold transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-400'}`}>Verify OTP and set password</p>
                    </div>

                    <div className={`rounded-[40px] shadow-2xl border p-10 relative overflow-hidden transition-all duration-500 ${
                        isCurrentDesign ? 'bg-white border-slate-100' : 'portal-card border-white/5 shadow-blue-900/10'
                    }`}>
                        {/* Progress Header */}
                        <div className="flex items-center justify-between mb-12 px-2">
                            <div className="relative flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${step >= 1 ? isCurrentDesign ? 'bg-indigo-600 text-white shadow-lg' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : isCurrentDesign ? 'bg-slate-100 text-slate-400' : 'bg-white/5 text-slate-600'}`}>1</div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Identify</span>
                            </div>
                            <div className={`flex-1 mx-4 h-1 rounded-full overflow-hidden transition-colors ${isCurrentDesign ? 'bg-slate-100' : 'bg-white/5'}`}>
                                <div className={`h-full transition-all duration-700 ${step === 1 ? 'w-0' : 'w-full'} ${isCurrentDesign ? 'bg-indigo-600' : 'bg-blue-600'}`}></div>
                            </div>
                            <div className="relative flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${step === 2 ? isCurrentDesign ? 'bg-indigo-600 text-white shadow-lg' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : isCurrentDesign ? 'bg-slate-100 text-slate-400' : 'bg-white/5 text-slate-600'}`}>2</div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Recover</span>
                            </div>
                        </div>

                        {error && (
                            <div className={`mb-6 p-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300 ${
                                isCurrentDesign ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                                {error}
                            </div>
                        )}

                        {step === 1 ? (
                            <form onSubmit={handleSendOTP} className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-500">
                                <div>
                                    <label className={`block text-[13px] font-black uppercase tracking-widest mb-3 ml-1 transition-colors ${isCurrentDesign ? 'text-slate-700' : 'text-slate-400'}`}>Email address</label>
                                    <div className="relative group">
                                        <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isCurrentDesign ? 'text-slate-300 group-focus-within:text-indigo-600' : 'text-slate-600 group-focus-within:text-blue-400'}`} size={20} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="eg : your@gmail.com"
                                            className={`w-full pl-14 pr-6 py-4 rounded-2xl outline-none transition-all font-bold ${
                                                isCurrentDesign ? 'bg-slate-50 border-2 border-slate-100 focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 text-slate-900' : 'bg-white/5 border border-white/10 focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 text-white'
                                            }`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${
                                        isCurrentDesign ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                                    }`}
                                >
                                    {isLoading ? (
                                        <RefreshCcw className="animate-spin" size={20} />
                                    ) : (
                                        'Send OTP'
                                    )}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword} className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-500">
                                <div>
                                    <label className={`block text-[13px] font-black uppercase tracking-widest mb-3 ml-1 transition-colors ${isCurrentDesign ? 'text-slate-700' : 'text-slate-400'}`}>Enter 6 digits OTP</label>
                                    <div className="relative group">
                                        <ShieldCheck className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isCurrentDesign ? 'text-slate-300 group-focus-within:text-indigo-600' : 'text-slate-600 group-focus-within:text-blue-400'}`} size={20} />
                                        <input
                                            type="text"
                                            required
                                            maxLength={6}
                                            placeholder="******"
                                            className={`w-full pl-14 pr-6 py-4 rounded-2xl outline-none transition-all font-black tracking-[0.5em] ${
                                                isCurrentDesign ? 'bg-slate-50 border-2 border-slate-100 focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 text-slate-900' : 'bg-white/5 border border-white/10 focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 text-white'
                                            }`}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-[13px] font-black uppercase tracking-widest mb-3 ml-1 transition-colors ${isCurrentDesign ? 'text-slate-700' : 'text-slate-400'}`}>New Password</label>
                                    <div className="relative group">
                                        <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isCurrentDesign ? 'text-slate-300 group-focus-within:text-indigo-600' : 'text-slate-600 group-focus-within:text-blue-400'}`} size={20} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="******"
                                            className={`w-full pl-14 pr-6 py-4 rounded-2xl outline-none transition-all font-bold ${
                                                isCurrentDesign ? 'bg-slate-50 border-2 border-slate-100 focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 text-slate-900' : 'bg-white/5 border border-white/10 focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 text-white'
                                            }`}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4 ${
                                        isCurrentDesign ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' : 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700'
                                    }`}
                                >
                                    {isLoading ? (
                                        <RefreshCcw className="animate-spin" size={20} />
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className={`w-full font-black uppercase tracking-widest text-[10px] transition-colors ${isCurrentDesign ? 'text-slate-400 hover:text-indigo-600' : 'text-slate-600 hover:text-blue-400'}`}
                                >
                                    Change email address
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ForgotPassword;
