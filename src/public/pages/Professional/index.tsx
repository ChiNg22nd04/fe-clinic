import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "~/shared/components/Header";
import { getAllDoctor } from "~/public/services";
import "./Professional.scss";
import { DoctorPayload } from "~/shared/interfaces";

const Professional: React.FC = () => {
	const [doctors, setDoctors] = useState<DoctorPayload[]>([]);
	const navigate = useNavigate();

	const banner = "EC7DEC37-CEA3-4BD5-B587-428E16A9918F.jpg";
	const title = "Banner Chuyen Gia Bac Si Desk.jpg";
	useEffect(() => {
		const fetchData = async () => {
			try {
				const doctors = await getAllDoctor();
				console.log("doctors", doctors);
				setDoctors(doctors);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const handleViewDetail = (doctorId: number) => {
		navigate(`/professional/${doctorId}`);
	};

	return (
		<div className="app">
			<Header />
			<div className="professional">
				<img
					src={`http://localhost:8055/assets/${banner}`}
					className="professional-banner"
					alt={title}
				/>
				<div className="professional-list container">
					{doctors.map((doctor) => (
						<div className="professional-card" key={doctor.staffId}>
							<img
								src={`http://localhost:8055/assets/${doctor.thumbnail}`}
								className="professional-avatar"
								alt={doctor.fullName}
							/>
							<div className="professional-info">
								<h3 className="professional-name">{doctor.fullName}</h3>
								<div className="professional-title">
									<span>Chuyên khoa: </span>
									{doctor.specialtyName}
								</div>
								<div className="professional-hospital">{doctor.clinicName}</div>
								<div className="professional-desc">
									{doctor?.department || ""} - {doctor.yearsOfExperience} năm kinh
									nghiệm - {doctor.education}
								</div>
								{doctor.introduce && (
									<>
										<div
											className="professional-intro"
											dangerouslySetInnerHTML={{ __html: doctor.introduce }}
										/>
									</>
								)}
								<div className="professional-actions">
									<button className="btn btn-primary">ĐẶT LỊCH HẸN</button>
									<button
										className="btn btn-outline"
										onClick={() => handleViewDetail(doctor.staffId)}
									>
										XEM CHI TIẾT
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Professional;
