import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
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
			return "Đã khám";
		case 2:
		case "2":
			return "Đã hủy";
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

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const response = await listAppointment({} as AppointmentPayload);
				setAppointments(response.data || []);
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
			<table className="appointment-table">
				<thead>
					<tr>
						<th>Mã</th>
						<th>Bệnh nhân</th>
						<th>Bác sĩ</th>
						<th>Chuyên khoa</th>
						<th>Triệu chứng</th>
						<th>Ngày hẹn</th>
						<th>Phòng khám</th>
						<th>Trạng thái</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((item) => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.patientName || "-"}</td>
							<td>{item.staffName || "-"}</td>
							<td>{item.specialtyName || "-"}</td>
							<td>{item.symptoms || "-"}</td>
							<td>{formatDate(item.appointmentDate)}</td>
							<td>{item.clinicName || "-"}</td>
							<td>{getStatusText(item.status)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Appointment;
