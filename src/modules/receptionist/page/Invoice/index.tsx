import React, { useEffect, useState } from "react";
import { listInvoices, InvoicePayload } from "~/modules/receptionist/services";
import dayjs from "dayjs";
import "./Invoice.scss";

const formatDate = (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm");

const Invoice: React.FC = () => {
	const [invoices, setInvoices] = useState<InvoicePayload[]>([]);
	const [error, setError] = useState<string>("");

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
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Invoice;
