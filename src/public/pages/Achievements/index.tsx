import React, { useEffect, useState } from "react";
import Header from "~/shared/components/Header";
import { getAllAchievements } from "~/public/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_BE } from "~/config";
import { ArticlesPayload } from "~/shared/interfaces";
import AchievementDetail from "./AchievementDetail";
import { slugify } from "~/shared/utils/slugify";

import "./Achievements.scss";

const Achievements: React.FC = () => {
	const [achievements, setAchievements] = useState<ArticlesPayload[]>([]);
	const [selectedAchievement, setSelectedAchievement] = useState<ArticlesPayload | null>(null);

	useEffect(() => {
		const fetchAchievements = async () => {
			try {
				const response = await getAllAchievements();
				console.log("response", response);
				setAchievements(response);
			} catch (err: any) {
				console.error("Error fetching achievements:", err);
			}
		};
		fetchAchievements();
	}, []);

	// Handle browser back/forward buttons
	useEffect(() => {
		const handlePopState = () => {
			const path = window.location.pathname;
			if (path === "/achievements") {
				setSelectedAchievement(null);
			} else {
				// Extract slug from URL
				const slug = path.split("/achievements/")[1];
				// Find achievement by slug
				const achievement = achievements.find(
					(achievement) => slugify(achievement.title) === slug
				);
				if (achievement) {
					setSelectedAchievement(achievement);
				}
			}
		};

		window.addEventListener("popstate", handlePopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [achievements]);

	const handleAchievementClick = (achievement: ArticlesPayload) => {
		setSelectedAchievement(achievement);
		// Update URL with slug
		const slug = slugify(achievement.title);
		window.history.pushState({}, "", `/achievements/${slug}`);
	};

	const handleBackToList = () => {
		setSelectedAchievement(null);
		// Reset URL to achievements list
		window.history.pushState({}, "", "/achievements");
	};

	if (selectedAchievement) {
		return (
			<div className="app">
				<Header />
				<AchievementDetail achievement={selectedAchievement} onBack={handleBackToList} />
			</div>
		);
	}

	return (
		<div className="app">
			<Header />
			<div className="achievements">
				<div className="text-center">
					<p className="achievements-text">Thành Tựu</p>
				</div>
				<div className="achievements-container">
					<div className="container">
						{achievements.map((achievement) => {
							const firstImage = achievement.record?.[0];
							console.log("firstImage", firstImage?.directusFilesId);
							return (
								<div
									className="achievement-card"
									key={achievement.articleId}
									onClick={() => handleAchievementClick(achievement)}
									style={{ cursor: "pointer" }}
								>
									{firstImage && (
										<img
											className="achievement-card_img"
											src={`${API_BASE_BE}/assets/${firstImage.directusFilesId}`}
											alt={firstImage.fileTitle || achievement.title}
										/>
									)}
									<div className="achievement-content">
										<div
											className="achievement-title"
											dangerouslySetInnerHTML={{ __html: achievement.title }}
										/>
										<div
											style={{ fontStyle: "italic" }}
											className="achievement-content-meta"
											dangerouslySetInnerHTML={{
												__html: achievement.subTitle || "",
											}}
										/>
										<div className="achievement-meta">
											<FontAwesomeIcon
												className="achievement-meta-icon"
												icon={faCalendarDays}
											/>
											<span>
												{achievement.publishedDate
													? new Date(
															achievement.publishedDate
													  ).toLocaleDateString()
													: ""}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Achievements;
