import React from 'react';
import { useNavigate } from 'react-router-dom';
import error404 from '../../images/error404.png';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    };

    return (
        <div className="not-found-page">
            <img src={error404} alt="404 Error" />
            <h1>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <button onClick={goBack} className="button404">Go Back Home</button>
        </div>
    );
};

export default NotFoundPage;