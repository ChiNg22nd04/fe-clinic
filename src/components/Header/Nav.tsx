import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

const Nav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="header__nav">
            <div className="container">
                <div className="header__menu-icon" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
                </div>

                <ul className={`header__menu ${isOpen ? "open" : ""}`}>
                    <li>
                        <Link to="/gioi-thieu" onClick={toggleMenu}>
                            GIỚI THIỆU
                        </Link>
                    </li>
                    <li>
                        <Link to="/chuyen-khoa" onClick={toggleMenu}>
                            CHUYÊN KHOA
                        </Link>
                    </li>
                    <li>
                        <Link to="/dat-lich" onClick={toggleMenu}>
                            CHUYÊN GIA - BÁC SĨ
                        </Link>
                    </li>
                    <li>
                        <Link to="/tin-tuc" onClick={toggleMenu}>
                            THÀNH TỰU
                        </Link>
                    </li>
                    <li>
                        <Link to="/lien-he" onClick={toggleMenu}>
                            TIN TỨC
                        </Link>
                    </li>
                    <li>
                        <Link to="/lien-he" onClick={toggleMenu}>
                            HỎI ĐÁP
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
