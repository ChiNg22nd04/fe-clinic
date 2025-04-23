import { useState, useEffect } from "react";
import { getAllSpecialtiesDoctor } from "~/public/services";
import { ProfileStaffPayload } from "~/shared/interfaces";

export const useDoctors = (clinicId: number | null, specialtyId: number | null) => {
	const [doctors, setDoctors] = useState<ProfileStaffPayload[]>([]);

	useEffect(() => {
		const fetchDoctors = async () => {
			if (clinicId && specialtyId) {
				try {
					const data = await getAllSpecialtiesDoctor(clinicId, specialtyId);
					setDoctors(data);
				} catch (error) {
					console.error("Lỗi khi lấy danh sách bác sĩ:", error);
				}
			}
		};

		fetchDoctors();
	}, [clinicId, specialtyId]);

	return doctors;
};
