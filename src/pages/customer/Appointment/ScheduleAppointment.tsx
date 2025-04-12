import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Header from "~/components/Header/Header";

import { useUser, useClinics, useSpecialties, useDoctors, useShiftSchedule } from "~/hooks";
import { scheduleAppointment, AppointmentPayload } from "~/services/customerServices";

import "./ScheduleAppointment.scss";

const ScheduleAppointment: React.FC = () => {
	const navigate = useNavigate();

	const [selectedClinicId, setSelectedClinicId] = useState<number | null>(null);
	const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<number | null>(null);
	const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
	const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);
	const [symptoms, setSymptoms] = useState<string>("");

	// Sử dụng custom hooks
	const patient = useUser();
	const clinics = useClinics();
	const { specialties, allSpecialties } = useSpecialties(selectedClinicId);
	const doctors = useDoctors(selectedClinicId, selectedSpecialtyId);
	const shiftSchedule = useShiftSchedule(selectedClinicId, selectedSpecialtyId, selectedDoctor);

	const user = useUser();
	const handleClinicChange = async (clinicId: number) => {
		setSelectedClinicId(clinicId);
	};
	const handleSubmit = async () => {
		if (!selectedClinicId || !selectedSpecialtyId || !selectedDoctor || !selectedShiftId) {
			alert("Vui lòng chọn đầy đủ thông tin trước khi đăng ký.");
			return;
		}

		const selectedShift = shiftSchedule.find((shift) => shift.shift_id === selectedShiftId);
		dayjs.extend(utc);
		const newdate = dayjs.utc(selectedShift.start_time).format("HH:mm:ss");

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
			shiftId: selectedShiftId,
		};

		try {
			await scheduleAppointment(payload);
			alert("Đặt lịch thành công!");
			setSelectedClinicId(null);
			setSelectedSpecialtyId(null);
			setSelectedDoctor(null);
			setSelectedShiftId(null);
			setSymptoms("");
			navigate("/home");
		} catch (error: any) {
			alert(error.message || "Đã xảy ra lỗi khi đặt lịch khám.");
		}
	};

	return (
		<div className="app">
			<Header />
			<div className="container">
				<div className="content-top">
					<h1 className="text-main">Đăng ký khám bệnh</h1>
					<ul className="text-sub">
						Quý khách hàng có nhu cầu đặt hẹn khám tại{" "}
						<span className="text-highlight">Hệ thống Bệnh viện Đa khoa Piedmont</span>,
						xin vui lòng thực hiện theo hướng dẫn:
					</ul>
					<li>
						Đặt hẹn bằng cách gọi tổng đài Chăm sóc khách hàng tại số{" "}
						<span className="text-highlight">0287 102 6789 – 093 180 6858</span> (Bệnh
						viện Đa khoa Piedmont TPHCM) hoặc{" "}
						<span className="text-highlight">024 3872 3872 – 024 7106 6858</span> (Bệnh
						viện Đa khoa Piedmont Hà Nội)
					</li>
					<li>Đặt hẹn trực tuyến bằng cách điền thông tin vào mẫu bên dưới.</li>
					<li>
						Xin lưu ý, trong các trường hợp khẩn cấp, quý khách vui lòng đến ngay cơ sở
						y tế gần nhất hoặc đến trực tiếp{" "}
						<span className="text-highlight">Hệ thống bệnh viện Đa khoa Piedmont</span>
					</li>
				</div>
				<div className="content-bot">
					<h2>Phiếu đăng ký khám bệnh</h2>
					<div className="clinic-list">
						<h3>Chọn địa điểm khám</h3>
						<div className="clinics-dropdown">
							{clinics.map((item) => (
								<label key={item.clinic_id} className="clinic-radio">
									<input
										type="radio"
										name="clinic"
										value={item.clinic_id}
										onChange={() => handleClinicChange(item.clinic_id)}
										checked={selectedClinicId === item.clinic_id}
									/>
									{item.clinic_name}
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
									(s) => s.specialty_id === specialty_id
								);
								return (
									<option key={specialty_id} value={specialty_id}>
										{specialty
											? specialty.specialty_name
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
								<option key={doc.staff_id} value={doc.staff_id}>
									{doc.full_name}
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
										key={shift.shift_id}
										className={`shift-option ${
											shift.status === 2 ? "disabled" : ""
										}`}
									>
										<input
											type="radio"
											name="shift"
											value={shift.shift_id}
											checked={selectedShiftId === shift.shift_id}
											onChange={() => setSelectedShiftId(shift.shift_id)}
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
