import React from "react";
import Header from "~/shared/components/Header";
import { useSpecialties } from "~/shared/hooks/useSpecialties"; // đúng path hook bạn để
import "./Specialties.scss";

const Specialties: React.FC = () => {
	// Giả sử đang không chọn clinic cụ thể
	const { specialties: selectedSpecialties, allSpecialties } = useSpecialties(null);

	return (
		<div className="app">
			<Header />
			<div className="specialties">
				<h1>Chuyên khoa</h1>

				<div className="specialties-list">
					{allSpecialties.map((item) => {
						const isSelected =
							selectedSpecialties.length === 0 ||
							selectedSpecialties.includes(item.specialtyId);

						if (!isSelected) return null;

						return (
							<div key={item.specialtyId} className="specialty-item">
								<h3>{item.specialtyName}</h3>

								{item.introduce?.length > 0 && (
									<>
										<h4>Giới thiệu</h4>
										{item.introduce.map((intro, index) => (
											<div key={index}>
												<strong>{intro.type}:</strong>{" "}
												{Array.isArray(intro.content)
													? intro.content.join(", ")
													: intro.content}
											</div>
										))}
									</>
								)}

								{item.services?.length > 0 && (
									<>
										<h4>Dịch vụ</h4>
										{item.services.map((service, index) => (
											<div key={index}>
												<strong>{service.type}:</strong>{" "}
												{Array.isArray(service.content)
													? service.content.join(", ")
													: service.content}
											</div>
										))}
									</>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Specialties;
