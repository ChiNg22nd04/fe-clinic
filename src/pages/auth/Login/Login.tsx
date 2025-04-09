import React from "react";
import "./Login.scss";
import record from "../../../assets/images/record-login.jpg";
import logo from "../../../assets/images/logo.app.svg";

import { Link } from "react-router-dom";

const Login: React.FC = () => {
    return (
        <div className="login">
            <div className="login__left">
                <Link className="login__left-logo" to="/">
                    <img src={logo} alt="Logo" />
                </Link>
                <div className="form-input">
                    <input placeholder="Email" />
                    <input placeholder="Password" />
                </div>
                <div>Đăng nhập</div>
            </div>
            <div className="login__right">
                <div className="login__right-img" style={{ backgroundImage: `url(${record})` }}></div>
                <div className="login__right-style"></div>
            </div>
        </div>
    );
};

export default Login;
