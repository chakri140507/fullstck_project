import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User, Menu, Bell, Sun, Moon } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { isCurrentDesign, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed w-full z-30 top-0 border-b transition-all duration-500 ${
      isCurrentDesign ? 'bg-white border-gray-200' : 'bg-transparent border-white/10'
    }`}>
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg cursor-pointer lg:hidden transition-colors ${
                isCurrentDesign ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              <Menu size={20} />
            </button>
            <Link to="/" className="flex ml-2 md:mr-24 items-center">
              <span className={`self-center text-xl font-bold sm:text-2xl whitespace-nowrap transition-colors ${
                isCurrentDesign ? 'text-blue-600' : 'text-blue-400'
              }`}>
                Student <span className={isCurrentDesign ? 'text-gray-800' : 'text-white'}>Placement</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                    isCurrentDesign ? 'text-gray-500 hover:bg-gray-100' : 'text-yellow-400 hover:bg-white/10'
                }`}
                title="Toggle Theme"
            >
                {isCurrentDesign ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button className={`p-2 rounded-lg relative transition-colors ${
                isCurrentDesign ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/10'
            }`}>
              <Bell size={20} />
              <span className={`absolute top-1 right-1 w-2 h-2 rounded-full border-2 ${
                  isCurrentDesign ? 'bg-red-500 border-white' : 'bg-red-500 border-[#0D1B4B]'
              }`}></span>
            </button>
            
            {user ? (
              <div className={`flex items-center gap-4 border-l pl-4 transition-colors ${
                  isCurrentDesign ? 'border-gray-200' : 'border-white/10'
              }`}>
                <div className="hidden md:flex flex-col text-right">
                  <span className={`text-sm font-semibold transition-colors ${
                      isCurrentDesign ? 'text-gray-700' : 'text-slate-200'
                  }`}>{user.name}</span>
                  <span className={`text-xs transition-colors ${
                      isCurrentDesign ? 'text-gray-500' : 'text-slate-400'
                  }`}>{user.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
                      isCurrentDesign ? 'text-red-600 hover:bg-red-50' : 'text-red-400 hover:bg-red-500/10'
                  }`}
                  title="Logout"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isCurrentDesign ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                <User size={18} />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
