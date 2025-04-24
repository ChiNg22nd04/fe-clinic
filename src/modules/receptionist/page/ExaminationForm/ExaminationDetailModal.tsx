import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { detailPrescription } from "~/modules/receptionist/services";
import { ExaminationPayload } from "~/shared/interfaces";
import logo from "~/assets/images/logo.app.svg";

import "./ExaminationForm.scss";

interface Props {
	examination: ExaminationPayload | null;
	onClose: () => void;
	onRefresh?: () => void;
}

const ExaminationDetailModal: React.FC<Props> = ({ examination, onClose }) => {
	const [prescriptions, setPrescriptions] = useState<any[]>([]);
	const [existingImages, setExistingImages] = useState<string[]>([]);

	let phoneList: { type: string; text: string }[] = [];

	try {
		phoneList = examination?.phoneNumber ? JSON.parse(examination.phoneNumber) : [];
	} catch (e) {
		console.error("Lỗi parse phoneNumber:", e);
	}

	useEffect(() => {
		if (examination?.image) {
			try {
				const parsedImages =
					typeof examination.image === "string"
						? JSON.parse(examination.image)
						: examination.image;
				setExistingImages(Array.isArray(parsedImages) ? parsedImages : []);
			} catch (e) {
				console.error("Error parsing image data", e);
				setExistingImages([]);
			}
		}
	}, [examination?.image]);

	const fetchPrescriptions = useCallback(async () => {
		if (!examination?.id) return;
		try {
			const res = await detailPrescription({ examinationFormId: examination.id });
			setPrescriptions(res.data ?? []);
		} catch (err) {
			console.error("Lỗi khi lấy đơn thuốc:", err);
		}
	}, [examination?.id]);

	useEffect(() => {
		if (examination?.id) {
			fetchPrescriptions();
		}
	}, [examination?.id]);

	return (
		<div className="modal-overlay">
			<div className="modal examination-detail-modal">
				<div className="modal-content">
					<div className="examination-header">
						<div className="examination-left">
							<img src={logo} alt="Logo" />
						</div>
						<div className="examination-right">
							<p>
								<strong>{examination?.clinicName}</strong>
							</p>
							<p>{examination?.address}</p>
							<p>{examination?.emailAddress}</p>
							<p>
								{phoneList.map((phone, idx) => (
									<span key={idx}>
										{phone.text}
										{idx < phoneList.length - 1 && " - "}
									</span>
								))}
							</p>
						</div>
					</div>
					<div className="examination-header_sub">
						<p>
							<strong>ID:</strong>
							{examination?.id}
						</p>
						<p>
							TP Hồ Chí Minh,
							{dayjs(examination?.examinationDate).format("HH:mm DD/MM/YYYY")}
						</p>
					</div>
					<h3>Phiếu khám bệnh</h3>

					<section className="examination-info">
						<p>
							<strong>Chuyên khoa:</strong> {examination?.specialtyName}
						</p>
						<p>
							<strong>Bệnh nhân:</strong> {examination?.patientName}
						</p>
						<p>
							<strong>Bác sĩ:</strong> {examination?.staffName}
						</p>
						<p>
							<strong>Ngày hẹn:</strong>{" "}
							{dayjs(examination?.appointmentDate).format("DD/MM/YYYY HH:mm")}
						</p>
						<p>
							<strong>Triệu chứng:</strong> {examination?.symptoms ?? "Không"}
						</p>
						<p>
							<strong>Chuẩn đoán:</strong> {examination?.diagnosis ?? "Không"}
						</p>
						<p>
							<strong>Ghi chú:</strong> {examination?.note ?? "Không"}
						</p>
						<p>
							<strong>Trạng thái:</strong> {examination?.status}
						</p>
					</section>

					<section className="prescription-section">
						<h3>Đơn thuốc</h3>
						{prescriptions.length > 0 ? (
							<table className="prescription-table">
								<thead>
									<tr>
										<th>STT</th>
										<th>Tên thuốc</th>
										<th>Số lượng</th>
										<th>Cách dùng</th>
									</tr>
								</thead>
								<tbody>
									{prescriptions.map((item, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{item?.medicineName ?? "Không rõ"}</td>
											<td>{item?.quantity ?? "-"}</td>
											<td>{item?.usage ?? "-"}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>Không có đơn thuốc.</p>
						)}
					</section>

					<div className="modal-actions">
						<button className="btn btn-close" onClick={onClose}>
							Đóng
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExaminationDetailModal;
