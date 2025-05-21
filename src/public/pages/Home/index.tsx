import React, { useState, useEffect } from "react";
import "./Home.scss";
import { getIntroduction } from "~/public/services";
import images from "~/assets/images";

import Header from "../../../shared/components/Header";
import Footer from "~/shared/components/Footer";
interface IntroductionSection {
	id: number;
	sub_title: string;
	record: string;
	content: string;
}

// interface BannerData {
// 	filename: string;
// 	title: string;
// }

const Home: React.FC = () => {
	const [introduction, setIntroduction] = useState<IntroductionSection[]>([]);

	const getBannerData = (): { filename: string; title: string } => {
		const { banner } = images.introductionBaner.find((item) => item.banner) ?? {};
		return {
			filename: banner?.filename ?? "",
			title: banner?.title ?? "",
		};
	};

	const getDropdownData = (): { filename: string; title: string }[] => {
		const { dropdown } = images.introductionBaner.find((item) => item.dropdown) ?? {};
		return dropdown ?? [];
	};
	console.log("getDropdownData", getDropdownData());

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

	const bannerData = getBannerData();

	return (
		<>
			<Header />
			<div className="home">
				<img
					src={`http://localhost:8055/assets/${bannerData.filename}`}
					className="home__banner"
					alt={bannerData.title}
				/>

				{introduction.map((section) => (
					<div key={section.id} className="section">
						<div
							className={`container home__section ${
								section.id % 2 === 0 ? "reverse" : ""
							}`}
						>
							<div className="home__section-content">
								<p className="home__section-title">{section.sub_title}</p>
								<p className="home__section-text">{section.content}</p>
							</div>
							<div
								className="home__section-media"
								dangerouslySetInnerHTML={{
									__html: section.record.replace(
										"<video",
										"<video autoplay muted playsinline loop"
									),
								}}
							/>
						</div>
					</div>
				))}

				<div className="home__contact-section">
					{getDropdownData().map((item, idx) => (
						<div
							className="home__contact-col"
							key={item.filename}
							style={{
								backgroundImage: `url(http://localhost:8055/assets/${item.filename})`,
							}}
						></div>
					))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Home;
