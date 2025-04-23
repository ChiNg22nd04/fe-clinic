import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUserPlus, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./CustomerLayout.scss";

const Sidebar: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="dashboard-cards">
			<div className="dashboard-card">
				<Link className="dashboard-card_link" to={API_ENDPOINTS.user.update}>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faClipboardList} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Cập nhập thông tin cá nhân</p>
					</div>
				</Link>
			</div>
			<div className="dashboard-card">
				<Link className="dashboard-card_link" to={API_ENDPOINTS.user.medicalReport}>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faClipboardList} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Xem hồ sơ bệnh án</p>
					</div>
				</Link>
			</div>
		</div>
	);
};
export default Sidebar;
