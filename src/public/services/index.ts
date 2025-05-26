import axiosInstance from "~/Axios/axiosInstance";
import { API_ENDPOINTS } from "~/config";
import {
	SpecialtyPayload,
	StaffShiftsPayload,
	ClinicPayload,
	ProfileStaffPayload,
	ArticlesPayload,
	ArticlesFiles,
	DoctorPayload,
} from "~/shared/interfaces";

export const getAllSpecialties = async (params?: Partial<SpecialtyPayload>) => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.common.specialties);
		const result = response.data.data[0];

		if (!Array.isArray(result)) {
			throw new Error("❌ Dữ liệu trả về không phải mảng chuyên khoa.");
		}

		const data = result.map((item: any): SpecialtyPayload => {
			let introduceParsed: any[] = [];
			let servicesParsed: any[] = [];

			// ✅ Check nếu đã là object hoặc array thì không cần parse
			if (Array.isArray(item.introduce)) {
				introduceParsed = item.introduce;
			} else if (typeof item.introduce === "string") {
				try {
					introduceParsed = JSON.parse(item.introduce);
				} catch (e) {
					console.warn("⚠️ Lỗi parse introduce:", item.introduce);
				}
			}

			if (Array.isArray(item.services)) {
				servicesParsed = item.services;
			} else if (typeof item.services === "string") {
				try {
					servicesParsed = JSON.parse(item.services);
				} catch (e) {
					console.warn("⚠️ Lỗi parse services:", item.services);
				}
			}

			return {
				image: item.image,
				specialtyId: item.specialty_id,
				specialtyName: item.specialty_name,
				introduce: introduceParsed,
				services: servicesParsed,
			};
		});

		console.log("✅ Data chuyên khoa đã convert:", data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getAllClinics = async () => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.common.clinics);
		const dataRes = response.data.data[0];
		console.log("dataRes", dataRes);
		const clinics: ClinicPayload[] = dataRes.map((clinic: any) => {
			return {
				clinicId: clinic.clinic_id,
				clinicName: clinic.clinic_name,
			};
		});

		console.log(clinics);
		return clinics;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getSpecialtiesByIDClinic = async (clinicId: number) => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.common.specialtiesClinicId, {
			clinicId,
		});
		return response.data.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getAllShiftDoctor = async (
	staffId: number,
	specialtyId: number,
	clinicId: number
): Promise<StaffShiftsPayload[]> => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.common.shiftDoctor, {
			staffId,
			specialtyId,
			clinicId,
		});

		const data: StaffShiftsPayload[] = response.data.data;
		console.log(data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getAllSpecialtiesDoctor = async (
	clinicId: number,
	specialtyId: number
): Promise<ProfileStaffPayload[]> => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.common.allSpecialtiesDoctor, {
			clinicId,
			specialtyId,
		});

		console.log("response", response);

		const rawData = response.data.data;

		const data: ProfileStaffPayload[] = rawData.map((item: any) => ({
			staffId: item.staff_id,
			fullName: item.full_name,
			clinicId: item.clinic_id,
			specialtyId: item.specialty_id,
		}));
		console.log(data);
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getAllArticles = async (): Promise<ArticlesPayload[]> => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.common.articles);
		const rawData = response.data.data;

		// Map & group by article_id
		const articlesMap = new Map<number, ArticlesPayload>();

		rawData.forEach((item: any) => {
			const articleId = item.article_id;

			// Nếu bài viết chưa tồn tại trong map, tạo mới
			if (!articlesMap.has(articleId)) {
				articlesMap.set(articleId, {
					articleId,
					title: item.title,
					subTitle: item.sub_title,
					content: item.content,
					author: item.author,
					publishedDate: item.published_date,
					topicId: item.topic_id,
					topicName: item.topic_name,
					record: [],
				});
			}

			// Nếu có thông tin file, thêm vào record
			if (item.file_id) {
				const fileRecord: ArticlesFiles = {
					id: 0, // hoặc set null/undefined nếu không có ID cụ thể trong response
					articlesArticleId: articleId,
					directusFilesId: item.file_id,

					fileId: item.file_id,
					filenameDownload: item.filename_download,
					fileTitle: item.file_title,
					fileType: item.file_type,
					filesize: Number(item.filesize),
					width: item.width,
					height: item.height,
				};

				const article = articlesMap.get(articleId);
				if (article) {
					article.record?.push(fileRecord);
				}
			}
		});

		// Trả về danh sách bài viết
		const articlesList = Array.from(articlesMap.values());

		console.log(articlesList);
		return articlesList;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getAllAchievements = async (): Promise<ArticlesPayload[]> => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.common.achievements);
		const rawData = response.data.data;

		// Map & group by article_id
		const articlesMap = new Map<number, ArticlesPayload>();

		rawData.forEach((item: any) => {
			const articleId = item.article_id;

			// Nếu bài viết chưa tồn tại trong map, tạo mới
			if (!articlesMap.has(articleId)) {
				articlesMap.set(articleId, {
					articleId,
					title: item.title,
					subTitle: item.sub_title,
					content: item.content,
					author: item.author,
					publishedDate: item.published_date,
					topicId: item.topic_id,
					topicName: item.topic_name,
					record: [],
				});
			}

			// Nếu có thông tin file, thêm vào record
			if (item.file_id) {
				const fileRecord: ArticlesFiles = {
					id: 0, // hoặc set null/undefined nếu không có ID cụ thể trong response
					articlesArticleId: articleId,
					directusFilesId: item.file_id,

					fileId: item.file_id,
					filenameDownload: item.filename_download,
					fileTitle: item.file_title,
					fileType: item.file_type,
					filesize: Number(item.filesize),
					width: item.width,
					height: item.height,
				};

				const article = articlesMap.get(articleId);
				if (article) {
					article.record?.push(fileRecord);
				}
			}
		});

		// Trả về danh sách bài viết
		const articlesList = Array.from(articlesMap.values());

		console.log(articlesList);
		return articlesList;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getArticleById = async (articleId: number): Promise<ArticlesPayload[]> => {
	try {
		const response = await axiosInstance.post(API_ENDPOINTS.common.articles, {
			articleId,
		});
		const rawData = response.data.data;

		// Map & group by article_id
		const articlesMap = new Map<number, ArticlesPayload>();

		rawData.forEach((item: any) => {
			const articleId = item.article_id;

			// Nếu bài viết chưa tồn tại trong map, tạo mới
			if (!articlesMap.has(articleId)) {
				articlesMap.set(articleId, {
					articleId,
					title: item.title,
					subTitle: item.sub_title,
					content: item.content,
					author: item.author,
					publishedDate: item.published_date,
					topicId: item.topic_id,
					topicName: item.topic_name,
					record: [],
				});
			}

			// Nếu có thông tin file, thêm vào record
			if (item.file_id) {
				const fileRecord: ArticlesFiles = {
					id: 0, // hoặc set null/undefined nếu không có ID cụ thể trong response
					articlesArticleId: articleId,
					directusFilesId: item.file_id,

					fileId: item.file_id,
					filenameDownload: item.filename_download,
					fileTitle: item.file_title,
					fileType: item.file_type,
					filesize: Number(item.filesize),
					width: item.width,
					height: item.height,
				};

				const article = articlesMap.get(articleId);
				if (article) {
					article.record?.push(fileRecord);
				}
			}
		});

		// Trả về danh sách bài viết
		const articlesList = Array.from(articlesMap.values());

		console.log(articlesList);
		return articlesList;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getAllDoctor = async (): Promise<DoctorPayload[]> => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.common.professional);
		const rawData = response.data.data;
		const data: DoctorPayload[] = rawData.map((item: any) => ({
			staffId: item.staff_id,
			thumbnail: item.thumbnail,
			fullName: item.full_name,
			specialtyId: item.specialty_id,
			specialtyName: item.specialty_name,
			clinicId: item.clinic_id,
			clinicName: item.clinic_name,
			department: item.department,
			yearsOfExperience: item.years_of_experience,
			education: item.education,
			introduce: item.introduce,
			member: item.member,
			expert: item.expert,
		}));
		return data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};

export const getIntroduction = async () => {
	try {
		const response = await axiosInstance.get(API_ENDPOINTS.common.home);
		return response.data.data;
	} catch (error: any) {
		throw error.response?.data || { message: "Unexpected error occurred" };
	}
};
