import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "~/assets/images/logo.app.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { logout } from "~/modules/auth/services";
import { API_ENDPOINTS } from "~/config";
import UserMenu from "~/shared/components/UserMenu";
import { useUser } from "~/shared/hooks";
import "./HeaderStaff.scss";

const HeaderStaff: React.FC = () => {
	const navigate = useNavigate();
	const user = useUser();
	const menuItems = [
		{ to: API_ENDPOINTS.receptionist.shifts, label: "Thông tin cá nhân" },
		{ to: API_ENDPOINTS.receptionist.shifts, label: "Lịch làm việc" },
		{ to: "/", label: "Thông báo" },
	];
	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header className="header">
			<div className="header__top">
				<div className="container">
					<div className="header__logo">
						<Link className="header__logo-link" to="/">
							<img src={logo} alt="Logo" />
						</Link>
					</div>

					<div className="header__actions">
						{user ? (
							<div className="header__action-right">
								<UserMenu
									user={user}
									onLogout={handleLogout}
									menuItems={menuItems}
								/>
							</div>
						) : (
							<Link className="header__logo-link" to="/login">
								<FontAwesomeIcon icon={faUser} />
								<span className="pl-10">{user ? user.fullName : "Tài khoản"}</span>
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default HeaderStaff;
