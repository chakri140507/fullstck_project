import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';

import StudentDashboard from './pages/student/Dashboard';
import ApplyJob from './pages/student/ApplyJob';
import EmployeeDashboard from './pages/employee/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import MyApplications from './pages/student/MyApplications';
import Profile from './pages/student/Profile';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

const Unauthorized = () => <div className="p-8 text-red-600">Unauthorized Access</div>;

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Student']} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/apply/:jobId" element={<ApplyJob />} />
              <Route path="/student/applications" element={<MyApplications />} />
              <Route path="/student/profile" element={<Profile />} />
            </Route>

            {/* Employee Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Employee']} />}>
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee/post-job" element={<div>Post Job</div>} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-users" element={<div>Manage Users</div>} />
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Router>
      </JobProvider>
    </AuthProvider >
  );
}

export default App;
