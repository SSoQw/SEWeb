import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import {Navigate} from "react-router-dom";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    const login = () => {
        setAuthenticated(true);
        console.log('Login successful');
        <Navigate to="/dashboard" replace={true} />
    };

    const logout = () => {
        setAuthenticated(false);
        <Navigate to="/" replace={true} />
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
