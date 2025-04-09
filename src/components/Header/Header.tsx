import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/images/logo.app.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";

const Header: React.FC = () => {
    const [showLogin, setShowLogin] = useState(false);

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
                    <div className="header__actions">
                        <Link className="header__logo-link" to="/login">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="pl-5">Tài khoản</span>
                        </Link>
                    </div>
                </div>
            </div>
            <Nav />
        </header>
    );
};

export default Header;
