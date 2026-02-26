import React, { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([
        {
            id: 1,
            title: 'Senior React Developer',
            company: 'Google',
            location: 'Mountain View, CA',
            salary: '25 LPA',
            status: 'Active',
            type: 'Full-time',
            description: 'Looking for an expert React developer with 5+ years of experience.'
        },
        {
            id: 2,
            title: 'Backend Engineer',
            company: 'Meta',
            location: 'Remote',
            salary: '32 LPA',
            status: 'Active',
            type: 'Full-time',
            description: 'Expert in Node.js and distributed systems.'
        },
        {
            id: 3,
            title: 'UI Designer',
            company: 'Apple',
            location: 'Cupertino, CA',
            salary: '20 LPA',
            status: 'Inactive',
            type: 'Contract',
            description: 'Pixel perfect designer for next-gen interfaces.'
        }
    ]);

    useEffect(() => {
        const storedJobs = localStorage.getItem('jobs');
        if (storedJobs) {
            setJobs(JSON.parse(storedJobs));
        }
    }, []);

    const addJob = (newJob) => {
        setJobs(prev => {
            const updated = [{ ...newJob, id: Date.now(), status: 'Active' }, ...prev];
            localStorage.setItem('jobs', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <JobContext.Provider value={{ jobs, addJob }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);
