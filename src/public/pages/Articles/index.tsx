import React, { useEffect, useState } from "react";
import Header from "~/shared/components/Header";
import { getAllArticles } from "~/public/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_BE } from "~/config";
import { ArticlesPayload } from "~/shared/interfaces";
import ArticleDetail from "./ArticleDetail";
import { slugify } from "~/shared/utils/slugify";

import "./Articles.scss";

const Articles: React.FC = () => {
	const [articles, setArticles] = useState<ArticlesPayload[]>([]);
	const [selectedArticle, setSelectedArticle] = useState<ArticlesPayload | null>(null);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await getAllArticles();
				setArticles(response);
			} catch (err: any) {
				console.error("Lỗi khi fetch bài viết:", err);
			}
		};
		fetchArticles();
	}, []);

	// Handle browser back/forward buttons
	useEffect(() => {
		const handlePopState = () => {
			const path = window.location.pathname;
			if (path === "/articles") {
				setSelectedArticle(null);
			} else {
				// Extract slug from URL
				const slug = path.split("/articles/")[1];
				// Find article by slug
				const article = articles.find((article) => slugify(article.title) === slug);
				if (article) {
					setSelectedArticle(article);
				}
			}
		};

		window.addEventListener("popstate", handlePopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [articles]);

	const handleArticleClick = (article: ArticlesPayload) => {
		setSelectedArticle(article);
		// Update URL with slug
		const slug = slugify(article.title);
		window.history.pushState({}, "", `/articles/${slug}`);
	};

	const handleBackToList = () => {
		setSelectedArticle(null);
		// Reset URL to articles list
		window.history.pushState({}, "", "/articles");
	};

	if (selectedArticle) {
		return (
			<div className="app">
				<Header />
				<ArticleDetail article={selectedArticle} onBack={handleBackToList} />
			</div>
		);
	}

	return (
		<div className="app">
			<Header />
			<div className="articles">
				<div className="text-center">
					<p className="articles-text">Tin Tức</p>
				</div>
				<div className="articles-container">
					<div className="container">
						{articles.map((article) => {
							const firstImage = article.record?.[0];
							return (
								<div
									className="article-card"
									key={article.articleId}
									onClick={() => handleArticleClick(article)}
									style={{ cursor: "pointer" }}
								>
									{firstImage && (
										<img
											className="article-card_img"
											src={`${API_BASE_BE}/assets/${firstImage.directusFilesId}`}
											alt={firstImage.fileTitle || article.title}
										/>
									)}
									<div className="article-content">
										<div
											className="article-title"
											dangerouslySetInnerHTML={{ __html: article.title }}
										/>
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
		</div>
	);
};

export default Articles;
