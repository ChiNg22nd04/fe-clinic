import React, { useState } from "react";
import "./Login.scss";
import images from "~/assets/images";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services";

const Login: React.FC = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const payload = { email, password };

		try {
			const response = await login(payload);
			const user = response.user;
			console.log(user);
			localStorage.setItem("user", JSON.stringify(user));

			// Điều hướng theo role
			switch (user.role) {
				case 2:
					navigate("/receptionist");
					break;

				default:
					navigate("/");
					break;
			}
		} catch (error: any) {
			setError(error?.message || "Đăng nhập thất bại.");
		}
	};

	return (
		<div className="login">
			<div className="login__left">
				<div className="form__login">
					<Link className="login__left-logo" to="/">
						<img src={images.logo} alt="Logo" />
					</Link>
					<form onSubmit={handleSubmit}>
						<div className="form-input">
							<div className="form-title">
								<span className="title">Email</span>
								<input
									type="email"
									className="input-style"
									placeholder="Email"
									value={email}
									autoComplete="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-title">
								<span className="title">Password</span>
								<input
									type="password"
									className="input-style"
									placeholder="Password"
									value={password}
									autoComplete="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
						{error && <p className="login__error">{error}</p>}
						<button className="login__btn" type="submit">
							Đăng nhập
						</button>
					</form>
				</div>
			</div>
			<div className="login__right">
				<div
					className="login__right-img"
					style={{
						backgroundImage: `url(${images.loginImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						width: "100%",
						height: "100%",
					}}
				></div>
				<div className="login__right-style"></div>
			</div>
		</div>
	);
};

export default Login;
