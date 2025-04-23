// modules/customer/layout/CustomerLayout.tsx

import React from "react";
import { Outlet, useNavigate, useMatches } from "react-router-dom";
import Header from "~/shared/components/Header";
import { API_ENDPOINTS } from "~/config";
import Sidebar from "./Sidebar";

import "./CustomerLayout.scss";

const CustomerLayout: React.FC = () => {
	const matches = useMatches();
	const navigate = useNavigate();
	const hideSidebar =
		(matches[matches.length - 1] as { handle?: { hideSidebar?: boolean } })?.handle
			?.hideSidebar || false;

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
		<div className="customer-main">
			<Header />
			<div className="layout">
				{!hideSidebar && <Sidebar />}
				<Outlet />
			</div>
		</div>
	);
};

export default CustomerLayout;
