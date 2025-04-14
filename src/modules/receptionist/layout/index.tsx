// modules/customer/layout/CustomerLayout.tsx

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderStaff from "~/shared/components/HeaderStaff";
import "./ReceptionistLayout.scss";
import { API_ENDPOINTS } from "~/config";
import Dashboard from "../page/Dashboard";

const Receptionist: React.FC = () => {
	const navigate = useNavigate();

	const userString = localStorage.getItem("user");

	React.useEffect(() => {
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
				<Dashboard />
				<div className="receptionist-content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Receptionist;
