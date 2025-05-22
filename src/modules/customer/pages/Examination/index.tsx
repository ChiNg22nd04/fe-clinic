import React, { useState, useEffect } from "react";
import { useUser } from "~/shared/hooks";
import { getExamination } from "~/modules/customer/services";
import { ExaminationPayload } from "~/shared/interfaces";

import "./Examination.scss";

const Examination: React.FC = () => {
	const [examination, setExamination] = useState<ExaminationPayload[]>([]);
	const patient = useUser();

	useEffect(() => {
		const fetchExamination = async () => {
			if (!patient?.id) return;
			try {
				const response = await getExamination({ patientId: patient.id });
				console.log(response);
				setExamination(response); // bạn có thể xử lý dữ liệu ở đây
			} catch (err: any) {
				console.log(err.message || "Có lỗi xảy ra khi lấy lịch hẹn");
			}
		};

		fetchExamination();
	}, [patient?.id]);
	const renderStatus = (status: number) => {
		switch (status) {
			case 1:
				return "Đã hoàn tất";
			case 2:
				return "Đã đóng";
			default:
				return "Chờ xác nhận";
		}
	};
	return (
		<div className="content">
			{examination.length === 0 ? (
				<p>Không có lịch sử khám bệnh.</p>
			) : (
				<div className="examinations">
					{examination.map((item, index) => (
						<div key={index} className="appointment-card">
							<div className="info">
								<p>
									<strong>Phòng khám:</strong> {item.clinicName || item.clinicId}
								</p>
								<p>
									<strong>Chuyên khoa:</strong> {item.specialtyName}
								</p>
								<p>
									<strong>Bác sĩ:</strong> {item.staffName || "Chưa rõ"}
								</p>
								<p>
									<strong>Ngày khám:</strong>{" "}
									{item.examinationDate
										? new Date(item.examinationDate).toLocaleString()
										: "Không rõ"}
								</p>
								<p>
									<strong>Triệu chứng:</strong> {item.symptoms || "Không có"}
								</p>
								<p className={`status status-${item.status}`}>
									<strong>Trạng thái:</strong> {renderStatus(item.status || 0)}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Examination;
