import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { listExamination, invoiceCreate } from "~/modules/receptionist/services";
import { ExaminationPayload } from "~/shared/interfaces";

import ExaminationDetailModal from "./ExaminationDetailModal";
import "./ExaminationForm.scss";

dayjs.extend(localizedFormat);

const formatDate = (dateString: string) => {
	return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

const ExaminationForm: React.FC = () => {
	const [error, setError] = useState<string>("");
	const [examinations, setExaminations] = useState<ExaminationPayload[]>([]);
	const [loadingId, setLoadingId] = useState<number | null>(null);
	const [selectedExamination, setSelectedExamination] = useState<ExaminationPayload | null>(null);

	// const fetchAppointments = async () => {
	// 	try {
	// 		const response = await listExamination();
	// 		setExaminations(response);
	// 	} catch (err: any) {
	// 		setError(err.message || "Đã xảy ra lỗi khi lấy lịch hẹn");
	// 	}
	// };

	// useEffect(() => {
	// 	fetchAppointments();
	// }, []);

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

	const handleCreateInvoice = async (examinationFormId: number) => {
		setLoadingId(examinationFormId);
		try {
			await invoiceCreate({ examinationFormId });

			// Cập nhật trạng thái đã tạo hóa đơn tại client
			setExaminations((prev) =>
				prev.map((item) => (item.id === examinationFormId ? { ...item, status: 2 } : item))
			);
		} catch (err: any) {
			setError(err.message || "Không thể tạo hóa đơn");
		} finally {
			setLoadingId(null);
		}
	};

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
						<th>Hành động</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{examinations?.length === 0 ? (
						<tr>
							<td colSpan={8}>Không có dữ liệu</td>
						</tr>
					) : (
						examinations.map((item, index) => (
							<tr key={item.id}>
								<td>{index + 1}</td>
								<td>{item.patientName}</td>
								<td>{formatDate(item.examinationDate)}</td>
								<td>{item.diagnosis}</td>
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
									{item.status === 1 ? (
										<button
											onClick={() => handleCreateInvoice(item.id!)}
											disabled={loadingId === item.id}
											className="btn-create"
										>
											{loadingId === item.id ? "Đang tạo..." : "Tạo hóa đơn"}
										</button>
									) : item.status === 2 ? (
										<span style={{ color: "green", fontWeight: "bold" }}>
											Đã tạo hóa đơn
										</span>
									) : (
										<span style={{ color: "#aaa" }}>Không khả dụng</span>
									)}
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
						))
					)}
				</tbody>
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
