import React, { useEffect, useState } from "react";
import { useUser } from "~/shared/hooks";
import { getAllAppointment } from "~/modules/customer/services";

import "./MedicalReport.scss";
const renderStatus = (status: number) => {
	switch (status) {
		case 1:
			return "Đã hoàn tất";
		case 2:
			return "Đã hủy";
		default:
			return "Chờ xác nhận";
	}
};

const ScheduleAppointment: React.FC = () => {
	const patient = useUser();
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAppointments = async () => {
			if (!patient?.id) return;
			try {
				const response = await getAllAppointment({ patientId: patient.id });
				console.log(response.data);
				setAppointments(response.data); // bạn có thể xử lý dữ liệu ở đây
			} catch (err: any) {
				setError(err.message || "Có lỗi xảy ra khi lấy lịch hẹn");
			} finally {
				setLoading(false);
			}
		};

		fetchAppointments();
	}, [patient?.id]);

	return (
		<div className="content">
			{loading && <p>Đang tải...</p>}
			{error && <p className="error">{error}</p>}
			{!loading && !error && (
				<div className="appointments">
					{appointments.map((item: any, index: number) => (
						<div key={index} className="appointment-card">
							{/* <div className="date">
								{new Date(item.appointment_date).toLocaleString()}
							</div> */}
							<div className="info">
								<p>
									<strong>Phòng khám:</strong>{" "}
									{item.clinic_name || item.clinic_id}
								</p>
								<p>
									<strong>Chuyên khoa:</strong> {item.specialty_name}
								</p>
								<p>
									<strong>Bác sĩ:</strong> {item.staff_name || "Chưa rõ"}
								</p>
								<p>
									<strong>Ngày khám:</strong>{" "}
									{new Date(item.appointment_date).toLocaleString()}
								</p>
								<p>
									<strong>Triệu chứng:</strong> {item.symptoms || "Không có"}
								</p>
								<p className={`status status-${item.status}`}>
									<strong>Trạng thái:</strong> {renderStatus(item.status)}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ScheduleAppointment;
