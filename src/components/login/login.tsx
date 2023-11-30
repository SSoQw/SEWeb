import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';

const LoginForm: React.FC = () => {
    const { login } = useAuth(); // Using the useAuth hook

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = async () => {
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Login successful');
                login();
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={onChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
