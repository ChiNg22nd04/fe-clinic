import React from "react";
import dayjs from "dayjs";
import "./ExaminationForm.scss";

interface ExaminationItem {
	id: number;
	numerical: number;
	medical_record_id: number;
	id_appointment: number;
	staff_id: number;
	diagnosis: string | null;
	note: string | null;
	status: number;
	patient_id: number;
	patient_name: string;
	staff_name: string;
	specialty_id: number;
	specialty_name: string;
	symptoms: string;
	appointment_date: string;
	examination_date: string;
	clinic_id: number;
	clinic_name: string;
}

interface Props {
	examination: ExaminationItem | null;
	onClose: () => void;
}

const getStatusText = (status?: number) => {
	switch (status) {
		case 0:
			return "Chờ khám";
		case 1:
			return "Đã hoàn thành";
		case 2:
			return "Đã đóng";
		default:
			return "Không rõ";
	}
};

const ExaminationDetailModal: React.FC<Props> = ({ examination, onClose }) => {
	if (!examination) return null;

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h3>Chi tiết khám bệnh</h3>
				<div className="modal-content">
					<p>
						<strong>Bệnh nhân:</strong> {examination.patient_name}
					</p>
					<p>
						<strong>Bác sĩ:</strong> {examination.staff_name}
					</p>
					<p>
						<strong>Chuyên khoa:</strong> {examination.specialty_name}
					</p>
					<p>
						<strong>Phòng khám:</strong> {examination.clinic_name}
					</p>
					<p>
						<strong>Ngày hẹn:</strong>{" "}
						{dayjs(examination.appointment_date).format("DD/MM/YYYY HH:mm")}
					</p>
					<p>
						<strong>Ngày khám:</strong>{" "}
						{dayjs(examination.examination_date).format("DD/MM/YYYY HH:mm")}
					</p>
					<p>
						<strong>Triệu chứng:</strong> {examination.symptoms}
					</p>
					<p>
						<strong>Chuẩn đoán:</strong> {examination.diagnosis || "Chưa có"}
					</p>
					<p>
						<strong>Ghi chú:</strong> {examination.note || "Không có"}
					</p>
					<p>
						<strong>Trạng thái:</strong> {getStatusText(examination.status)}
					</p>
				</div>
				<div className="modal-actions">
					<button onClick={onClose}>Đóng</button>
				</div>
			</div>
		</div>
	);
};

export default ExaminationDetailModal;
