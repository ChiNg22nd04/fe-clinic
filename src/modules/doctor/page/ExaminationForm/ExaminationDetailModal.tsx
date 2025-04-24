import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import {
	updateExamination,
	updatePrescription,
	detailPrescription,
	getMedicine,
} from "~/modules/doctor/services";
import { ExaminationPayload } from "~/shared/interfaces";
import { compressImage } from "~/utils/compressImage";

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

	const [recordFile, setRecordFile] = useState<File | null>(null);
	const [existingImage, setExistingImage] = useState<string | null>(examination?.image ?? null);

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
			await updateExamination(
				{ id: examination.id, status, diagnosis, note },
				recordFile || undefined
			);
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

	// const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files && e.target.files[0]) {
	// 		const file = e.target.files[0];

	// 		try {
	// 			const compressed = await compressImage(file);
	// 			setRecordFile(compressed);
	// 		} catch (error) {
	// 			console.error("Không thể nén ảnh:", error);
	// 		}
	// 	}
	// };

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];

			try {
				const compressed = await compressImage(file);
				setRecordFile(compressed);
				// Khi upload file mới thì ảnh cũ không hiển thị nữa
				setExistingImage(null);
			} catch (error) {
				console.error("Không thể nén ảnh:", error);
			}
		}
	};

	const handleRemoveExistingImage = () => {
		setExistingImage(null);
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
							<label>
								<strong>File đính kèm (X-quang, siêu âm,...):</strong>
								<input type="file" accept="image/*" onChange={handleFileChange} />

								{/* Ảnh mới vừa chọn */}
								{recordFile && (
									<div className="preview-record">
										<p>
											<strong>Đã chọn:</strong> {recordFile.name}
										</p>
										{recordFile.type.startsWith("image/") && (
											<img
												src={URL.createObjectURL(recordFile)}
												alt="Preview"
												className="record-preview-img"
											/>
										)}
									</div>
								)}

								{/* Ảnh đã lưu trước đó nếu chưa bị xóa hoặc ghi đè */}
								{!recordFile && existingImage && (
									<div className="preview-record">
										<p>
											<strong>Ảnh đã lưu:</strong>
										</p>
										<img
											src={existingImage}
											alt="Examination record"
											className="record-preview-img"
										/>
										<button
											type="button"
											onClick={handleRemoveExistingImage}
											className="btn-delete-img"
										>
											Xóa ảnh
										</button>
									</div>
								)}
							</label>

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
										<button
											className="btn-toggle-prescription"
											onClick={handleAddPrescription}
										>
											Xác nhận thêm
										</button>
									</div>

									{prescriptions.length > 0 && (
										<PrescriptionTable data={prescriptions} />
									)}
								</div>
							)}
						</>
					)}
				</div>

				<div className="modal-actions">
					<button onClick={onClose} className="btn-cancel">
						Hủy
					</button>
					<button onClick={handleUpdate}>Lưu thay đổi</button>
				</div>
			</div>
		</div>
	);
};

export default ExaminationDetailModal;
