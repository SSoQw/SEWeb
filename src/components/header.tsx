import { FaFacebook } from 'react-icons/fa';

const Header = () => {
    return (
        <header>
            <h1>Sellick Electric</h1>
            <div className="social-icons">
                <a href="https://www.facebook.com/sellickelectric">
                    <FaFacebook />
                </a>
            </div>
        </header>
    );
};
export default Header;