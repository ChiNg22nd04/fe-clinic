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

	// Change recordFile to store an array of files
	const [recordFiles, setRecordFiles] = useState<File[]>([]);
	const [existingImages, setExistingImages] = useState<string[]>([]);

	useEffect(() => {
		if (examination?.image) {
			// Check if the image data is a string, and parse it to an array if necessary
			try {
				const parsedImages =
					typeof examination.image === "string"
						? JSON.parse(examination.image) // Parse if it's a JSON string
						: examination.image; // Otherwise assume it's already an array

				if (Array.isArray(parsedImages)) {
					setExistingImages(parsedImages);
				} else {
					setExistingImages([]); // If it's not an array, set an empty array
				}
			} catch (e) {
				console.error("Error parsing image data", e);
				setExistingImages([]); // Default to empty array in case of error
			}
		}
	}, [examination?.image]);

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
			// Create FormData for files
			const formData = new FormData();
			if (recordFiles.length > 0) {
				recordFiles.forEach((file) => {
					formData.append("record", file);
				});
			}

			// Prepare the rest of the payload
			const payload = {
				id: examination.id,
				diagnosis,
				note,
				status,
			};

			// Send the FormData along with the payload
			const response = await updateExamination(payload, formData);

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

	// Handle multiple file selection
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			const compressedFiles = await Promise.all(
				files.map(async (file) => {
					try {
						// Kiểm tra xem file có phải là ảnh không
						if (!file.type.startsWith("image/")) {
							throw new Error("Tệp phải là ảnh");
						}

						// Nén ảnh
						return await compressImage(file);
					} catch (error) {
						console.error("Không thể nén ảnh:", error);
						// Trả về file gốc nếu có lỗi
						return file;
					}
				})
			);
			setRecordFiles((prevFiles) => [...prevFiles, ...compressedFiles]);

			// Thêm ảnh mới vào existingImages
			setExistingImages((prevImages) => [
				...(prevImages || []),
				...compressedFiles.map((file) => URL.createObjectURL(file)),
			]);
		}
	};

	const handleRemoveExistingImage = (index: number) => {
		const updatedImages = existingImages.filter((_, i) => i !== index);
		setExistingImages(updatedImages);
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
								<div className="file-input-with-preview">
									{/* Form input file */}
									<input
										type="file"
										name="record"
										multiple
										accept="image/*"
										onChange={handleFileChange}
									/>

									{/* Hiển thị ảnh đã có (existingImages) */}
									{existingImages.length > 0 && (
										<div className="preview-records">
											{existingImages.map((image, index) => (
												<div key={index} className="preview-record">
													<p>
														<strong>Ảnh đã có:</strong> {image}
													</p>
													<img
														src={image}
														alt="Preview"
														className="record-preview-img"
													/>
													<button
														className="remove-image-btn"
														onClick={() =>
															handleRemoveExistingImage(index)
														}
													>
														Xóa
													</button>
												</div>
											))}
										</div>
									)}

									{/* Hiển thị ảnh mới đã chọn (recordFiles) */}
									{recordFiles.length > 0 && (
										<div className="preview-records">
											{recordFiles.map((file, index) => (
												<div key={index} className="preview-record">
													<p>
														<strong>Đã chọn:</strong> {file.name}
													</p>
													<img
														src={URL.createObjectURL(file)}
														alt="Preview"
														className="record-preview-img"
													/>
												</div>
											))}
										</div>
									)}
								</div>
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
											Thêm đơn thuốc
										</button>
									</div>
								</div>
							)}
						</>
					)}

					<div className="buttons">
						<button className="btn" onClick={handleUpdate}>
							Cập nhật
						</button>
						<button className="btn" onClick={onClose}>
							Đóng
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExaminationDetailModal;
