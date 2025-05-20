import React from "react";
import Header from "~/shared/components/Header";
import { ArticlesPayload } from "~/shared/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_BE } from "~/config";
import "./Achievements.scss";

interface AchievementDetailProps {
	achievement: ArticlesPayload;
	onBack: () => void;
}

const AchievementDetail: React.FC<AchievementDetailProps> = ({ achievement, onBack }) => {
	return (
		<div className="achievement-detail">
			<div className="container">
				<div className="achievement-detail-header">
					<p
						className="achievement-detail-title"
						dangerouslySetInnerHTML={{ __html: achievement.title || "" }}
					/>
					<div
						style={{ fontStyle: "italic" }}
						className="achievement-content-meta"
						dangerouslySetInnerHTML={{
							__html: achievement.subTitle || "",
						}}
					/>
					<div className="achievement-detail-meta">
						<div className="meta-item">
							<FontAwesomeIcon icon={faCalendarDays} />
							<span>
								{achievement.publishedDate
									? new Date(achievement.publishedDate).toLocaleDateString()
									: ""}
							</span>
						</div>
						<div className="meta-item border-circle">
							<FontAwesomeIcon icon={faUser} />
							<span>{achievement.author || ""}</span>
						</div>
					</div>
				</div>
				<div className="achievement-detail-content">
					{achievement.record && achievement.record.length > 0 && (
						<div className="achievement-detail-images">
							{achievement.record.map((image, index) => (
								<div key={index} className="achievement-detail-image">
									<img
										src={`${API_BASE_BE}/assets/${image.directusFilesId}`}
										alt={image.fileTitle || achievement.title}
										width={image.width}
										height={image.height}
									/>
								</div>
							))}
						</div>
					)}
					<div
						className="achievement-detail-text"
						dangerouslySetInnerHTML={{ __html: achievement.content || "" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default AchievementDetail;
