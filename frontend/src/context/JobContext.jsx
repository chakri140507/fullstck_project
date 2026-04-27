import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../utils/api';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            console.log("Fetching jobs from backend...");
            const response = await fetch(API_ENDPOINTS.JOBS);
            console.log("Fetch Jobs Response Status:", response.status);
            if (response.ok) {
                const data = await response.json();
                console.log("Jobs fetched successfully:", data);
                setJobs(data);
            }
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const addJob = async (newJob) => {
        try {
            console.log("Adding new job:", newJob);
            const response = await fetch(API_ENDPOINTS.JOBS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob),
            });
            console.log("Add Job Response Status:", response.status);
            if (response.ok) {
                const createdJob = await response.json();
                console.log("Job created successfully:", createdJob);
                setJobs(prev => [...prev, createdJob]);
                return true;
            }
        } catch (error) {
            console.error("Failed to create job:", error);
        }
        return false;
    };

    return (
        <JobContext.Provider value={{ jobs, addJob, fetchJobs, loading }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);
