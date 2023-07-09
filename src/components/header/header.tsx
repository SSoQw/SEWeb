import { FaFacebook } from 'react-icons/fa';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="end-contents">
                <img src="./FullLogo.png" alt="Sellick Electric Logo" className="logo-image"/>
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item">
                         <Link to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to ="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/faq">FAQ</Link>
                        </li>
                    </ul>
                </nav>
                <a href="https://www.facebook.com/sellickelectric" className="social-icons">
                    <FaFacebook size={48} />
                </a>
            </div>
        </header>
    );
};

export default Header;
