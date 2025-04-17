import React from "react";
import { AppointmentPayload } from "~/modules/receptionist/services";
import "./Appointment.scss";

interface Props {
	appointment: AppointmentPayload | null;
	onClose: () => void;
	// onUpdateStatus: (id: number, newStatus: string) => void;
}

const getStatusText = (status?: string | number) => {
	switch (status) {
		case 0:
			return "Chờ xác nhận";
		case 1:
			return "Chờ khám";
		case 2:
			return "Đã hoàn thành";
		default:
			return "Không rõ";
	}
};

const AppointmentDetailModal: React.FC<Props> = ({ appointment, onClose }) => {
	if (!appointment) return null;

	// const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	onUpdateStatus(appointment.id!, e.target.value);
	// };

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h3>Chi tiết lịch hẹn</h3>
				<div className="modal-content">
					<p>
						<strong>Bệnh nhân:</strong> {appointment.patientName}
					</p>
					<p>
						<strong>Bác sĩ:</strong> {appointment.staffName}
					</p>
					<p>
						<strong>Chuyên khoa:</strong> {appointment.specialtyName}
					</p>
					<p>
						<strong>Ngày hẹn:</strong> {appointment.appointmentDate}
					</p>
					<p>
						<strong>Phòng khám:</strong> {appointment.clinicName}
					</p>
					<p>
						<strong>Triệu chứng:</strong> {appointment.symptoms}
					</p>
					<p>
						<strong>Trạng thái:</strong>
					</p>
					{/* <select value={appointment.status}>
						<option value="0">Chờ xác nhận</option>
						<option value="1">Chờ khám</option>
						<option value="2">Đã hoàn thành</option>
					</select> */}
				</div>
				<div className="modal-actions">
					<button onClick={onClose}>Đóng</button>
				</div>
			</div>
		</div>
	);
};

export default AppointmentDetailModal;
