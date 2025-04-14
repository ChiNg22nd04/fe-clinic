// modules/customer/layout/CustomerLayout.tsx

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderStaff from "~/shared/components/HeaderStaff";
import "./ReceptionistLayout.scss";
import { API_ENDPOINTS } from "~/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faUserPlus, faClipboardList } from "@fortawesome/free-solid-svg-icons";

const Receptionist: React.FC = () => {
	const navigate = useNavigate();

	const handleNavigate = (path: string) => {
		navigate(path);
	};
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
				<div className="dashboard-cards">
					<div className="dashboard-card" onClick={() => handleNavigate("/receptionist")}>
						<div className="dashboard-card_icon">
							<FontAwesomeIcon icon={faCalendarCheck} className="card-icon" />
						</div>
						<div className="title">
							<p className="title-main">Quản lý lịch hẹn</p>
							<p className="title-sub">Xem và cập nhật lịch hẹn của bệnh nhân</p>
						</div>
					</div>

					<div className="dashboard-card" onClick={() => handleNavigate("/receptionist")}>
						<div className="dashboard-card_icon">
							<FontAwesomeIcon icon={faUserPlus} className="card-icon" />
						</div>
						<div className="title">
							<p className="title-main">Tiếp nhận bệnh nhân</p>
							<p className="title-sub">Đăng ký bệnh nhân mới đến khám</p>
						</div>
					</div>

					<div className="dashboard-card" onClick={() => handleNavigate("/receptionist")}>
						<div className="dashboard-card_icon">
							<FontAwesomeIcon icon={faClipboardList} className="card-icon" />
						</div>
						<div className="title">
							<p className="title-main">Danh sách khám hôm nay</p>
							<p className="title-sub">
								Xem danh sách bệnh nhân đã đặt lịch khám trong ngày
							</p>
						</div>
					</div>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default Receptionist;
