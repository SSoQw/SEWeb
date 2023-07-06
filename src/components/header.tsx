import { FaFacebook } from 'react-icons/fa';
import logo from '../images/FullLogo.png';

const Header = () => {
    return (
        <header>
            <div className="header-contents">
                <img src={logo} alt="Sellick Electric Logo" className="logo-image"/>
                    <a href="https://www.facebook.com/sellickelectric">
                        <FaFacebook size={40}/>
                    </a>
            </div>
        </header>
    );
};

export default Header;
