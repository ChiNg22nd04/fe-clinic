import React, { useState, useEffect } from "react";
import { Link, Links } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/images/logo.app.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Nav from "./Nav";
import { logout } from "../../services/authService";
import { scheduleAppointment } from "../../services/customerServices";

const Header: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="header__logo">
                        <Link className="header__logo-link" to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="header__actions" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
                        {user ? (
                            <div className="header__action-right">
                                <Link className="book-appoiment" to="/user/schedule-appointment">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <span className="pl-10">Đặt lịch khám</span>
                                </Link>
                                <div className="header__user">
                                    <FontAwesomeIcon icon={faUser} />

                                    <span className="pl-10">{user.fullName}</span>
                                    {showDropdown && (
                                        <div className="header__dropdown">
                                            <Link to="/profile">Hồ sơ bệnh nhân</Link>
                                            <Link to="/medical-records">Phiếu khám bệnh</Link>
                                            <Link to="/notifications">Thông báo</Link>
                                            <div className="logout" onClick={logout}>
                                                <FontAwesomeIcon icon={faRightFromBracket} />
                                                <span className="pl-10">Đăng xuất</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <Link className="header__logo-link" to="/login">
                                <FontAwesomeIcon icon={faUser} />
                                <span className="pl-10">{user ? user.fullName : "Tài khoản"}</span>
                            </Link>
                        )}
                    </div>
                    {/* <div className="header__actions">
                        <Link className="header__logo-link" to="/login">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="pl-5">{user ? user.fullName : "Tài khoản"}</span>
                        </Link>
                    </div> */}
                </div>
            </div>
            <Nav />
        </header>
    );
};

export default Header;
