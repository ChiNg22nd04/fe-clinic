import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

// Define types for props
interface UserMenuProps {
	user: {
		fullName: string;
	};
	onLogout: () => void;
	menuItems: Array<{ to: string; label: string }>; // Menu items for dynamic content
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, menuItems }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div
			className="header__user"
			onMouseEnter={() => setShowDropdown(true)}
			onMouseLeave={() => setShowDropdown(false)}
		>
			<FontAwesomeIcon icon={faUser} />
			<span className="pl-10">{user.fullName}</span>
			{showDropdown && (
				<div className="header__dropdown">
					{menuItems.map((item, index) => (
						<Link key={index} to={item.to}>
							{item.label}
						</Link>
					))}
					<div className="logout" onClick={onLogout}>
						<FontAwesomeIcon icon={faRightFromBracket} />
						<span className="pl-10">Đăng xuất</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
