// modules/customer/layout/CustomerLayout.tsx

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderStaff from "~/shared/components/HeaderStaff";
import "./DoctorLayout.scss";
import Nav from "./Nav";

const Doctor: React.FC = () => {
	const navigate = useNavigate();

	const userString = localStorage.getItem("user");

	useEffect(() => {
		// Redirect nếu không phải customer
		if (userString) {
			const user = JSON.parse(userString);
			if (user.role !== 1) {
				navigate("/unauthorized");
			}
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div className="doctor-main">
			<HeaderStaff />
			<div className="layout">
				<Nav />
				<Outlet />
			</div>
		</div>
	);
};

export default Doctor;
