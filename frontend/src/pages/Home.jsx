import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Briefcase, ArrowRight, Users, Building2, GraduationCap, Sparkles, Moon, Sun } from 'lucide-react';

const Home = () => {
    const { isCurrentDesign, toggleTheme: toggleDesign } = useTheme();

    return (
        <div className="relative">
            {/* Background Effects (kept here for extra light-mode flair if needed, but simplified) */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                {isCurrentDesign && (
                    <>
                        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[150px] animate-float" style={{ animationDelay: '-5s' }}></div>
                        <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-10s' }}></div>
                    </>
                )}
            </div>

            {/* Navigation */}
            <nav className={`sticky top-0 z-50 border-b px-8 py-3 transition-all backdrop-blur-md ${
                isCurrentDesign 
                    ? 'glass border-white/20' 
                    : 'bg-transparent border-white/5'
            }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img 
                            src={isCurrentDesign ? "/logo.png" : "/darklogo.png"} 
                            alt="Logo" 
                            className="h-20 w-auto transition-all" 
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleDesign}
                            className={`p-2 rounded-full transition-all ${
                                isCurrentDesign ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-yellow-400'
                            }`}
                            title="Toggle Background Design"
                        >
                            {isCurrentDesign ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <Link
                            to="/login"
                            className={`text-sm font-bold transition-colors uppercase tracking-wider ${
                                isCurrentDesign ? 'text-slate-600 hover:text-indigo-600' : 'text-slate-400 hover:text-blue-400'
                            }`}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className={`px-6 py-2.5 font-black rounded-xl transition-all shadow-xl active:scale-95 text-sm uppercase tracking-wider ${
                                isCurrentDesign 
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' 
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/40'
                            }`}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-8 pt-24 pb-32">
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 animate-bounce-slow ${
                        isCurrentDesign ? 'glass border-white/40' : 'bg-white/5 border-white/10'
                    }`}>
                        <Sparkles className={isCurrentDesign ? 'text-indigo-500' : 'text-blue-400'} size={16} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${
                            isCurrentDesign ? 'text-slate-600' : 'text-slate-400'
                        }`}>Next Gen Placement Platform</span>
                    </div>
                    
                    <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] transition-colors ${
                        isCurrentDesign ? 'text-slate-900' : 'text-white'
                    }`}>
                        Design Your <br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r drop-shadow-sm ${
                            isCurrentDesign 
                                ? 'from-indigo-600 via-blue-600 to-purple-600' 
                                : 'from-blue-400 via-indigo-400 to-sky-400'
                        }`}>
                            Dream Career
                        </span>
                    </h1>
                    
                    <p className={`text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium transition-colors ${
                        isCurrentDesign ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                        Connect with global industry leaders and unlock exclusive opportunities. 
                        Your journey to professional excellence starts here.
                    </p>
                    
                    <div className="flex flex-col sm:row items-center justify-center gap-6">
                        <Link
                            to="/login"
                            className={`group relative px-10 py-5 rounded-2xl font-black transition-all hover:-translate-y-1 shadow-2xl ${
                                isCurrentDesign 
                                    ? 'glass-card text-slate-900 hover:shadow-indigo-200/50' 
                                    : 'bg-white text-[#020617] hover:bg-slate-100 hover:shadow-blue-500/20'
                            }`}
                        >
                            {isCurrentDesign && <div className="mirror-overlay"></div>}
                            <span className="relative z-10 flex items-center gap-3">
                                EXPLORE JOBS <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </span>
                        </Link>
                        
                        <div className="flex items-center gap-4 mt-8 sm:mt-0">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 overflow-hidden shadow-md ${
                                        isCurrentDesign ? 'border-white bg-slate-200' : 'border-slate-800 bg-slate-800'
                                    }`}>
                                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p className={`text-sm font-bold italic transition-colors ${
                                isCurrentDesign ? 'text-slate-400' : 'text-slate-500'
                            }`}>Joined by 2,000+ Students today</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { label: 'Fortune 500 Companies', val: '500+', icon: Building2, color: 'indigo', darkColor: 'blue' },
                        { label: 'Active Opportunities', val: '12K+', icon: Briefcase, color: 'blue', darkColor: 'indigo' },
                        { label: 'Success Placement', val: '98%', icon: Sparkles, color: 'purple', darkColor: 'sky' },
                    ].map((item, idx) => (
                        <div 
                            key={idx}
                            className={`p-10 rounded-[2.5rem] group hover:-translate-y-3 transition-all duration-500 border ${
                                isCurrentDesign 
                                    ? 'glass-card border-white/60 hover:border-indigo-300/50' 
                                    : 'bg-[#0a192f] border-white/5 hover:border-blue-500/30'
                            }`}
                        >
                            {isCurrentDesign && <div className="mirror-overlay"></div>}
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform ${
                                isCurrentDesign 
                                    ? `bg-${item.color}-100` 
                                    : 'bg-white/5'
                            }`}>
                                <item.icon className={isCurrentDesign ? `text-${item.color}-600` : `text-${item.darkColor || 'blue'}-400`} size={32} />
                            </div>
                            <div className={`text-5xl font-black mb-4 tracking-tighter transition-colors ${
                                isCurrentDesign ? 'text-slate-900' : 'text-white'
                            }`}>{item.val}</div>
                            <div className={`font-bold uppercase tracking-widest text-xs transition-colors ${
                                isCurrentDesign ? 'text-slate-500' : 'text-slate-400'
                            }`}>{item.label}</div>
                            
                            {/* Decorative line */}
                            <div className={`h-1.5 rounded-full mt-6 group-hover:w-full transition-all duration-500 w-12 ${
                                isCurrentDesign ? 'bg-indigo-600/20' : 'bg-blue-600/20'
                            }`}></div>
                        </div>
                    ))}
                </div>
            </main>
            
            {/* Footer Line */}
            <div className={`h-1 w-full bg-gradient-to-r transition-all ${
                isCurrentDesign 
                    ? 'from-transparent via-indigo-600/20 to-transparent' 
                    : 'from-transparent via-blue-500/10 to-transparent'
            }`}></div>
        </div>
    );
};

export default Home;


