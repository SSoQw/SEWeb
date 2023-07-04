import { FaFacebook } from 'react-icons/fa';

const Header = () => {
    return (
        <header>
            <div className="header">
                <div className="container">
                    <h1 className="titleh1">Sellick Electric</h1>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/sellickelectric">
                            <FaFacebook />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
