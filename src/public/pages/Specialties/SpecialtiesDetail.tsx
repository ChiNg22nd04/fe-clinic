import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "~/shared/components/Header";
import { getAllSpecialties } from "~/public/services";
import { SpecialtyPayload } from "~/shared/interfaces";
import { slugify } from "~/shared/utils/slugify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faVial } from "@fortawesome/free-solid-svg-icons";

import "./Specialties.scss";

const SpecialtiesDetail: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const [specialty, setSpecialty] = useState<SpecialtyPayload | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSpecialty = async () => {
			try {
				const specialties = await getAllSpecialties();
				const foundSpecialty = specialties.find((s) => slugify(s.specialtyName) === slug);
				if (foundSpecialty) {
					setSpecialty(foundSpecialty);
				} else {
					navigate("/specialties");
				}
			} catch (error) {
				console.error("Error fetching specialty:", error);
				navigate("/specialties");
			} finally {
				setLoading(false);
			}
		};

		fetchSpecialty();
	}, [slug, navigate]);

	if (loading) {
		return (
			<div className="app">
				<Header />
				<div className="loading">Loading...</div>
			</div>
		);
	}

	if (!specialty) {
		return null;
	}

	return (
		<div className="app">
			<Header />
			<div className="specialty-detail">
				<div className="container">
					<div className="specialty-title">{specialty.specialtyName}</div>
					<div className="specialty-content">
						{specialty.introduce && specialty.introduce.length > 0 && (
							<div className="section">
								<h2>
									<FontAwesomeIcon
										style={{ paddingRight: "10px" }}
										icon={faHospital}
										className="introduce-icon"
									/>
									Giới thiệu
								</h2>
								<div className="section-content">
									{specialty.introduce.map((item, index) => (
										<p key={index}>{item.content}</p>
									))}
								</div>
							</div>
						)}

						{specialty.services && specialty.services.length > 0 && (
							<div className="section">
								<h2>
									<FontAwesomeIcon
										icon={faVial}
										style={{ paddingRight: "10px" }}
									/>
									Dịch vụ
								</h2>
								<div className="section-content">
									<ul>
										{specialty.services.map((service, index) => (
											<li key={index}>{service.content}</li>
										))}
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SpecialtiesDetail;
