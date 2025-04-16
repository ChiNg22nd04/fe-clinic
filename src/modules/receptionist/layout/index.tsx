// modules/customer/layout/CustomerLayout.tsx

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderStaff from "~/shared/components/HeaderStaff";
import "./ReceptionistLayout.scss";
import Nav from "./Nav";

const Receptionist: React.FC = () => {
	const navigate = useNavigate();

	const userString = localStorage.getItem("user");

	useEffect(() => {
		// Redirect nếu không phải customer
		if (userString) {
			const user = JSON.parse(userString);
			if (user.role !== 2) {
				navigate("/unauthorized");
			}
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div className="receptionist-main">
			<HeaderStaff />
			<div>Trang chủ receptionist</div>
			<div className="layout">
				<Nav />
				<Outlet />
			</div>
		</div>
	);
};

export default Receptionist;
