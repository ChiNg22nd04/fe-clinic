import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "~/assets/images/logo.app.svg";
import images from "~/assets/images";

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
	const menuItems = [
		{ to: API_ENDPOINTS.user.profile, label: "Hồ sơ bệnh nhân" },
		{ to: API_ENDPOINTS.user.medicalReport, label: "Lịch sử khám bệnh" },
		{ to: "/", label: "Thông báo" },
	];
	const [showDropdown, setShowDropdown] = useState(false);

	const user = useUser();

	const handleLogout = () => {
		logout();
		navigate("/");
		window.location.reload();
	};
	const [showNav, setShowNav] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY) {
				setShowNav(false); // Cuộn xuống: ẩn Nav
			} else {
				setShowNav(true); // Cuộn lên: hiện Nav
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);
	return (
		<header className="header">
			<div className="header__top">
				<div className="container">
					<div className="header__logo">
						<Link className="header__logo-link" to="/">
							<img src={images.logo} alt="Logo" />
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
			<Nav isVisible={showNav} />
		</header>
	);
};

export default Header;
