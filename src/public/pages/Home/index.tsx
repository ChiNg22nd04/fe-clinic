import React, { useState, useEffect } from "react";
import Header from "../../../shared/components/Header";
import "./Home.scss";
import { getIntroduction } from "~/public/services";

interface IntroductionSection {
	id: number;
	sub_title: string;
	record: string;
	content: string;
}

const Home: React.FC = () => {
	const [introduction, setIntroduction] = useState<IntroductionSection[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getIntroduction();
				console.log("data", data[0]);
				setIntroduction(data[0]); // Access the first array element which contains the sections
			} catch (error) {
				console.log("error", error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="app">
			<Header />
			<div className="home">
				{introduction.map((section) => (
					<div key={section.id} className="home__section">
						<div className="home__section-content">
							<h3 className="home__section-title">{section.sub_title}</h3>
							<p className="home__section-text">{section.content}</p>
						</div>
						<div
							className="home__section-media"
							dangerouslySetInnerHTML={{ __html: section.record }}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
