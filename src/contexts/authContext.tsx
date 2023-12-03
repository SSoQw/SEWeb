import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { urlWithPort } from '../util/config';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (credentials: { email: string; password: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const response = await fetch(`${urlWithPort}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });
            if (response.ok) {
                setAuthenticated(true);
                navigate('/dashboard', { replace: true });
                console.log('Login successful');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = async () => {
            console.log('Logout successful');
            setAuthenticated(false);
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
