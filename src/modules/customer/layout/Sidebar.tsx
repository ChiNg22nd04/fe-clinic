import React from "react";
import { API_ENDPOINTS } from "~/config";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./CustomerLayout.scss";

const Sidebar: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="dashboard-cards">
			<div className="dashboard-card">
				<Link className="dashboard-card_link" to={API_ENDPOINTS.user.profile}>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faClipboardList} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Thông tin cá nhân</p>
					</div>
				</Link>
			</div>
			<div className="dashboard-card">
				<Link className="dashboard-card_link" to={API_ENDPOINTS.user.appointments}>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faClipboardList} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Lịch sử đặt lịch</p>
					</div>
				</Link>
			</div>
			<div className="dashboard-card">
				<Link className="dashboard-card_link" to={API_ENDPOINTS.user.examination}>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faClipboardList} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Lịch sử khám bệnh</p>
					</div>
				</Link>
			</div>
		</div>
	);
};
export default Sidebar;
