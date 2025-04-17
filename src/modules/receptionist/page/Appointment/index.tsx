import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import AppointmentDetailModal from "./AppointmentDetailModal";

import { listAppointment, AppointmentPayload } from "~/modules/receptionist/services";
import "./Appointment.scss";

dayjs.extend(localizedFormat);

const getStatusText = (status?: string | number) => {
	switch (status) {
		case 0:
		case "0":
			return "Chờ xác nhận";
		case 1:
		case "1":
			return "Chờ khám";
		case 2:
		case "2":
			return "Đã hoàn thành";
		default:
			return "Không rõ";
	}
};

const formatDate = (dateString: string) => {
	return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

const Appointment: React.FC = () => {
	const [appointments, setAppointments] = useState<AppointmentPayload[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [selectedAppointment, setSelectedAppointment] = useState<AppointmentPayload | null>(null);

	const handleViewDetail = (id: number) => {
		const appointment = appointments.find((item) => item.id === id);
		console.log("appointment", appointment);
		if (appointment) {
			setSelectedAppointment(appointment);
		}
	};

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const response = await listAppointment();
				console.log("response", response);
				setAppointments(response || []);
			} catch (err: any) {
				setError(err.message || "Đã xảy ra lỗi khi lấy lịch hẹn");
			} finally {
				setLoading(false);
			}
		};

		fetchAppointments();
	}, []);

	if (loading) return <div className="content">Đang tải dữ liệu...</div>;
	if (error) return <div className="content">Lỗi: {error}</div>;

	return (
		<div className="content appointment-list">
			<h2>Danh sách lịch hẹn</h2>
			<table>
				<thead>
					<tr>
						<th>Bệnh nhân</th>
						<th>Chuyên khoa</th>
						<th>Bác sĩ</th>
						<th>Ngày hẹn</th>
						<th>Trạng thái</th>
						<th>Hành động</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((item) => (
						<tr key={item.id}>
							<td>{item.patientName || "-"}</td>
							<td>{item.specialtyName || "-"}</td>
							<td>{item.staffName || "-"}</td>
							<td>{formatDate(item.appointmentDate)}</td>
							<td>
								<button className={`status-btn status-${item.status}`}>
									{getStatusText(item.status)}
								</button>
							</td>
							<td>
								<button
									className="action-btn"
									onClick={() => handleViewDetail(item.id!)}
								>
									Xem chi tiết
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{selectedAppointment && (
				<AppointmentDetailModal
					appointment={selectedAppointment}
					onClose={() => setSelectedAppointment(null)}
				/>
			)}
		</div>
	);
};

export default Appointment;
