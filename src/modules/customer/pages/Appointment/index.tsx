import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { useUser, useClinics, useSpecialties, useDoctors, useShiftSchedule } from "~/shared/hooks";
import { scheduleAppointment } from "~/modules/customer/services";
import { AppointmentPayload } from "~/shared/interfaces";

import "./ScheduleAppointment.scss";

interface LocationState {
	clinicId?: number;
	specialtyId?: number;
	staffId?: number;
}

const ScheduleAppointment: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { clinicId, specialtyId, staffId } = (location.state as LocationState) || {};

	const [selectedClinicId, setSelectedClinicId] = useState<number | null>(clinicId || null);
	const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<number | null>(
		specialtyId || null
	);
	const [selectedDoctor, setSelectedDoctor] = useState<number | null>(staffId || null);
	const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);
	const [symptoms, setSymptoms] = useState<string>("");

	// Sử dụng custom hooks
	const patient = useUser();
	const clinics = useClinics();
	const { specialties, allSpecialties } = useSpecialties(selectedClinicId);
	const doctors = useDoctors(selectedClinicId, selectedSpecialtyId);
	const shiftSchedule = useShiftSchedule(selectedClinicId, selectedSpecialtyId, selectedDoctor);

	useEffect(() => {
		if (clinicId) {
			setSelectedClinicId(clinicId);
		}
		if (specialtyId) {
			setSelectedSpecialtyId(specialtyId);
		}
		if (staffId) {
			setSelectedDoctor(staffId);
		}
	}, [clinicId, specialtyId, staffId]);

	const handleClinicChange = async (clinicId: number) => {
		setSelectedClinicId(clinicId);
	};
	const handleSubmit = async () => {
		if (!selectedClinicId || !selectedSpecialtyId || !selectedDoctor || !selectedShiftId) {
			alert("Vui lòng chọn đầy đủ thông tin trước khi đăng ký.");
			return;
		}

		const selectedShift = shiftSchedule.find((shift) => shift.id === selectedShiftId);
		dayjs.extend(utc);
		console.log(selectedShift.start_time);
		const newdate = dayjs.utc(selectedShift.start_time).format("HH:mm:ss");
		console.log(newdate);
		if (!selectedShift) {
			alert("Không tìm thấy ca làm việc được chọn.");
			return;
		}

		const payload: AppointmentPayload = {
			patientId: patient.id,
			staffId: selectedDoctor,
			appointmentDate: dayjs(`${selectedShift.work_date} ${newdate}`).format(
				"YYYY-MM-DD HH:mm:ss"
			),
			symptoms,
			clinicId: selectedClinicId,
			specialtyId: selectedSpecialtyId,
			staffShiftsId: selectedShiftId,
		};

		try {
			await scheduleAppointment(payload);
			alert("Đặt lịch thành công!");
			setSelectedClinicId(null);
			setSelectedSpecialtyId(null);
			setSelectedDoctor(null);
			setSelectedShiftId(null);
			setSymptoms("");
			navigate("/");
		} catch (error: any) {
			alert(error.message || "Đã xảy ra lỗi khi đặt lịch khám.");
		}
	};

	return (
		<div className="container">
			<div className="content-top">
				<h1 className="text-main">Đăng ký khám bệnh</h1>
				<ul className="text-sub">
					Quý khách hàng có nhu cầu đặt hẹn khám tại{" "}
					<span className="text-highlight">Hệ thống Bệnh viện Đa khoa Piedmont</span>, xin
					vui lòng thực hiện theo hướng dẫn:
				</ul>
				<li>
					Đặt hẹn bằng cách gọi tổng đài Chăm sóc khách hàng tại số{" "}
					<span className="text-highlight">0287 102 6789 – 093 180 6858</span> (Bệnh viện
					Đa khoa Piedmont TPHCM) hoặc{" "}
					<span className="text-highlight">024 3872 3872 – 024 7106 6858</span> (Bệnh viện
					Đa khoa Piedmont Hà Nội)
				</li>
				<li>Đặt hẹn trực tuyến bằng cách điền thông tin vào mẫu bên dưới.</li>
				<li>
					Xin lưu ý, trong các trường hợp khẩn cấp, quý khách vui lòng đến ngay cơ sở y tế
					gần nhất hoặc đến trực tiếp{" "}
					<span className="text-highlight">Hệ thống bệnh viện Đa khoa Piedmont</span>
				</li>
			</div>
			<div className="content-bot">
				<h2>Phiếu đăng ký khám bệnh</h2>
				<div className="content-bot_main">
					<div className="clinic-list">
						<h3>Chọn địa điểm khám</h3>
						<div className="clinics-dropdown">
							{clinics.map((item) => (
								<label key={item.clinicId} className="clinic-radio">
									<input
										type="radio"
										name="clinic"
										value={item.clinicId}
										onChange={() => handleClinicChange(item.clinicId)}
										checked={selectedClinicId === item.clinicId}
									/>
									{item.clinicName}
								</label>
							))}
						</div>
					</div>
					<div className="specialty-list">
						<h3>Chọn chuyên khoa</h3>
						<select
							onChange={(e) => {
								const id = Number(e.target.value);
								setSelectedSpecialtyId(id);
							}}
							value={selectedSpecialtyId ?? ""}
						>
							<option value="" disabled>
								-- Chọn chuyên khoa --
							</option>
							{specialties.map((specialty_id) => {
								const specialty = allSpecialties.find(
									(s) => s.specialtyId === specialty_id
								);
								return (
									<option key={specialty_id} value={specialty_id}>
										{specialty
											? specialty.specialtyName
											: `Chuyên khoa #${specialty_id}`}
									</option>
								);
							})}
						</select>
					</div>
					<div className="doctor-list">
						<h3>Chọn bác sĩ</h3>
						<select
							onChange={(e) => {
								const id = Number(e.target.value);
								setSelectedDoctor(id);
							}}
							value={selectedDoctor ?? ""}
						>
							<option value="" disabled>
								-- Chọn bác sĩ --
							</option>
							{doctors.map((doc) => (
								<option key={doc.staffId} value={doc.staffId}>
									{doc.fullName}
								</option>
							))}
						</select>
					</div>
					<div className="shift-schedule">
						<h3>Chọn lịch làm việc của bác sĩ</h3>
						{shiftSchedule.length > 0 && (
							<div className="shifts-radio">
								{shiftSchedule.map((shift) => (
									<label
										key={shift.id}
										className={`shift-option ${
											shift.status === 2 ? "disabled" : ""
										}`}
									>
										<input
											type="radio"
											name="shift"
											value={shift.id}
											checked={selectedShiftId === shift.id}
											onChange={() => setSelectedShiftId(shift.id)}
											disabled={shift.status === 2}
										/>
										Ngày: {shift.work_date} - Ca: {shift.shift_name}{" "}
										{shift.status === 2 && "(Đã kín lịch)"}
									</label>
								))}
							</div>
						)}
					</div>
					<div className="symptoms-input">
						<h3>Nhập triệu chứng</h3>
						<input
							type="text"
							placeholder="Nhập triệu chứng (ví dụ: đau đầu, sốt...)"
							value={symptoms}
							onChange={(e) => setSymptoms(e.target.value)}
						/>
					</div>

					<div className="submit-button">
						<button onClick={handleSubmit}>Đặt lịch khám</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScheduleAppointment;
