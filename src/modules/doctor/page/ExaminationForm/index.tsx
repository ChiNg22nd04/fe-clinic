import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { listExamination } from "~/modules/doctor/services";
import { ExaminationPayload } from "~/shared/interfaces";

import ExaminationDetailModal from "./ExaminationDetailModal";
import "./ExaminationForm.scss";

dayjs.extend(localizedFormat);

// Helper: Format ngày khám
const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm");

// Helper: Hiển thị trạng thái
const getStatusLabel = (status?: number) => {
	switch (status) {
		case 0:
			return "Chờ khám";
		case 1:
			return "Đã khám";
		case 2:
			return "Đã đóng";
		default:
			return "Không rõ";
	}
};

const ExaminationForm: React.FC = () => {
	const [error, setError] = useState("");
	const [examinations, setExaminations] = useState<ExaminationPayload[]>([]);
	const [selectedExamination, setSelectedExamination] = useState<ExaminationPayload | null>(null);

	const fetchExaminations = async () => {
		try {
			const response = await listExamination();
			setExaminations(Array.isArray(response) ? response : []);
		} catch (err: any) {
			setError(err.message || "Đã xảy ra lỗi khi lấy lịch hẹn");
			setExaminations([]);
		}
	};

	useEffect(() => {
		fetchExaminations();
	}, []);

	if (error) {
		return <div className="content">Lỗi: {error}</div>;
	}

	const renderTableRows = () =>
		examinations.map((exam, index) => (
			<tr key={exam.id}>
				<td>{exam.numerical}</td>
				<td>{exam.patientName}</td>
				<td>{formatDate(exam.examinationDate)}</td>
				<td>{exam.diagnosis || "Chưa có"}</td>
				<td>{exam.specialtyName}</td>
				<td>{exam.staffName}</td>
				<td>
					<span className={`status-pill status-${exam.status}`}>
						{getStatusLabel(exam.status)}
					</span>
				</td>
				<td>
					<button className="action-btn" onClick={() => setSelectedExamination(exam)}>
						Xem chi tiết
					</button>
				</td>
			</tr>
		));

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
				<tbody>{renderTableRows()}</tbody>
			</table>

			{selectedExamination && (
				<ExaminationDetailModal
					examination={selectedExamination}
					onClose={() => setSelectedExamination(null)}
					onRefresh={fetchExaminations}
				/>
			)}
		</div>
	);
};

export default ExaminationForm;
