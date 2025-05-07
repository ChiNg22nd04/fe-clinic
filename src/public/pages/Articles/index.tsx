import React, { useState, useEffect } from "react";
import Header from "~/shared/components/Header";
import { getAllArticles } from "~/public/services";
import "./Articles.scss";

const Articles: React.FC = () => {
	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await getAllArticles();
				console.log("Articles", response);
			} catch (err: any) {
				console.log("loi");
			}
		};
		fetchArticles();
	});

	return (
		<div className="app">
			<Header />
			<div className="articles">data Articles</div>
		</div>
	);
};

export default Articles;
