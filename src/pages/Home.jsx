import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, Users, Building2, GraduationCap } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Student Placement Portal Logo" className="h-56 w-auto" />
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="px-6 py-2 text-slate-600 font-semibold hover:text-indigo-600 transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        Sign up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-8 pt-20 pb-32 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 transition-all duration-700">
                        Student Placement Portal to a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                            Brilliant Future
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Connect with top companies, discover tailored job opportunities and
                        launch your career with our intelligent placement platform.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all active:scale-95"
                        >
                            Browse Jobs
                        </Link>
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2 group active:scale-95"
                        >
                            Join the platform <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Building2 className="text-indigo-600" size={24} />
                        </div>
                        <div className="text-4xl font-black text-slate-900 mb-2">5+</div>
                        <div className="text-slate-500 font-medium">Top Companies</div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Users className="text-blue-600" size={24} />
                        </div>
                        <div className="text-4xl font-black text-slate-900 mb-2">+</div>
                        <div className="text-slate-500 font-medium">Action Opportunities</div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <GraduationCap className="text-emerald-600" size={24} />
                        </div>
                        <div className="text-4xl font-black text-slate-900 mb-2">0+</div>
                        <div className="text-slate-500 font-medium">Student Placed</div>
                    </div>
                </div>
            </main>

            {/* Background decoration elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-6xl h-full overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[120px]"></div>
                <div className="absolute top-[20%] left-[-5%] w-[300px] h-[300px] bg-blue-50 rounded-full blur-[100px]"></div>
            </div>
        </div>
    );
};

export default Home;
