import React, { useState } from "react";
import dayjs from "dayjs";
import { updateExamination, ExaminationPayload } from "~/modules/doctor/services";
import "./ExaminationForm.scss";

interface Props {
	examination: ExaminationPayload | null;
	onClose: () => void;
	onRefresh?: () => void;
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

const ExaminationDetailModal: React.FC<Props> = ({ examination, onClose, onRefresh }) => {
	const [status, setStatus] = useState<number>(examination?.status ?? 0);
	const [diagnosis, setDiagnosis] = useState<string>(examination?.diagnosis || "");
	const [note, setNote] = useState<string>(examination?.note || "");

	if (!examination) return null;

	const handleUpdate = async () => {
		try {
			await updateExamination({
				id: examination.id as number,
				status,
				diagnosis,
				note,
			});

			alert("Cập nhật phiếu khám thành công!");
			onClose();
			onRefresh?.();
		} catch (error: any) {
			alert("Lỗi khi cập nhật: " + (error.message || "Vui lòng thử lại sau."));
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h3>Chi tiết khám bệnh</h3>
				<div className="modal-content">
					<p>
						<strong>Bệnh nhân:</strong> {examination.patientName}
					</p>
					<p>
						<strong>Bác sĩ:</strong> {examination.staffName}
					</p>
					<p>
						<strong>Chuyên khoa:</strong> {examination.specialtyName}
					</p>
					<p>
						<strong>Phòng khám:</strong> {examination.clinicName}
					</p>
					<p>
						<strong>Ngày hẹn:</strong>{" "}
						{dayjs(examination.appointmentDate).format("DD/MM/YYYY HH:mm")}
					</p>
					<p>
						<strong>Ngày khám:</strong>{" "}
						{dayjs(examination.examinationDate).format("DD/MM/YYYY HH:mm")}
					</p>

					<label>
						<strong>Triệu chứng:</strong>
						<div>{examination.symptoms}</div>
					</label>

					<label>
						<strong>Chuẩn đoán:</strong>
						<input
							type="text"
							value={diagnosis}
							onChange={(e) => setDiagnosis(e.target.value)}
							placeholder="Nhập chuẩn đoán"
						/>
					</label>

					<label>
						<strong>Ghi chú:</strong>
						<textarea
							value={note}
							onChange={(e) => setNote(e.target.value)}
							placeholder="Ghi chú thêm"
						/>
					</label>

					<label>
						<strong>Trạng thái:</strong>
						<select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
							<option value={0}>Chờ khám</option>
							<option value={1}>Đã hoàn thành</option>
							<option value={2}>Đã đóng</option>
						</select>
					</label>
				</div>

				<div className="modal-actions">
					<button onClick={handleUpdate}>Lưu thay đổi</button>
				</div>
			</div>
		</div>
	);
};

export default ExaminationDetailModal;
