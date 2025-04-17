import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { listExamination } from "~/modules/doctor/services";
import ExaminationDetailModal from "./ExaminationDetailModal"; // đảm bảo đúng path import

import "./ExaminationForm.scss";

dayjs.extend(localizedFormat);

const formatDate = (dateString: string) => {
	return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

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

const ExaminationForm: React.FC = () => {
	const [error, setError] = useState<string>("");
	const [examinations, setExaminations] = useState<ExaminationItem[]>([]);
	// Thêm import

	// Trong component ExaminationForm
	const [selectedExamination, setSelectedExamination] = useState<ExaminationItem | null>(null);

	const fetchAppointments = async () => {
		try {
			const response = await listExamination();
			setExaminations(response.data);
		} catch (err: any) {
			setError(err.message || "Đã xảy ra lỗi khi lấy lịch hẹn");
		}
	};

	useEffect(() => {
		fetchAppointments();
	}, []);

	if (error) return <div className="content">Lỗi: {error}</div>;

	return (
		<div className="content form-list">
			<table className="examination-table">
				<thead>
					<tr>
						<th>STT</th>
						<th>Bệnh nhân</th>
						<th>Ngày khám</th>
						<th>Chuẩn đoán</th>
						<th>Chuyên khoa</th>
						<th>Bác sĩ</th>
						<th>Trạng thái</th>
					</tr>
				</thead>
				<tbody>
					{examinations.length === 0 ? (
						<tr>
							<td colSpan={8}>Không có dữ liệu</td>
						</tr>
					) : (
						examinations.map((item, index) => (
							<tr key={item.id}>
								<td>{index + 1}</td>
								<td>{item.patient_name}</td>
								<td>{formatDate(item.examination_date)}</td>
								<td>{item.diagnosis}</td>
								<td>{item.specialty_name}</td>
								<td>{item.staff_name}</td>
								<td>
									<span className={`status-pill status-${item.status}`}>
										{item.status === 0
											? "Chờ khám"
											: item.status === 1
											? "Đã khám"
											: "Đã đóng"}
									</span>
								</td>
								<td>
									<button onClick={() => setSelectedExamination(item)}>
										Xem chi tiết
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{selectedExamination && (
				<ExaminationDetailModal
					examination={selectedExamination}
					onClose={() => setSelectedExamination(null)}
				/>
			)}
		</div>
	);
};

export default ExaminationForm;
