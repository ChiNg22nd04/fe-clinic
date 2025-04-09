import React, { useState } from "react";
import "./Login.scss";
import record from "../../../assets/images/record-login.jpg";
import logo from "../../../assets/images/logo.app.svg";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setError("");
            const result = await login({ email, password });
            console.log("Login success:", result);

            // Redirect sau khi login thành công
            navigate("/");
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="login">
            <div className="login__left">
                <div className="form__login">
                    <Link className="login__left-logo" to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                    <div className="form-input">
                        <div className="form-title">
                            <span className="title">Email</span>
                            <input type="email" className="input-style" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-title">
                            <span className="title">Password</span>
                            <input type="password" className="input-style" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    {error && <div className="login__error">{error}</div>}
                    <button className="login__btn" onClick={handleLogin}>
                        Đăng nhập
                    </button>
                </div>
            </div>
            <div className="login__right">
                <div
                    className="login__right-img"
                    style={{
                        backgroundImage: `url(${record})`,
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
