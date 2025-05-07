// src/pages/ArticleDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "~/shared/components/Header";
import { getAllArticles } from "~/public/services";
import "./ArticleDetail.scss";

const ArticleDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [article, setArticle] = useState<any>(null);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await getAllArticles();
				const found = response.find(
					(item: any) => item.articleId === parseInt(id || "", 10)
				);
				setArticle(found);
			} catch (err) {
				console.error("Lỗi khi lấy chi tiết bài viết", err);
			}
		};
		fetchArticle();
	}, [id]);

	if (!article) return <div>Đang tải...</div>;

	return (
		<div className="app">
			<Header />
			<div className="article-detail">
				<div
					className="article-title"
					dangerouslySetInnerHTML={{ __html: article.title }}
				/>
				<div className="article-meta">
					{new Date(article.publishedDate).toLocaleDateString()} | {article.author}
				</div>
				<div
					className="article-content"
					dangerouslySetInnerHTML={{ __html: article.content }}
				/>
			</div>
		</div>
	);
};

export default ArticleDetail;
