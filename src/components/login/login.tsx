import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { urlWithPort } from '../../util/config';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

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
            const response = await fetch(`${urlWithPort}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            });

            if (response.ok) {
                login();
                navigate('/dashboard', { replace: true });
                console.log('Login successful');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        // TODO: Style this form and put it in the middle of the page
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
