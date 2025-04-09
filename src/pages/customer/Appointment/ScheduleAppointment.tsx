import React from "react";
import Header from "../../../components/Header/Header";
import "./ScheduleAppointment.scss";
const ScheduleAppointment: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <div className="container">
                <div className="content-top">
                    <h1 className="text-main">Đăng ký khám bệnh</h1>
                    <ul className="text-sub">
                        Quý khách hàng có nhu cầu đặt hẹn khám tại <span className="text-highlight">Hệ thống Bệnh viện Đa khoa Piedmont</span>, xin vui lòng thực hiện theo hướng dẫn:
                    </ul>
                    <li>
                        Đặt hẹn bằng cách gọi tổng đài Chăm sóc khách hàng tại số <span className="text-highlight">0287 102 6789 – 093 180 6858</span> (Bệnh viện Đa khoa Piedmont TPHCM) hoặc{" "}
                        <span className="text-highlight"> 024 3872 3872 – 024 7106 6858</span> (Bệnh viện Đa khoa Piedmont Hà Nội)
                    </li>
                    <li>Đặt hẹn trực tuyến bằng cách điền thông tin vào mẫu bên dưới.</li>
                    <li>
                        Xin lưu ý, trong các trường hợp khẩn cấp, quý khách vui lòng đến ngay cơ sở y tế gần nhất hoặc đến trực tiếp{" "}
                        <span className="text-highlight">Hệ thống bệnh viện Đa khoa Piedmont</span>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default ScheduleAppointment;
