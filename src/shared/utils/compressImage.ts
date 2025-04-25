// utils/compressImage.ts
import imageCompression from "browser-image-compression";

/**
 * Nén file ảnh (trả về File đã nén)
 * @param file Ảnh gốc
 * @param maxSizeMB Dung lượng tối đa sau khi nén (mặc định 1MB)
 * @param maxWidthOrHeight Kích thước tối đa (mặc định 800px)
 * @returns File ảnh đã nén
 */
export const compressImage = async (
	file: File,
	maxSizeMB = 1,
	maxWidthOrHeight = 800
): Promise<File> => {
	const options = {
		maxSizeMB,
		maxWidthOrHeight,
		useWebWorker: true,
	};

	try {
		const compressedFile = await imageCompression(file, options);
		return compressedFile;
	} catch (error) {
		console.error("Lỗi khi nén ảnh:", error);
		throw error;
	}
};
