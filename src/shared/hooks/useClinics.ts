import { useState, useEffect } from "react";
import { AppointmentPayload } from "~/shared/interfaces";
import { getAllClinics } from "~/public/services";

export const useClinics = () => {
	const [clinics, setClinics] = useState<AppointmentPayload[]>([]);

	useEffect(() => {
		const fetchClinics = async () => {
			try {
				const data = await getAllClinics();
				setClinics(data[0] || []);
			} catch (error) {
				console.error("Lỗi khi lấy danh sách hệ thống:", error);
			}
		};

		fetchClinics();
	}, []);

	return clinics;
};
