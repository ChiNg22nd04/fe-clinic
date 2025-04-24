import React from "react";
import "./PrescriptionTable.scss";

interface PrescriptionItem {
	id?: number;
	medicineName: string;
	quantity: number;
	price: number;
	usage: string;
}

interface Props {
	data: PrescriptionItem[];
}

const PrescriptionTable: React.FC<Props> = ({ data }) => {
	if (data.length === 0) return null;

	return (
		<div className="prescription-list">
			<h4>Danh sách đơn thuốc</h4>
			<table>
				<thead>
					<tr>
						<th>STT</th>
						<th>Tên thuốc</th>
						<th>Số lượng</th>
						<th>Giá (vnd)</th>
						<th>Cách dùng</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={item.id ?? index}>
							<td>{index + 1}</td>
							<td>{item.medicineName}</td>
							<td>{item.quantity}</td>
							<td>{(item.price * 1000).toLocaleString("vi-VN")}</td>
							<td>{item.usage}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PrescriptionTable;
