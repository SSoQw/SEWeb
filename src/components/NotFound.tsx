import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className="not-found-page">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <img src="../images/error404.png" alt="404 Error" />
            <button onClick={goBack}>Go Back</button>
        </div>
    );
};

export default NotFoundPage;