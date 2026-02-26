import React, { createContext, useContext, useState, useEffect } from 'react';

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

    const login = (role, email, employeeId = null) => {
        const userData = {
            role,
            email,
            employeeId,
            id: Math.random().toString(36).substr(2, 9),
            appliedJobs: []
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
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
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, addAppliedJob }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
