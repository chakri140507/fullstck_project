import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard,
  Briefcase,
  UserCircle,
  FileText,
  Users,
  Settings,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { isCurrentDesign } = useTheme();

  const getLinks = (role) => {
    switch (role) {
      case 'Student':
        return [
          { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={20} /> },
          { name: 'Available Jobs', path: '/student/available-jobs', icon: <Briefcase size={20} /> },
          { name: 'My Applications', path: '/student/applications', icon: <FileText size={20} /> },
          { name: 'Profile', path: '/student/profile', icon: <UserCircle size={20} /> },
        ];
      case 'Officer':
        return [
          { name: 'Dashboard', path: '/officer/dashboard', icon: <LayoutDashboard size={20} /> },
          { name: 'Post Job', path: '/officer/post-job', icon: <Briefcase size={20} /> },
        ];
      case 'Admin':
        return [
          { name: 'Admin Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
          { name: 'Manage Users', path: '/admin/manage-users', icon: <Users size={20} /> },
          { name: 'System Settings', path: '/admin/settings', icon: <Settings size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navLinks = getLinks(user?.role);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 translate-x-0 border-r transition-all duration-500 lg:mt-16 lg:z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          isCurrentDesign ? 'bg-white border-gray-200' : 'bg-transparent border-white/10'
        }`}
      >
        <div className="flex h-full flex-col px-4 py-4 lg:py-6 overflow-y-auto">
          {/* Logo on mobile only */}
          <div className="flex items-center gap-3 px-2 mb-8 lg:hidden">
            <span className={`text-xl font-bold ${isCurrentDesign ? 'text-blue-600' : 'text-blue-400'}`}>
              Student Placement
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all group ${
                    isActive
                      ? isCurrentDesign 
                        ? 'bg-blue-50 text-blue-700 shadow-sm' 
                        : 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                      : isCurrentDesign
                        ? 'text-gray-600 hover:bg-gray-100'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`transition-colors ${
                        isActive 
                            ? isCurrentDesign ? 'text-blue-700' : 'text-blue-400' 
                            : isCurrentDesign ? 'text-gray-400 group-hover:text-gray-600' : 'text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="ml-auto">
                        <ChevronRight size={14} className={isCurrentDesign ? 'text-blue-700' : 'text-blue-400'} />
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className={`mt-auto border-t pt-4 transition-colors ${
              isCurrentDesign ? 'border-gray-100' : 'border-white/5'
          }`}>
            <button
              onClick={logout}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isCurrentDesign 
                    ? 'text-red-500 hover:bg-red-50 hover:border-red-100 border border-transparent' 
                    : 'text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent'
              }`}
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
