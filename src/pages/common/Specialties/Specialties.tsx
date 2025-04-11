import React, { useEffect, useState } from "react";
import Header from "~/components/Header/Header";
import { getAllSpecialties } from "~/services/commonServices";

interface SpecialtyItem {
    specialty_id: number;
    specialty_name: string;
    introduce: string;
    services: string;
}

const Specialties: React.FC = () => {
    const [specialties, setSpecialties] = useState<SpecialtyItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const data = await getAllSpecialties();
                setSpecialties(data[0] || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
            }
        };

        fetchSpecialties();
    }, []);

    return (
        <div className="app">
            <Header />
            <h1>Chuyên khoa</h1>

            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="specialties-list">
                {specialties.map((item) => {
                    let introduces = [];
                    let services = [];

                    try {
                        introduces = JSON.parse(item.introduce);
                    } catch (e) {
                        console.warn("Lỗi parse introduce:", e);
                    }

                    try {
                        services = JSON.parse(item.services);
                    } catch (e) {
                        console.warn("Lỗi parse services:", e);
                    }

                    return (
                        <div key={item.specialty_id} className="specialty-item">
                            <h3>{item.specialty_name}</h3>

                            <h4>Giới thiệu</h4>
                            {introduces.map((intro: any, index: number) => (
                                <div key={index}>
                                    <strong>{intro.type}:</strong> {Array.isArray(intro.content) ? intro.content.join(", ") : intro.content}
                                </div>
                            ))}

                            <h4>Dịch vụ</h4>
                            {services.map((service: any, index: number) => (
                                <div key={index}>
                                    <strong>{service.type}:</strong> {Array.isArray(service.content) ? service.content.join(", ") : service.content}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Specialties;
