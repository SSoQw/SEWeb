import { FaFacebook } from 'react-icons/fa';

const Header = () => {
    return (
        <header>
            <div className="header-contents">
                    <div className="titleh1">Sellick Electric</div>
                    <a href="https://www.facebook.com/sellickelectric">
                        <FaFacebook size={40}/>
                    </a>
            </div>
        </header>
    );
};

export default Header;
