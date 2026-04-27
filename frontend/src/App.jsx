import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';

import StudentDashboard from './pages/student/Dashboard';
import ApplyJob from './pages/student/ApplyJob';
import EmployeeDashboard from './pages/employee/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import MyApplications from './pages/student/MyApplications';
import AvailableJobs from './pages/student/AvailableJobs';
import Profile from './pages/student/Profile';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

const ThemeWrapper = ({ children }) => {
  const { isCurrentDesign } = useTheme();
  return (
    <div 
      className={`min-h-screen transition-all duration-700 ease-in-out ${
        isCurrentDesign ? 'bg-slate-50 text-slate-900' : 'is-dark text-white'
      }`}
      style={!isCurrentDesign ? { background: 'linear-gradient(180deg, #0D1B4B 0%, #060D2E 100%)', backgroundAttachment: 'fixed' } : {}}
    >
      {children}
    </div>
  );
};

const Unauthorized = () => <div className="p-8 text-red-600">Unauthorized Access</div>;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <JobProvider>
          <ThemeWrapper>
            <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/available-jobs" element={<AvailableJobs />} />
              <Route path="/apply/:jobId" element={<ApplyJob />} />
              <Route path="/student/applications" element={<MyApplications />} />
              <Route path="/student/profile" element={<Profile />} />
            </Route>

            {/* Officer Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Officer']} />}>
              <Route path="/officer/dashboard" element={<EmployeeDashboard />} />
              <Route path="/officer/post-job" element={<div>Post Job</div>} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-users" element={<div>Manage Users</div>} />
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Router>
          </ThemeWrapper>
        </JobProvider>
      </AuthProvider >
    </ThemeProvider>
  );
}

export default App;
