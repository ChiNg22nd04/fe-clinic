import React, { useEffect, useState } from "react";
import { useUser } from "~/shared/hooks";
import { ShiftsPayload, getShift } from "~/modules/receptionist/services";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import "./Shifts.scss";

dayjs.extend(utc);
dayjs.extend(timezone);
const vnTime = (time: string) => dayjs.utc(time).format("HH:mm");

const Shifts: React.FC = () => {
	const [shifts, setShifts] = useState<ShiftsPayload[]>([]);
	const [error, setError] = useState<string>("");
	const user = useUser();

	const fetchShifts = async () => {
		try {
			const data = await getShift({ staffId: user.id });
			console.log(data);

			setShifts(data);
		} catch (err: any) {
			setError(err.message || "Lỗi khi lấy lịch làm việc");
		}
	};

	useEffect(() => {
		if (user?.id) {
			fetchShifts();
		}
	}, [user?.id]);

	return (
		<div className="shifts-container">
			<h2 className="title">📅 Lịch làm việc của bạn</h2>
			{error && <p className="error">{error}</p>}
			{shifts.length === 0 ? (
				<p>Không có lịch làm việc</p>
			) : (
				<div className="shifts-grid">
					{shifts.map((shift) => {
						console.log("shift object:", shift);
						return (
							<div key={shift.staffShiftsId} className="shift-card">
								<h3 className="shift-name">{shift.shiftName}</h3>
								<p className="shift-time">
									🕗 {vnTime(shift.startTime)} - {vnTime(shift.endTime)}
								</p>

								<p className="shift-date">
									📌 {dayjs(shift.workDate).format("dddd, DD/MM/YYYY")}
								</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Shifts;
