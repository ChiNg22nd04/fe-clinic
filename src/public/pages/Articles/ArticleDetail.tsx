// src/pages/ArticleDetail.tsx

import React from "react";
import { ArticlesPayload } from "~/shared/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_BE } from "~/config";
import "./Articles.scss";

interface ArticleDetailProps {
	article: ArticlesPayload;
	onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
	return (
		<div className="article-detail ">
			<div className="container">
				<div className="article-detail-header">
					<p
						className="article-detail-title"
						dangerouslySetInnerHTML={{ __html: article.title || "" }}
					/>
					<div
						style={{ fontStyle: "italic" }}
						className="article-content-meta"
						dangerouslySetInnerHTML={{
							__html: article.subTitle || "",
						}}
					/>
					<div className="article-detail-meta">
						<div className="meta-item">
							<FontAwesomeIcon icon={faCalendarDays} />
							<span>
								{article.publishedDate
									? new Date(article.publishedDate).toLocaleDateString()
									: ""}
							</span>
						</div>
						<div className="meta-item border-circle">
							<FontAwesomeIcon icon={faUser} />
							<span>{article.author || ""}</span>
						</div>
					</div>
				</div>
				<div className="article-detail-content">
					{article.record && article.record.length > 0 && (
						<div className="article-detail-images">
							{article.record.map((image, index) => (
								<div key={index} className="article-detail-image">
									<img
										src={`${API_BASE_BE}/assets/${image.directusFilesId}`}
										alt={image.fileTitle || article.title}
										width={image.width}
										height={image.height}
									/>
								</div>
							))}
						</div>
					)}
					<div
						className="article-detail-text"
						dangerouslySetInnerHTML={{ __html: article.content || "" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default ArticleDetail;
