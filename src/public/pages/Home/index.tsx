import React from "react";
import Header from "../../../shared/components/Header";
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./Home.scss";
const Home: React.FC = () => {
	return (
		<div className="app">
			<Header />
			<div className="home">Trang chủ</div>
		</div>
	);
};

export default Home;
