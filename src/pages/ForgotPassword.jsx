import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, ShieldCheck, CheckCircle, RefreshCcw } from 'lucide-react';

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl border border-slate-100 p-12 text-center animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Password Reset!</h2>
                    <p className="text-slate-500 font-medium mb-10">Your password has been successfully updated. You can now log in with your new credentials.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col pt-12 px-6">
            {/* Navigation */}
            <div className="max-w-7xl mx-auto w-full mb-12">
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to login
                </Link>
            </div>

            <main className="flex-1 flex items-center justify-center pb-24">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Password Recovery</h1>
                        <p className="text-slate-500 font-bold">Verify OTP and set password</p>
                    </div>

                    <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 p-10 relative overflow-hidden">
                        {/* Progress Header */}
                        <div className="flex items-center justify-between mb-12 px-2">
                            <div className="relative flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${step >= 1 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>1</div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identify</span>
                            </div>
                            <div className="flex-1 mx-4 h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full bg-indigo-600 transition-all duration-700 ${step === 1 ? 'w-0' : 'w-full'}`}></div>
                            </div>
                            <div className="relative flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${step === 2 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>2</div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recover</span>
                            </div>
                        </div>

                        {step === 1 ? (
                            <form onSubmit={handleSendOTP} className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-500">
                                <div>
                                    <label className="block text-[13px] font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">Email address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="eg : your@gmail.com"
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all font-medium"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <RefreshCcw className="animate-spin" size={20} />
                                    ) : (
                                        'Send OPT'
                                    )}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword} className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-500">
                                <div>
                                    <label className="block text-[13px] font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">Enter 6 digits OTP</label>
                                    <div className="relative group">
                                        <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                        <input
                                            type="text"
                                            required
                                            maxLength={6}
                                            placeholder="******"
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all font-medium tracking-[0.5em]"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-black text-slate-700 uppercase tracking-widest mb-3 ml-1">New Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="******"
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 transition-all font-medium"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                                >
                                    {isLoading ? (
                                        <RefreshCcw className="animate-spin" size={20} />
                                    ) : (
                                        'Rest Password'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors"
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
