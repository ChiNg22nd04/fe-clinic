import React, { useEffect, useState } from "react";
import { listInvoices, InvoicePayload } from "~/modules/receptionist/services";
import { createPayment } from "~/shared/services/paymentService";

import dayjs from "dayjs";
import "./Invoice.scss";

const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm");
const getStatusText = (status: number) => {
	switch (status) {
		case 0:
			return "Đang chờ";
		case 1:
			return "Hoàn tất";
		case 2:
			return "Thất bại";
		default:
			return "Không xác định";
	}
};

const getMethodText = (method: number) => {
	switch (method) {
		case 0:
			return "Tiền mặt";
		case 1:
			return "Thẻ";
		case 2:
			return "Chuyển khoản";
		case 3:
			return "Khác";
		default:
			return "Không xác định";
	}
};

const Invoice: React.FC = () => {
	const [invoices, setInvoices] = useState<InvoicePayload[]>([]);
	const [error, setError] = useState<string>("");

	const handlePayment = async (amount: number) => {
		try {
			const res = await createPayment(amount); // Ví dụ: 100000 = 100,000 VND
			if (res.paymentUrl) {
				window.location.href = res.paymentUrl;
			}
		} catch (error) {
			console.error("Thanh toán lỗi:", error);
		}
	};

	const fetchInvoices = async () => {
		try {
			const data = await listInvoices();
			console.log(data);
			setInvoices(data);
		} catch (err: any) {
			setError(err.message || "Lỗi khi lấy hóa đơn");
		}
	};

	useEffect(() => {
		fetchInvoices();
	}, []);

	if (error) return <div className="content">Lỗi: {error}</div>;

	return (
		<div className="content invoice-list">
			<table className="invoice-table">
				<thead>
					<tr>
						<th>STT</th>
						<th>Bệnh nhân</th>
						<th>Mã phiếu khám</th>
						<th>Tổng tiền</th>
						<th>Ngày tạo</th>
						<th>Trạng thái</th>
						<th>PTTT</th>
						<th>Thanh toán</th>
					</tr>
				</thead>
				<tbody>
					{invoices.length === 0 ? (
						<tr>
							<td colSpan={4}>Không có hóa đơn</td>
						</tr>
					) : (
						invoices.map((invoice, index) => (
							<tr key={invoice.id}>
								<td>{index + 1}</td>
								<td>{invoice.patientName}</td>
								<td>{invoice.examinationFormId}</td>
								<td>{(invoice.totalAmount * 1000).toLocaleString("vi-VN")}</td>
								<td>{formatDate(invoice.createdAt)}</td>
								<td>{getStatusText(invoice.paymentStatus)}</td>
								<td>{getMethodText(invoice.paymentMethod)}</td>
								<td>
									<button
										onClick={() => handlePayment(invoice.totalAmount * 1000)}
									>
										Thanh toán
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Invoice;
