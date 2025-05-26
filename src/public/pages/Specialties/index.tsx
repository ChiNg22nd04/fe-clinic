import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "~/shared/components/Header";
import Footer from "~/shared/components/Footer";

import { useSpecialties } from "~/shared/hooks/useSpecialties";
import "./Specialties.scss";
import images from "~/assets/images";
import { slugify } from "~/shared/utils/slugify";

const Specialties: React.FC = () => {
	const { specialties: selectedSpecialties, allSpecialties } = useSpecialties(null);
	const navigate = useNavigate();

	const handleSpecialtyClick = (specialtyName: string) => {
		navigate(`/specialties/${slugify(specialtyName)}`);
	};

	return (
		<>
			<Header />
			<div className="specialties">
				<img
					className="specialties-bg"
					src={`http://localhost:8055/assets/${images.specialtiesBaner.filename}`}
					alt={images.professionalBaner.title}
				/>
				<div className="text-center">
					<p className="specialties-text">Danh sách chuyên khoa</p>
				</div>
				<div className="specialties-list">
					<div className="container">
						{allSpecialties.map((item) => {
							const isSelected =
								selectedSpecialties.length === 0 ||
								selectedSpecialties.includes(item.specialtyId);

							if (!isSelected) return null;

							return (
								<div
									key={item.specialtyId}
									className="specialty-item"
									onClick={() => handleSpecialtyClick(item.specialtyName)}
								>
									<div className="specialty-image">
										{item.image?.length > 0 && (
											<img
												className="specialty-item_image"
												src={`http://localhost:8055/assets/${item.image}`}
												alt="Hình ảnh khoa"
											/>
										)}
									</div>
									<h3>{item.specialtyName}</h3>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Specialties;
