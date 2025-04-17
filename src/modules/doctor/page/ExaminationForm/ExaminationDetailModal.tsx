import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
	updateExamination,
	ExaminationPayload,
	updatePrescription,
	detailPrescription,
	detailExamination, // Import the detailExamination function
} from "~/modules/doctor/services";
import axios from "axios";
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

	const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
	const [medicineId, setMedicineId] = useState<number>(1);
	const [quantity, setQuantity] = useState<number>(1);
	const [usage, setUsage] = useState<string>("");

	const [prescriptions, setPrescriptions] = useState<any[]>([]);
	const [examinationDetails, setExaminationDetails] = useState<any>(null); // State to store the fetched examination details

	// useEffect(() => {
	// 	// Ensure that the effect runs only when examination.id exists
	// 	if (examination?.id) {
	// 		console.log(examination);
	// 		const fetchPrescription = async () => {
	// 			try {
	// 				const res = await detailPrescription({ examinationFormId: examination.id! });
	// 				setPrescriptions(res.data || []); // đảm bảo an toàn
	// 			} catch (error) {
	// 				console.error("Lỗi khi lấy đơn thuốc:", error);
	// 			}
	// 		};

	// 		fetchPrescription();
	// 	}
	// }, [examination?.id]); // Dependency is only examination.id to fetch prescriptions when it changes

	const handleUpdate = async () => {
		try {
			await updateExamination({
				id: examination?.id as number,
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

	const handleAddPrescription = async () => {
		if (!medicineId || !quantity || !usage) {
			alert("Vui lòng nhập đầy đủ thông tin đơn thuốc.");
			return;
		}

		try {
			await updatePrescription({
				id: examination?.id as number,
				medicineId,
				quantity,
				usage,
			});
			alert("Thêm đơn thuốc thành công!");
			setShowPrescriptionForm(false);

			// Call `detailExamination` after adding the prescription to update the examination details
			// const newExaminationDetails = await detailExamination();
			// setExaminationDetails(newExaminationDetails);
		} catch (error: any) {
			console.error("Thêm đơn thuốc thất bại:", error);
			alert("Thêm đơn thuốc thất bại. Vui lòng thử lại.");
		}
	};

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h3>Chi tiết khám bệnh</h3>
				<div className="modal-content">
					<p>
						<strong>Bệnh nhân:</strong> {examination?.patientName}
					</p>
					<p>
						<strong>Bác sĩ:</strong> {examination?.staffName}
					</p>
					<p>
						<strong>Chuyên khoa:</strong> {examination?.specialtyName}
					</p>
					<p>
						<strong>Phòng khám:</strong> {examination?.clinicName}
					</p>
					<p>
						<strong>Ngày hẹn:</strong>{" "}
						{dayjs(examination?.appointmentDate).format("DD/MM/YYYY HH:mm")}
					</p>
					<p>
						<strong>Ngày khám:</strong>{" "}
						{dayjs(examination?.examinationDate).format("DD/MM/YYYY HH:mm")}
					</p>

					<label>
						<strong>Triệu chứng:</strong>
						<div>{examination?.symptoms}</div>
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

					{status === 1 && (
						<>
							<button
								className="add-prescription-btn"
								onClick={() => setShowPrescriptionForm(!showPrescriptionForm)}
							>
								{showPrescriptionForm ? "Ẩn đơn thuốc" : "Thêm đơn thuốc"}
							</button>

							{showPrescriptionForm && (
								<div className="prescription-form">
									<h4>Thêm đơn thuốc</h4>
									<label>
										<strong>ID thuốc:</strong>
										<input
											type="number"
											value={medicineId}
											onChange={(e) => setMedicineId(Number(e.target.value))}
										/>
									</label>
									<label>
										<strong>Số lượng:</strong>
										<input
											type="number"
											value={quantity}
											onChange={(e) => setQuantity(Number(e.target.value))}
										/>
									</label>
									<label>
										<strong>Cách dùng:</strong>
										<input
											type="text"
											value={usage}
											onChange={(e) => setUsage(e.target.value)}
											placeholder="Ví dụ: Uống sau khi ăn"
										/>
									</label>
									<button onClick={handleAddPrescription}>Xác nhận thêm</button>
								</div>
							)}
						</>
					)}

					{/* Display the updated examination details (including prescriptions) */}
					{examinationDetails && (
						<div className="examination-details">
							<h4>Thông tin khám bệnh cập nhật</h4>
							{/* Render the updated details from examinationDetails */}
							<div>
								<strong>Đơn thuốc:</strong>
								{examinationDetails.prescriptions &&
								examinationDetails.prescriptions.length > 0 ? (
									<ul>
										{examinationDetails.prescriptions.map(
											(prescription: any, index: number) => (
												<li key={index}>
													Thuốc: {prescription.medicineName}, Số lượng:{" "}
													{prescription.quantity}
												</li>
											)
										)}
									</ul>
								) : (
									<p>Không có đơn thuốc nào.</p>
								)}
							</div>
						</div>
					)}
				</div>

				<div className="modal-actions">
					<button onClick={handleUpdate}>Lưu thay đổi</button>
				</div>
			</div>
		</div>
	);
};

export default ExaminationDetailModal;
