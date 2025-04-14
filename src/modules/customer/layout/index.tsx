// modules/customer/layout/CustomerLayout.tsx

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "~/shared/components/Header";
import "./CustomerLayout.scss";
import { API_ENDPOINTS } from "~/config";

const CustomerLayout: React.FC = () => {
	const navigate = useNavigate();

	const userString = localStorage.getItem("user");

	React.useEffect(() => {
		// Redirect nếu không phải customer
		if (userString) {
			const user = JSON.parse(userString);
			if (user.role !== 3) {
				navigate("/unauthorized");
			}
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<div>
			<Header />
			<div className="customer-main">
				<div className="customer-content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default CustomerLayout;
