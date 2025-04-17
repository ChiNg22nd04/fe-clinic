// modules/customer/layout/CustomerLayout.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUserPlus, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./DoctorLayout.scss";

const Nav: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="dashboard-cards">
			<div className="dashboard-card" onClick={() => navigate("/doctor")}>
				<div className="dashboard-card_icon">
					<FontAwesomeIcon icon={faUserPlus} className="card-icon" />
				</div>
				<div className="title">
					<p className="title-main">Quản lý hồ sơ bệnh nhân</p>
					<p className="title-sub">Xem hồ sơ bệnh nhân có trong ngày</p>
				</div>
			</div>

			<div className="dashboard-card">
				<Link className="dashboard-card_link" to={API_ENDPOINTS.doctor.examinationList}>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faClipboardList} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Danh sách phiếu khám</p>
						<p className="title-sub">Xem danh sách phiếu khám trong ngày</p>
					</div>
				</Link>
			</div>
		</div>
	);
};
export default Nav;
