export const slugify = (text: string): string => {
	// Remove HTML tags
	const withoutHtml = text.replace(/<[^>]*>/g, "");

	return withoutHtml
		.toString()
		.toLowerCase()
		.normalize("NFD") // Tách các ký tự có dấu thành ký tự không dấu và dấu
		.replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
		.replace(/[đĐ]/g, "d") // Chuyển đổi đ/Đ thành d
		.replace(/[^a-z0-9\s-]/g, "") // Chỉ giữ lại chữ cái, số, khoảng trắng và dấu gạch ngang
		.replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
		.replace(/-+/g, "-") // Xóa các dấu gạch ngang liên tiếp
		.replace(/^-+/, "") // Xóa dấu gạch ngang ở đầu
		.replace(/-+$/, "") // Xóa dấu gạch ngang ở cuối
		.substring(0, 100); // Giới hạn độ dài slug
};
