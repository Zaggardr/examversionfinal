import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    const login = (email) => {
        localStorage.setItem('userEmail', email);
        setUserEmail(email);
    };

    const logout = () => {
        localStorage.removeItem('userEmail');
        setUserEmail(null);
    };

    return (
        <AuthContext.Provider value={{ userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
