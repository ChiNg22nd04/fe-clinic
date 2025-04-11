import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import "./ScheduleAppointment.scss";

import { getAllClinics, getAllSpecialties, getSpecialtiesByIDClinic } from "~/services/commonServices";

interface Appointment {
    clinic_id: number;
    clinic_name: string;
    specialty_id: number;
    specialty_name: string;
}

interface Specialty {
    specialty_id: number;
    specialty_name: string;
}

interface SpecialtyClinicMap {
    clinic_id: number;
    specialty_id: number;
}

const ScheduleAppointment: React.FC = () => {
    const [clinics, setClinics] = useState<Appointment[]>([]);
    const [specialties, setSpecialties] = useState<number[]>([]);
    const [allSpecialties, setAllSpecialties] = useState<Specialty[]>([]);
    const [selectedClinicId, setSelectedClinicId] = useState<number | null>(null);

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                const data = await getAllClinics();
                setClinics(data[0] || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hệ thống:", error);
            }
        };

        const fetchAllSpecialties = async () => {
            try {
                const data = await getAllSpecialties();
                setAllSpecialties(data[0] || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
            }
        };

        fetchClinic();
        fetchAllSpecialties();
    }, []);

    const handleClinicChange = async (clinicId: number) => {
        setSelectedClinicId(clinicId);
        try {
            const response = await getSpecialtiesByIDClinic(clinicId);

            if (Array.isArray(response)) {
                const specialtyIds = response.map((item: SpecialtyClinicMap) => item.specialty_id);
                setSpecialties(specialtyIds);
            } else {
                console.warn("Dữ liệu chuyên khoa không hợp lệ:", response);
                setSpecialties([]);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
        }
    };

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
                <div className="content-bot">
                    <h2>Phiếu đăng ký khám bệnh</h2>
                    <p>Chọn địa điểm khám</p>
                    {clinics.map((item) => (
                        <label key={item.clinic_id} className="clinic-radio">
                            <input type="radio" name="clinic" value={item.clinic_id} onChange={() => handleClinicChange(item.clinic_id)} checked={selectedClinicId === item.clinic_id} />
                            {item.clinic_name}
                        </label>
                    ))}

                    {selectedClinicId && (
                        <>
                            <p>Chọn chuyên khoa</p>
                            {specialties.map((specialty_id) => {
                                const specialty = allSpecialties.find((s) => s.specialty_id === specialty_id);
                                return (
                                    <option key={specialty_id} value={specialty_id}>
                                        {specialty ? specialty.specialty_name : `Chuyên khoa #${specialty_id}`}
                                    </option>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScheduleAppointment;
