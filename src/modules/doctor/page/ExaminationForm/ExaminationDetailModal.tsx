import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import {
	updateExamination,
	updatePrescription,
	detailPrescription,
	getMedicine,
	ExaminationPayload,
} from "~/modules/doctor/services";
import PrescriptionTable from "~/modules/doctor/page/PrescriptionTable";

import "./ExaminationForm.scss";

interface Props {
	examination: ExaminationPayload | null;
	onClose: () => void;
	onRefresh?: () => void;
}

const ExaminationDetailModal: React.FC<Props> = ({ examination, onClose, onRefresh }) => {
	const [status, setStatus] = useState<number>(examination?.status ?? 0);
	const [diagnosis, setDiagnosis] = useState<string>(examination?.diagnosis ?? "");
	const [note, setNote] = useState<string>(examination?.note ?? "");

	const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
	const [medicineId, setMedicineId] = useState<number>(0);
	const [quantity, setQuantity] = useState<number>(1);
	const [usage, setUsage] = useState<string>("");

	const [prescriptions, setPrescriptions] = useState<any[]>([]);
	const [medicineList, setMedicineList] = useState<any[]>([]);

	useEffect(() => {
		getMedicine()
			.then((res) => setMedicineList(res.data ?? []))
			.catch((err) => console.error("Lỗi lấy danh sách thuốc:", err));
	}, []);

	const fetchPrescriptions = useCallback(async () => {
		if (!examination?.id) return;
		try {
			const res = await detailPrescription({ examinationFormId: examination.id });
			setPrescriptions(res.data ?? []);
		} catch (err) {
			console.error("Lỗi khi lấy đơn thuốc:", err);
		}
	}, [examination?.id]);

	const handleUpdate = async () => {
		if (!examination?.id) return;
		try {
			await updateExamination({ id: examination.id, status, diagnosis, note });
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
				id: examination?.id!,
				medicineId,
				quantity,
				usage,
			});
			alert("Thêm đơn thuốc thành công!");
			await fetchPrescriptions();
		} catch (error: any) {
			console.error("Thêm đơn thuốc thất bại:", error);
			alert("Thêm đơn thuốc thất bại. Vui lòng thử lại.");
		}
	};

	const togglePrescriptionForm = async () => {
		const newState = !showPrescriptionForm;
		setShowPrescriptionForm(newState);
		if (newState) await fetchPrescriptions();
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
						<div>{examination?.symptoms ?? "Không có"}</div>
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
								className="btn-toggle-prescription"
								onClick={togglePrescriptionForm}
							>
								{showPrescriptionForm ? "Ẩn đơn thuốc" : "Thêm đơn thuốc"}
							</button>

							{showPrescriptionForm && (
								<div className="prescription-section">
									<h4>Thêm đơn thuốc</h4>
									<div className="prescription-form">
										<label>
											<strong>Thuốc:</strong>
											<select
												value={medicineId}
												onChange={(e) =>
													setMedicineId(Number(e.target.value))
												}
											>
												<option value={0}>-- Chọn thuốc --</option>
												{medicineList.map((med) => (
													<option key={med.id} value={med.id}>
														{med.name}
													</option>
												))}
											</select>
										</label>
										<label>
											<strong>Số lượng:</strong>
											<input
												type="number"
												min={1}
												value={quantity}
												onChange={(e) =>
													setQuantity(Number(e.target.value))
												}
											/>
										</label>
										<label>
											<strong>Cách dùng:</strong>
											<input
												type="text"
												value={usage}
												onChange={(e) => setUsage(e.target.value)}
												placeholder="VD: Uống sau khi ăn"
											/>
										</label>
										<button onClick={handleAddPrescription}>
											Xác nhận thêm
										</button>
									</div>

									{/* {prescriptions.length > 0 && (
										<div className="prescription-list">
											<h4>Danh sách đơn thuốc</h4>
											<table>
												<thead>
													<tr>
														<th>STT</th>
														<th>Tên thuốc</th>
														<th>Số lượng</th>
														<th>Giá (đ)</th>
														<th>Cách dùng</th>
													</tr>
												</thead>
												<tbody>
													{prescriptions.map((item, index) => (
														<tr key={item.id ?? index}>
															<td>{index + 1}</td>
															<td>{item.medicine_name}</td>
															<td>{item.quantity}</td>
															<td>
																{item.price?.toLocaleString(
																	"vi-VN"
																)}
															</td>
															<td>{item.usage}</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									)} */}
									{prescriptions.length > 0 && (
										<PrescriptionTable data={prescriptions} />
									)}
								</div>
							)}
						</>
					)}
				</div>

				<div className="modal-actions">
					<button onClick={handleUpdate}>Lưu thay đổi</button>
					<button onClick={onClose} className="btn-cancel">
						Hủy
					</button>
				</div>
			</div>
		</div>
	);
};

export default ExaminationDetailModal;
