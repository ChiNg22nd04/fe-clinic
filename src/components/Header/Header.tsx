import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/images/logo.app.svg";
import { log } from "console";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="header__logo">
                        <Link className="header__logo-link" to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="header__contact">
                        <span>
                            Hotline: <a href="tel:02871026868">0287 102 6868</a>
                        </span>
                    </div>
                </div>
            </div>
            <nav className="header__nav">
                <div className="container">
                    <ul>
                        <li>
                            <Link to="/gioi-thieu">GIỚI THIỆU</Link>
                        </li>
                        <li>
                            <Link to="/chuyen-khoa">CHUYÊN KHOA</Link>
                        </li>
                        <li>
                            <Link to="/dat-lich">CHUYÊN GIA - BÁC SĨ</Link>
                        </li>
                        <li>
                            <Link to="/tin-tuc">THÀNH TỰU</Link>
                        </li>
                        <li>
                            <Link to="/lien-he">TIN TỨC</Link>
                        </li>
                        <li>
                            <Link to="/lien-he">HỎI ĐÁP</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
