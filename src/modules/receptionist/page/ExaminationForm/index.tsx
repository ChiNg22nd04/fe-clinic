import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "./ExaminationForm.scss";

const formatDate = (dateString: string) => {
	return dayjs(dateString).format("DD/MM/YYYY HH:mm");
};

const ExaminationForm: React.FC = () => {
	return <div className="content form-list">List phiếu khám</div>;
};

export default ExaminationForm;
