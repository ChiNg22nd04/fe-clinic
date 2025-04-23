// import { useState, useEffect } from "react";
// import { AppointmentPayload } from "~/shared/interfaces";
// import { getAllClinics } from "~/public/services";

// export const useClinics = () => {
// 	const [clinics, setClinics] = useState<AppointmentPayload[]>([]);

// 	useEffect(() => {
// 		const fetchClinics = async () => {
// 			try {
// 				const data = await getAllClinics();
// 				console.log("data", data);
// 				setClinics(data[0] || []);
// 			} catch (error) {
// 				console.error("Lỗi khi lấy danh sách hệ thống:", error);
// 			}
// 		};

// 		fetchClinics();
// 	}, []);

// 	return clinics;
// };

import { useState, useEffect } from "react";
import { ClinicPayload } from "~/shared/interfaces"; // <-- đảm bảo bạn đã import đúng
import { getAllClinics } from "~/public/services";

export const useClinics = () => {
	const [clinics, setClinics] = useState<ClinicPayload[]>([]); // <-- sửa type tại đây

	useEffect(() => {
		const fetchClinics = async () => {
			try {
				const data = await getAllClinics();
				console.log("data", data);
				setClinics(data); // <-- không cần data[0]
			} catch (error) {
				console.error("Lỗi khi lấy danh sách hệ thống:", error);
			}
		};

		fetchClinics();
	}, []);

	return clinics;
};
