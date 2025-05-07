import React from "react";
import Header from "~/shared/components/Header";
import { useSpecialties } from "~/shared/hooks/useSpecialties";
import "./Specialties.scss";
import { ContentItem, SubContentItem } from "~/shared/interfaces/";
import { API_BASE_BE } from "~/config";
import images from "~/assets/images";

const Specialties: React.FC = () => {
	// Giả sử đang không chọn clinic cụ thể
	const { specialties: selectedSpecialties, allSpecialties } = useSpecialties(null);

	return (
		<div className="app">
			<Header />
			<div className="specialties">
				<img className="specialties-bg" src={images.specialtyBg} alt="Logo" />
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
								{item.image?.length > 0 && (
									<img
										className="specialty-item_image"
										src={`http://localhost:8055/assets/${item.image}`}
										alt="Hình ảnh khoa"
									/>
								)}

								{item.introduce?.length > 0 && (
									<>
										<h4>Giới thiệu</h4>
										{item.introduce.map((intro: ContentItem, index: number) => (
											<div key={index} className="introduce-item">
												<strong>{intro.type}:</strong>

												{/* Render content nếu có */}
												{typeof intro.content === "string" && (
													<p>{intro.content}</p>
												)}
												{Array.isArray(intro.content) &&
													intro.content.map((c, i) => <p key={i}>{c}</p>)}

												{/* Render items nếu có */}
												{intro.items &&
													Array.isArray(intro.items) &&
													intro.items.length > 0 && (
														<ul>
															{intro.items.map((itm, idx) => (
																<li key={idx}>
																	<strong>{itm.type}:</strong>{" "}
																	{Array.isArray(itm.content)
																		? itm.content.join(", ")
																		: itm.content}
																</li>
															))}
														</ul>
													)}
											</div>
										))}
									</>
								)}

								{item.services?.length > 0 && (
									<>
										<h4>Dịch vụ</h4>
										{item.services.map(
											(service: ContentItem, index: number) => (
												<div key={index} className="service-item">
													<strong>{service.type}:</strong>{" "}
													{Array.isArray(service.content)
														? service.content.join(", ")
														: service.content}
												</div>
											)
										)}
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
