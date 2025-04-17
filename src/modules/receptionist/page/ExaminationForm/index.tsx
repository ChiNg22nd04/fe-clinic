import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { listExamination } from "~/modules/receptionist/services";

import "./ExaminationForm.scss";

const formatDate = (dateString: string) => {
	return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

const ExaminationForm: React.FC = () => {
	const [error, setError] = useState<string>("");

	const fetchAppointments = async () => {
		try {
			const response = await listExamination();
			console.log(response.data);
		} catch (err: any) {
			setError(err.message || "Đã xảy ra lỗi khi lấy lịch hẹn");
		}
	};
	useEffect(() => {
		fetchAppointments();
	}, []);
	return <div className="content form-list">List phiếu khám</div>;
};

export default ExaminationForm;
