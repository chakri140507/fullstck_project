import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { API_ENDPOINTS } from '../utils/api';

const Register = () => {
    const { isCurrentDesign, toggleTheme } = useTheme();
    const [role, setRole] = useState('User'); // 'User' or 'Company'
    const [formData, setFormData] = useState({
        // User fields
        fullName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: '',
        mobile: '',
        dob: '',
        userType: 'Student',

        // Company fields
        companyName: '',
        companyEmail: '',
        companyPassword: '',
        companyConfirmPassword: '',
        companyType: '',
        industrySector: '',

        // Common Address fields
        doorNo: '',
        streetName: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        landmark: ''
    });

    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSendOTP = async () => {
        const email = role === 'User' ? formData.userEmail : formData.companyEmail;
        if (!email) {
            alert('Please enter an email address first');
            return;
        }

        setSendingOtp(true);
        try {
            const response = await fetch(API_ENDPOINTS.OTP_SEND, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            // Handle potential non-JSON error responses from Spring
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                data = { message: `Server error (${response.status}): ${text.substring(0, 50)}...` };
            }

            if (response.ok) {
                setOtpSent(true);
                alert(data.message);
            } else {
                alert(data.message || 'Failed to send OTP. Please check backend logs.');
            }
        } catch (error) {
            console.error('OTP Send error:', error);
            alert('Failed to connect to the server');
        } finally {
            setSendingOtp(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!otpSent) {
            alert('Please verify your email with OTP first');
            return;
        }
        
        // Map frontend role to backend role
        let backendRole = 'STUDENT';
        let email = formData.userEmail;
        let password = formData.userPassword;
        let fullName = formData.fullName;

        if (role === 'Company') {
            backendRole = 'OFFICER';
            email = formData.companyEmail;
            password = formData.companyPassword;
            fullName = formData.companyName;
        }

        const registrationData = {
            username: email,
            password: password,
            role: backendRole,
            fullName: fullName,
            otp: otp
        };

        try {
            const response = await fetch(API_ENDPOINTS.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Failed to connect to the server');
        }
    };

    return (
        <div className="min-h-screen font-sans">
            {/* Navigation Header */}
            <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-2">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <img 
                            src={isCurrentDesign ? "/logo.png" : "/darklogo.png"} 
                            alt="Logo" 
                            className="h-20 w-auto transition-all" 
                        />
                    </Link>
                </div>

                <div className="flex items-center gap-8">
                    {/* Theme Toggle Button */}
                    <button 
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${
                            isCurrentDesign ? 'text-slate-600 hover:text-slate-900 bg-slate-100' : 'text-yellow-400 hover:bg-white/10'
                        }`}
                        title="Toggle Theme"
                    >
                        {isCurrentDesign ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <Link
                        to="/"
                        className={`hidden sm:flex items-center gap-2 font-medium group text-sm transition-colors ${
                            isCurrentDesign ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <Link to="/login" className={`font-bold transition-colors ${
                        isCurrentDesign ? 'text-indigo-600 hover:text-indigo-800' : 'text-blue-400 hover:text-blue-300'
                    }`}>
                        Sign in
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 mt-8 relative z-10">
                <div className="text-center mb-10">
                    <h1 className={`text-4xl font-extrabold mb-2 tracking-tight transition-colors ${isCurrentDesign ? 'text-slate-900' : 'text-white'}`}>Create your account</h1>
                    <p className={`font-medium transition-colors ${isCurrentDesign ? 'text-slate-600' : 'text-slate-400'}`}>Join Bridge to connect, hire and grow</p>
                </div>

                {/* Role Tabs */}
                <div className={`flex p-1 rounded-2xl mb-8 max-w-md mx-auto transition-colors ${
                    isCurrentDesign ? 'bg-slate-200' : 'bg-white/5 border border-white/10'
                }`}>
                    <button
                        onClick={() => setRole('User')}
                        className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${role === 'User'
                            ? isCurrentDesign ? 'bg-indigo-600 text-white shadow-lg' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                            : isCurrentDesign ? 'text-slate-600 hover:text-slate-800' : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        User
                    </button>
                    <button
                        onClick={() => setRole('Company')}
                        className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${role === 'Company'
                            ? isCurrentDesign ? 'bg-indigo-600 text-white shadow-lg' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                            : isCurrentDesign ? 'text-slate-600 hover:text-slate-800' : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        Company
                    </button>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className={`rounded-3xl shadow-xl overflow-hidden mb-20 transition-all duration-500 border ${
                    isCurrentDesign ? 'bg-white border-slate-100' : 'portal-card border-white/5 shadow-blue-900/10'
                }`}>
                    <div className="p-8 md:p-12 space-y-12">

                        {/* Section: Basics */}
                        <div>
                            <h2 className={`text-xl font-bold mb-6 pb-2 border-b transition-colors ${
                                isCurrentDesign ? 'text-slate-800 border-slate-100' : 'text-white border-white/5'
                            }`}>
                                {role === 'User' ? 'Personal Basics' : 'Company Basics'}
                            </h2>
                        {/* Personal/Company Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {role === 'User' ? (
                                <>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Full Name</label>
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="First Last" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Username or Email</label>
                                        <div className="flex gap-2">
                                            <input type="text" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="Username or name@email.com" className={`flex-1 rounded-xl py-3 px-4 focus:ring-2 transition-all font-medium ${
                                                isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                            }`} />
                                            <button 
                                                type="button" 
                                                onClick={handleSendOTP} 
                                                disabled={sendingOtp || !formData.userEmail}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed border shadow-sm whitespace-nowrap ${
                                                    isCurrentDesign ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-100' : 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border-blue-500/20'
                                                }`}
                                            >
                                                {sendingOtp ? 'Sending...' : otpSent ? 'Resend Code' : 'Send Code'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Verification Code (OTP)</label>
                                        <input 
                                            type="text" 
                                            placeholder="6-digit code" 
                                            maxLength="6"
                                            className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all font-mono tracking-[0.5em] text-center font-bold ${
                                                isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                            }`} 
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Password</label>
                                        <input type="password" name="userPassword" value={formData.userPassword} onChange={handleChange} placeholder="6+ characters" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Confirm Password</label>
                                        <input type="password" name="userConfirmPassword" value={formData.userConfirmPassword} onChange={handleChange} placeholder="6+ characters" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Mobile</label>
                                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+91 1234567890" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Date of birth</label>
                                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Company Name</label>
                                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Corp" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Username or Email</label>
                                        <div className="flex gap-2">
                                            <input type="text" name="companyEmail" value={formData.companyEmail} onChange={handleChange} placeholder="Username or name@email.com" className={`flex-1 rounded-xl py-3 px-4 focus:ring-2 transition-all font-medium ${
                                                isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                            }`} />
                                            <button 
                                                type="button" 
                                                onClick={handleSendOTP} 
                                                disabled={sendingOtp || !formData.companyEmail}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed border shadow-sm whitespace-nowrap ${
                                                    isCurrentDesign ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-100' : 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border-blue-500/20'
                                                }`}
                                            >
                                                {sendingOtp ? 'Sending...' : otpSent ? 'Resend Code' : 'Send Code'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Verification Code (OTP)</label>
                                        <input 
                                            type="text" 
                                            placeholder="6-digit code" 
                                            maxLength="6"
                                            className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all font-mono tracking-[0.5em] text-center font-bold ${
                                                isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                            }`} 
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Password</label>
                                        <input type="password" name="companyPassword" value={formData.companyPassword} onChange={handleChange} placeholder="6+ characters" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Confirm Password</label>
                                        <input type="password" name="companyConfirmPassword" value={formData.companyConfirmPassword} onChange={handleChange} placeholder="6+ characters" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Company Type</label>
                                        <select name="companyType" value={formData.companyType} onChange={handleChange} className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all appearance-none cursor-pointer ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-[#0D1B4B]/80 border border-white/10 text-white focus:ring-blue-500'
                                        }`}>
                                            <option value="">Select Type</option>
                                            <option value="MNC">MNC</option>
                                            <option value="Startup">Startup</option>
                                            <option value="NGO">NGO</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Industry Sector</label>
                                        <select name="industrySector" value={formData.industrySector} onChange={handleChange} className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all appearance-none cursor-pointer ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-[#0D1B4B]/80 border border-white/10 text-white focus:ring-blue-500'
                                        }`}>
                                            <option value="">Select Sector</option>
                                            <option value="IT">IT</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Manufacturing">Manufacturing</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Section: Address */}
                        <div>
                            <h2 className={`text-xl font-bold mb-6 pb-2 border-b transition-colors ${
                                isCurrentDesign ? 'text-slate-800 border-slate-100' : 'text-white border-white/5'
                            }`}>
                                Address Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Door/Flat No *</label>
                                    <input type="text" name="doorNo" value={formData.doorNo} onChange={handleChange} placeholder="eg: 101, A Block" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                        isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                    }`} />
                                </div>
                                <div className="space-y-1">
                                    <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Street/Building Name *</label>
                                    <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} placeholder="eg: tech park road" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                        isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                    }`} />
                                </div>
                                <div className="grid grid-cols-3 gap-4 md:col-span-2">
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>City *</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="eg: Hyderabad" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>State *</label>
                                        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="eg: Telangana" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Pincode</label>
                                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="eg: 500038" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                            isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                        }`} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Country</label>
                                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="eg: India" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                        isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                    }`} />
                                </div>
                                <div className="space-y-1">
                                    <label className={`text-xs font-bold uppercase tracking-wider ml-1 transition-colors ${isCurrentDesign ? 'text-slate-500' : 'text-slate-500'}`}>Land Mark</label>
                                    <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="eg: Near Metro" className={`w-full rounded-xl py-3 px-4 focus:ring-2 transition-all ${
                                        isCurrentDesign ? 'bg-slate-50 border-none focus:ring-indigo-500' : 'bg-white/5 border border-white/10 text-white focus:ring-blue-500'
                                    }`} />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className={`w-full py-5 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 group active:scale-[0.98] ${
                                    isCurrentDesign ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                                }`}
                            >
                                Register {role === 'User' ? 'User' : 'Company'}
                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Register;
