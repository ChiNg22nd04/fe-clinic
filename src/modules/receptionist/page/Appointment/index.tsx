import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import AppointmentDetailModal from "./AppointmentDetailModal";

import { listAppointment } from "~/modules/receptionist/services";
import { AppointmentPayload } from "~/shared/interfaces";

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

	const fetchAppointments = async () => {
		try {
			setLoading(true);
			const response = await listAppointment();
			setAppointments(response || []);
		} catch (err: any) {
			setError(err.message || "Đã xảy ra lỗi khi lấy lịch hẹn");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAppointments();
	}, []);

	const handleViewDetail = (id: number) => {
		const appointment = appointments.find((item) => item.id === id);
		if (appointment) {
			setSelectedAppointment(appointment);
		}
	};

	// if (loading) return <div className="content">Đang tải dữ liệu...</div>;
	if (error) return <div className="content">Lỗi: {error}</div>;

	return (
		<div className="content appointment-list">
			<table>
				<thead>
					<tr>
						<th>Bệnh nhân</th>
						<th>Chuyên khoa</th>
						<th>Bác sĩ</th>
						<th>Ngày hẹn</th>
						<th>Trạng thái</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{appointments.length === 0 ? (
						<tr>
							<td colSpan={8}>Không có dữ liệu</td>
						</tr>
					) : (
						appointments.map((item) => (
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
						))
					)}
				</tbody>
			</table>

			{selectedAppointment && (
				<AppointmentDetailModal
					appointment={selectedAppointment}
					onClose={() => setSelectedAppointment(null)}
					onRefresh={fetchAppointments} // 👉 truyền hàm làm mới danh sách
				/>
			)}
		</div>
	);
};

export default Appointment;
