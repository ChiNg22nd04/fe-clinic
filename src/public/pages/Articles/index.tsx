import React, { useEffect, useState } from "react";
import Header from "~/shared/components/Header";
import { getAllArticles } from "~/public/services";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { API_BASE_BE } from "~/config";
import { ArticlesPayload } from "~/shared/interfaces";

import "./Articles.scss";

const Articles: React.FC = () => {
	const [articles, setArticles] = useState<ArticlesPayload[]>([]);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await getAllArticles();
				console.log("response", response);
				console.log("response[0].record", response[0].record);
				setArticles(response);
			} catch (err: any) {
				console.error("Lỗi khi fetch bài viết:", err);
			}
		};
		fetchArticles();
	}, []);

	return (
		<div className="app">
			<Header />
			<div className="articles">
				<div className="text-center">
					<p className="articles-text">Tin Tức</p>
				</div>
				<div className="container articles-container">
					{articles.map((article) => {
						const firstImage = article.record?.[0]; // lấy ảnh đầu tiên nếu có
						return (
							<div className="article-card" key={article.articleId}>
								{firstImage && (
									<img
										className="article-card_img"
										src={`${API_BASE_BE}/assets/${firstImage.directusFilesId}`}
										alt={firstImage.fileTitle || article.title}
									/>
								)}
								<div className="article-content">
									<Link
										to={`/articles/${article.articleId}`}
										className="article-link"
									>
										<div
											className="article-title"
											dangerouslySetInnerHTML={{ __html: article.title }}
										/>
									</Link>
									<div
										style={{ fontStyle: "italic" }}
										className="article-content-meta"
										dangerouslySetInnerHTML={{
											__html: article.subTitle || "",
										}}
									/>
									<div className="article-meta">
										<FontAwesomeIcon
											className="article-meta-icon"
											icon={faCalendarDays}
										/>
										<span>
											{article.publishedDate
												? new Date(
														article.publishedDate
												  ).toLocaleDateString()
												: ""}
										</span>
									</div>
									<div className="article-tag">
										<span>#{article.topicName}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Articles;
