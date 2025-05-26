// modules/customer/layout/CustomerLayout.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "~/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faScroll,
	faUserPlus,
	faRectangleList,
	faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./ReceptionistLayout.scss";
const Nav: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="dashboard-cards">
			{/* <div className="dashboard-card">
				<Link className="dashboard-card_link" to={API_ENDPOINTS.receptionist.shiftList}>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faClipboardList} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Quản lí lịch làm việc</p>
						<p className="title-sub">Xem danh sách lịch làm việc</p>
					</div>
				</Link>
			</div> */}
			<div className="dashboard-card">
				<Link
					className="dashboard-card_link"
					to={API_ENDPOINTS.receptionist.apponitmentList}
				>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faRectangleList} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Quản lý lịch hẹn</p>
						<p className="title-sub">Xem và cập nhật lịch hẹn của bệnh nhân</p>
					</div>
				</Link>
			</div>

			<div className="dashboard-card" onClick={() => navigate("/receptionist")}>
				<div className="dashboard-card_icon">
					<FontAwesomeIcon icon={faUserPlus} className="card-icon" />
				</div>
				<div className="title">
					<p className="title-main">Tiếp nhận bệnh nhân</p>
					<p className="title-sub">Đăng ký bệnh nhân mới đến khám</p>
				</div>
			</div>

			<div className="dashboard-card">
				<Link
					className="dashboard-card_link"
					to={API_ENDPOINTS.receptionist.examinationList}
				>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faFileLines} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Danh sách phiếu khám</p>
						<p className="title-sub">Xem danh sách phiếu khám trong ngày</p>
					</div>
				</Link>
			</div>
			<div className="dashboard-card">
				<Link className="dashboard-card_link" to={API_ENDPOINTS.receptionist.invoiceList}>
					<div className="dashboard-card_icon">
						<FontAwesomeIcon icon={faScroll} className="card-icon" />
					</div>
					<div className="title">
						<p className="title-main">Danh sách hóa đơn</p>
						<p className="title-sub">Xem danh sách hóa đơn trong ngày</p>
					</div>
				</Link>
			</div>
		</div>
	);
};
export default Nav;
