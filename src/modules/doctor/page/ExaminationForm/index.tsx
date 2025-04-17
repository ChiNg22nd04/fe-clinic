import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { listExamination, ExaminationPayload } from "~/modules/doctor/services";
import ExaminationDetailModal from "./ExaminationDetailModal"; // đảm bảo đúng path import

import "./ExaminationForm.scss";

dayjs.extend(localizedFormat);

const formatDate = (dateString: string) => {
	return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

// interface ExaminationItem {
// 	id: number;
// 	numerical: number;
// 	medical_record_id: number;
// 	id_appointment: number;
// 	staff_id: number;
// 	diagnosis: string | null;
// 	note: string | null;
// 	status: number;
// 	patient_id: number;
// 	patient_name: string;
// 	staff_name: string;
// 	specialty_id: number;
// 	specialty_name: string;
// 	symptoms: string;
// 	appointment_date: string;
// 	examination_date: string;
// 	clinic_id: number;
// 	clinic_name: string;
// }

const ExaminationForm: React.FC = () => {
	const [error, setError] = useState<string>("");
	const [examinations, setExaminations] = useState<ExaminationPayload[]>([]);
	// Thêm import

	// Trong component ExaminationForm
	const [selectedExamination, setSelectedExamination] = useState<ExaminationPayload | null>(null);
	const fetchExamination = async () => {
		try {
			const response = await listExamination();
			console.log("response", response);

			// Nếu response không phải array, set rỗng để tránh lỗi map
			setExaminations(response);
		} catch (err: any) {
			setError(err.message || "Đã xảy ra lỗi khi lấy lịch hẹn");
			setExaminations([]); // fallback để tránh undefined
		}
	};

	useEffect(() => {
		fetchExamination();
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
						<th></th>
					</tr>
				</thead>
				<tbody>
					{examinations.map((item, index) => {
						console.log("🩺 examination item:", item);
						return (
							<tr key={item.id}>
								<td>{item.numerical}</td>
								<td>{item.patientName}</td>
								<td>{formatDate(item.examinationDate)}</td>
								<td>{item.diagnosis || "Chưa có"}</td>
								<td>{item.specialtyName}</td>
								<td>{item.staffName}</td>
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
									<button
										className="action-btn"
										onClick={() => setSelectedExamination(item)}
									>
										Xem chi tiết
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{selectedExamination && (
				<ExaminationDetailModal
					examination={selectedExamination}
					onClose={() => setSelectedExamination(null)}
					onRefresh={fetchExamination}
				/>
			)}
		</div>
	);
};

export default ExaminationForm;
