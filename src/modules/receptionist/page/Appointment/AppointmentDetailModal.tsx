import React from "react";
import { updateAppointment } from "~/modules/receptionist/services";
import { AppointmentPayload } from "~/shared/interfaces";

import "./Appointment.scss";

interface Props {
	appointment: AppointmentPayload | null;
	onClose: () => void;
	onRefresh?: () => void; // callback để reload lại danh sách nếu cần
}

// const getStatusText = (status?: string | number) => {
// 	switch (status) {
// 		case 0:
// 			return "Chờ xác nhận";
// 		case 1:
// 			return "Chờ khám";
// 		case 2:
// 			return "Đã hoàn thành";
// 		default:
// 			return "Không rõ";
// 	}
// };

const AppointmentDetailModal: React.FC<Props> = ({ appointment, onClose, onRefresh }) => {
	if (!appointment) return null;

	// const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	onUpdateStatus(appointment.id!, e.target.value);
	// };
	const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = Number(e.target.value);

		try {
			if (!appointment?.id) return;

			await updateAppointment({ id: appointment.id, status: newStatus });

			alert("Cập nhật trạng thái thành công!");
			onClose();
			onRefresh?.(); // gọi lại hàm reload danh sách nếu có
		} catch (error: any) {
			alert("Lỗi khi cập nhật trạng thái: " + (error.message || "Vui lòng thử lại"));
		}
	};

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
						<select value={appointment.status} onChange={handleStatusChange}>
							<option value={0}>Chờ xác nhận</option>
							<option value={1}>Chờ khám</option>
							<option value={2}>Đã hoàn thành</option>
						</select>
					</p>
				</div>
				<div className="modal-actions">
					<button onClick={onClose}>Lưu thay đổi</button>
				</div>
			</div>
		</div>
	);
};

export default AppointmentDetailModal;
