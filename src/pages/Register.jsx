import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState('User'); // 'User' or 'Company'
    const [formData, setFormData] = useState({
        // User fields
        fullName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: '',
        mobile: '',
        dob: '',
        userType: 'Student', // 'Student' or 'Professional'

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
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation logic would go here
        console.log('Registering as:', role, formData);
        alert('Registration simulated successfully!');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Navigation Header */}
            <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto relative">
                <div className="flex items-center gap-2">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                        <img src="/logo.png" alt="Bridge Logo" className="h-20 w-auto" />
                    </Link>
                </div>

                <div className="flex items-center gap-8">
                    <Link
                        to="/"
                        className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium group text-sm"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <Link to="/login" className="text-slate-600 font-bold hover:text-indigo-600 transition-colors">
                        Sign in
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 mt-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Create your account</h1>
                    <p className="text-slate-500 font-medium">Join Bridge to connect hire and grow</p>
                </div>

                {/* Role Tabs */}
                <div className="flex p-1 bg-slate-200 rounded-2xl mb-8 max-w-md mx-auto">
                    <button
                        onClick={() => setRole('User')}
                        className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${role === 'User'
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'text-slate-600 hover:text-slate-800'
                            }`}
                    >
                        User(Student/pro)
                    </button>
                    <button
                        onClick={() => setRole('Company')}
                        className={`flex-1 py-3 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${role === 'Company'
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'text-slate-600 hover:text-slate-800'
                            }`}
                    >
                        Company
                    </button>
                </div>

                {/* Form Container */}
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-8 md:p-12 space-y-12">

                        {/* Section: Basics */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">
                                {role === 'User' ? 'Personal Basics' : 'Company Basics'}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {role === 'User' ? (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="First Last" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                                            <input type="email" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="name@email.com" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                                            <input type="password" name="userPassword" value={formData.userPassword} onChange={handleChange} placeholder="6+ characters" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm Password</label>
                                            <input type="password" name="userConfirmPassword" value={formData.userConfirmPassword} onChange={handleChange} placeholder="6+ characters" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile</label>
                                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+91 1234567890" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Date of birth</label>
                                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Company Name</label>
                                            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Corp" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Domain Email</label>
                                            <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} placeholder="careers@acme.com" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                                            <input type="password" name="companyPassword" value={formData.companyPassword} onChange={handleChange} placeholder="6+ characters" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm Password</label>
                                            <input type="password" name="companyConfirmPassword" value={formData.companyConfirmPassword} onChange={handleChange} placeholder="6+ characters" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Company Type</label>
                                            <select name="companyType" value={formData.companyType} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer">
                                                <option value="">Select Type</option>
                                                <option value="MNC">MNC</option>
                                                <option value="Startup">Startup</option>
                                                <option value="NGO">NGO</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Industry Sector</label>
                                            <select name="industrySector" value={formData.industrySector} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer">
                                                <option value="">Select Sector</option>
                                                <option value="IT">IT</option>
                                                <option value="Finance">Finance</option>
                                                <option value="Manufacturing">Manufacturing</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>

                            {role === 'User' && (
                                <div className="mt-6 flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">I am a</label>
                                    <div className="flex gap-6 mt-1">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input type="radio" name="userType" value="Student" checked={formData.userType === 'Student'} onChange={handleChange} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">student</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input type="radio" name="userType" value="Professional" checked={formData.userType === 'Professional'} onChange={handleChange} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Professional</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section: Address */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-100">
                                Address Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Door/Flat No *</label>
                                    <input type="text" name="doorNo" value={formData.doorNo} onChange={handleChange} placeholder="eg: 101, A Block" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Street/Building Name *</label>
                                    <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} placeholder="eg: tech park road" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>
                                <div className="grid grid-cols-3 gap-4 md:col-span-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">City *</label>
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="eg: Hyderabad" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">State *</label>
                                        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="eg: Telangana" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pincode</label>
                                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="eg: 500038" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Country</label>
                                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="eg: India" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Land Mark</label>
                                    <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="eg: Near Metro" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
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
