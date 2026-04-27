import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session (mocked)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (role, email, password) => {
        try {
            const response = await fetch(API_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                
                // Formulate the user object based on API response
                // Normalize role for the frontend (Student, Officer, Admin)
                let actualFrontendRole = 'Student';
                if (data.role === 'ADMIN') actualFrontendRole = 'Admin';
                if (data.role === 'OFFICER') actualFrontendRole = 'Officer';

                // Validation: Check if selected role matches actual role in database
                if (actualFrontendRole !== role) {
                    return { 
                        success: false, 
                        message: `Access denied. You are registered as ${actualFrontendRole}, not ${role}.` 
                    };
                }

                const userData = {
                    id: data.userId,
                    username: data.username,
                    role: actualFrontendRole
                };
                
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username);
                localStorage.setItem('userRole', actualFrontendRole);
                return { success: true, role: actualFrontendRole };
            } else {
                return { success: false, message: 'Invalid credentials' };
            }
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, message: 'Network error. Make sure backend is running.' };
        }
    };

    const socialLogin = async (provider, email, fullName, providerId, role) => {
        try {
            const response = await fetch(API_ENDPOINTS.SOCIAL_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ provider, email, fullName, providerId, role }),
            });

            if (response.ok) {
                const data = await response.json();
                
                const userData = {
                    id: data.userId,
                    username: data.username,
                    role: data.role
                };
                
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('username', data.username);
                localStorage.setItem('userRole', data.role);
                return { success: true, role: data.role };
            } else {
                return { success: false, message: 'Social authentication failed' };
            }
        } catch (error) {
            console.error("Social login failed:", error);
            return { success: false, message: 'Network error. Make sure backend is running.' };
        }
    };

    const addAppliedJob = (jobId) => {
        setUser(prev => {
            const updated = { ...prev, appliedJobs: [...(prev.appliedJobs || []), jobId] };
            localStorage.setItem('user', JSON.stringify(updated));
            return updated;
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, login, socialLogin, logout, loading, addAppliedJob }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
