import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "~/assets/images/logo.app.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { logout } from "~/modules/auth/services";

import { API_ENDPOINTS } from "~/config";
import Nav from "./Nav";
import UserMenu from "~/shared/components/UserMenu";
import { useUser } from "~/shared/hooks";

import "./Header.scss";

const Header: React.FC = () => {
	const navigate = useNavigate();

	const [showDropdown, setShowDropdown] = useState(false);

	const user = useUser();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const menuItems = [
		{ to: API_ENDPOINTS.user.profile, label: "Hồ sơ bệnh nhân" },
		{ to: "/", label: "Phiếu khám bệnh" },
		{ to: "/", label: "Thông báo" },
	];

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
								<Link
									className="book-appoiment"
									to={API_ENDPOINTS.user.scheduleAppointment}
								>
									<FontAwesomeIcon icon={faCalendarDays} />
									<span className="pl-10">Đặt lịch khám</span>
								</Link>
								{/* <div
									className="header__user"
									onMouseEnter={() => setShowDropdown(true)}
									onMouseLeave={() => setShowDropdown(false)}
								>
									<FontAwesomeIcon icon={faUser} />

									<span className="pl-10">{user.fullName}</span>
									{showDropdown && (
										<div className="header__dropdown">
											<Link to={API_ENDPOINTS.user.profile}>
												Hồ sơ bệnh nhân
											</Link>
											<Link to="/">Phiếu khám bệnh</Link>
											<Link to="/">Thông báo</Link>
											<div className="logout" onClick={handleLogout}>
												<FontAwesomeIcon icon={faRightFromBracket} />
												<span className="pl-10">Đăng xuất</span>
											</div>
										</div>
									)}
								</div> */}
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
			<Nav />
		</header>
	);
};

export default Header;
