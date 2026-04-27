import React, { createContext, useContext, useState, useCallback } from 'react';
import { API_ENDPOINTS } from '../utils/api';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    const applyForJob = async (studentId, jobId, formData) => {
        try {
            console.log("Submitting application for student ID:", studentId, "job ID:", jobId);
            const response = await fetch(`${API_ENDPOINTS.APPLICATIONS}/apply`, {
                method: 'POST',
                // Content-Type is set automatically by the browser when using FormData
                body: formData,
            });
            console.log("Apply Response Status:", response.status);
            if (response.ok) {
                const newApp = await response.json();
                console.log("Application Success Data:", newApp);
                setApplications(prev => [...prev, newApp]);
                return true;
            } else {
                const errorText = await response.text();
                console.error("Apply failed with response:", errorText);
            }
        } catch (error) {
            console.error("Failed to apply for job:", error);
        }
        return false;
    };

    const fetchStudentApplications = useCallback(async (studentId) => {
        setLoading(true);
        try {
            console.log("Fetching applications for student ID:", studentId);
            const response = await fetch(`${API_ENDPOINTS.APPLICATIONS}/student/${studentId}`);
            console.log("Fetch Student Applications Response Status:", response.status);
            if (response.ok) {
                const data = await response.json();
                console.log("Student Applications Fetched:", data);
                setApplications(data);
            }
        } catch (error) {
            console.error("Failed to fetch student applications:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAllApplications = useCallback(async () => {
        setLoading(true);
        try {
            console.log("Fetching all applications...");
            const response = await fetch(API_ENDPOINTS.APPLICATIONS);
            console.log("Fetch All Applications Response Status:", response.status);
            if (response.ok) {
                const data = await response.json();
                console.log("All Applications Fetched:", data);
                setApplications(data);
            }
        } catch (error) {
            console.error("Failed to fetch all applications:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateApplicationStatus = async (appId, status) => {
        try {
            const response = await fetch(`${API_ENDPOINTS.APPLICATIONS}/${appId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (response.ok) {
                const updatedApp = await response.json();
                setApplications(prev => prev.map(app => app.id === appId ? updatedApp : app));
                return true;
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
        return false;
    };

    return (
        <ApplicationContext.Provider value={{ 
            applications, 
            applyForJob, 
            fetchStudentApplications, 
            fetchAllApplications, 
            updateApplicationStatus,
            loading 
        }}>
            {children}
        </ApplicationContext.Provider>
    );
};

export const useApplications = () => useContext(ApplicationContext);
