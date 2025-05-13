import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "~/shared/components/Header";
import { getAllDoctor } from "~/public/services";
import { DoctorPayload } from "~/shared/interfaces";
import "./Professional.scss";

const DoctorDetail: React.FC = () => {
	const location = useLocation();
	const [doctor, setDoctor] = useState<DoctorPayload | null>(null);

	useEffect(() => {
		const fetchDoctorDetails = async () => {
			try {
				const doctors = await getAllDoctor();
				const doctorId = location.state?.doctorId;
				const foundDoctor = doctors.find((d) => d.staffId === doctorId);
				if (foundDoctor) {
					setDoctor(foundDoctor);
				}
			} catch (error) {
				console.error("Error fetching doctor details:", error);
			}
		};

		if (location.state?.doctorId) {
			fetchDoctorDetails();
		}
	}, [location.state?.doctorId]);

	if (!doctor) {
		return (
			<div className="app">
				<Header />
				<div className="container">
					<div className="loading">Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="app">
			<Header />
			<div className="container">
				<div className="doctor-detail">
					<div className="doctor-header">
						<img
							src={`http://localhost:8055/assets/${doctor.thumbnail}`}
							className="doctor-avatar"
							alt={doctor.fullName}
						/>
						<div className="doctor-info">
							<h1 className="doctor-name">{doctor.fullName}</h1>
							<div className="doctor-title">
								<span>Chuyên khoa: </span>
								{doctor.specialtyName}
							</div>
							<div className="doctor-hospital">{doctor.clinicName}</div>
						</div>
					</div>
					<div className="doctor-content">
						<div className="doctor-section">
							<h2>Thông tin chuyên môn</h2>
							<div className="doctor-desc">
								{doctor?.department || ""} - {doctor.yearsOfExperience} năm kinh
								nghiệm - {doctor.education}
							</div>
						</div>
						{doctor.introduce && (
							<div className="doctor-section">
								<h2>Giới thiệu</h2>
								<div
									className="doctor-intro"
									dangerouslySetInnerHTML={{ __html: doctor.introduce }}
								/>
							</div>
						)}
						{doctor.member && (
							<div className="doctor-section">
								<h2>Thành viên</h2>
								<div
									className="doctor-member"
									dangerouslySetInnerHTML={{ __html: doctor.member }}
								/>
							</div>
						)}
						{doctor.expert && (
							<div className="doctor-section">
								<h2>Chuyên môn</h2>
								<div
									className="doctor-expert"
									dangerouslySetInnerHTML={{ __html: doctor.expert }}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDetail;
