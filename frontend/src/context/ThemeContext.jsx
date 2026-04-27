import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // isCurrentDesign = true (Light Mode / "Now"), false (Dark Mode / "Bridge Background")
    const [isCurrentDesign, setIsCurrentDesign] = useState(() => {
        const saved = localStorage.getItem('isCurrentDesign');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('isCurrentDesign', JSON.stringify(isCurrentDesign));
    }, [isCurrentDesign]);

    const toggleTheme = () => setIsCurrentDesign(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isCurrentDesign, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
