import { useState, useEffect } from "react";
import { getAllShiftDoctor } from "~/services/commonServices";

export const useShiftSchedule = (
	clinicId: number | null,
	specialtyId: number | null,
	doctorId: number | null
) => {
	const [shiftSchedule, setShiftSchedule] = useState<any[]>([]);

	useEffect(() => {
		const fetchShiftSchedule = async () => {
			if (clinicId && specialtyId && doctorId) {
				try {
					const shifts = await getAllShiftDoctor(doctorId, specialtyId, clinicId);
					setShiftSchedule(shifts);
				} catch (error) {
					console.error("Lỗi khi lấy lịch làm việc:", error);
				}
			}
		};

		fetchShiftSchedule();
	}, [clinicId, specialtyId, doctorId]);

	return shiftSchedule;
};
