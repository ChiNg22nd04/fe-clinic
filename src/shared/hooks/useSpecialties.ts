import { useState, useEffect } from "react";
import { getAllSpecialties, getSpecialtiesByIDClinic } from "~/public/services";
import { SpecialtyClinicMap, Specialty } from "~/shared/interfaces";

export const useSpecialties = (clinicId: number | null) => {
	const [specialties, setSpecialties] = useState<number[]>([]);
	const [allSpecialties, setAllSpecialties] = useState<Specialty[]>([]);

	useEffect(() => {
		const fetchAllSpecialties = async () => {
			try {
				const data = await getAllSpecialties();
				setAllSpecialties(data[0] || []);
			} catch (error) {
				console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
			}
		};

		fetchAllSpecialties();
	}, []);

	useEffect(() => {
		const fetchSpecialtiesByClinic = async () => {
			if (clinicId) {
				try {
					const response = await getSpecialtiesByIDClinic(clinicId);
					if (Array.isArray(response)) {
						const specialtyIds = response.map(
							(item: SpecialtyClinicMap) => item.specialty_id
						);
						setSpecialties(specialtyIds);
					} else {
						console.warn("Dữ liệu chuyên khoa không hợp lệ:", response);
						setSpecialties([]);
					}
				} catch (error) {
					console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
				}
			}
		};

		fetchSpecialtiesByClinic();
	}, [clinicId]);

	return { specialties, allSpecialties };
};
