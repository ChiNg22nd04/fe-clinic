# 🏥 Clinic Management System - Frontend

Hệ thống quản lý phòng khám với giao diện frontend được xây dựng bằng React, TypeScript và các công nghệ hiện đại.

## 📋 Mô tả

Clinic Management System Frontend là giao diện người dùng hiện đại và responsive cho hệ thống quản lý phòng khám. Ứng dụng hỗ trợ ba vai trò người dùng chính: Bác sĩ, Lễ tân và Bệnh nhân, cung cấp trải nghiệm người dùng tối ưu cho việc quản lý lịch hẹn, hồ sơ y tế và các hoạt động phòng khám.

## 🚀 Tính năng chính

### 👥 Quản lý người dùng

-   Đăng nhập/đăng xuất với JWT authentication
-   Phân quyền theo vai trò (Doctor, Receptionist, User)
-   Quản lý thông tin cá nhân và hồ sơ
-   Upload và cập nhật avatar người dùng
-   Giao diện responsive cho mọi thiết bị

### 🏥 Quản lý phòng khám

-   Hiển thị thông tin phòng khám
-   Quản lý chuyên khoa và bác sĩ
-   Lịch làm việc và ca trực trực quan
-   Thông tin chuyên môn và thành tích bác sĩ

### 📅 Quản lý lịch hẹn

-   Đặt lịch hẹn khám bệnh trực tuyến
-   Lịch trực quan với React Calendar
-   Quản lý lịch hẹn theo bác sĩ và thời gian
-   Cập nhật trạng thái lịch hẹn real-time
-   Xem lịch sử lịch hẹn

### 📋 Hồ sơ y tế

-   Quản lý hồ sơ bệnh án
-   Đơn thuốc và chỉ định điều trị
-   Lịch sử khám bệnh chi tiết
-   Upload hồ sơ y tế (ảnh, tài liệu)
-   Xem báo cáo y tế

### 💊 Quản lý thuốc

-   Danh mục thuốc trực quan
-   Quản lý đơn thuốc
-   Theo dõi sử dụng thuốc

### 💰 Quản lý hóa đơn

-   Tạo và quản lý hóa đơn
-   Xem lịch sử hóa đơn
-   Quản lý thanh toán

### 📧 Thông báo

-   Hệ thống thông báo real-time
-   Thông báo lịch hẹn và cập nhật
-   Email notifications

## 🛠️ Công nghệ sử dụng

-   **Frontend Framework**: React 19.1.0
-   **Language**: TypeScript 4.9.5
-   **Styling**: SCSS, CSS Modules
-   **Routing**: React Router DOM 7.5.0
-   **HTTP Client**: Axios 1.8.4
-   **Date Handling**: Day.js 1.11.13
-   **UI Components**: React Calendar 6.0.0
-   **Icons**: FontAwesome 6.7.2
-   **Build Tool**: React Scripts 5.0.1 với react-app-rewired
-   **Package Manager**: npm/pnpm
-   **State Management**: React Hooks
-   **Form Handling**: Controlled Components
-   **File Upload**: Browser Image Compression

## 📦 Cài đặt

### Yêu cầu hệ thống

-   Node.js (version 16 trở lên)
-   npm hoặc pnpm
-   Backend API server đang chạy

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd fe-clinic
```

### Bước 2: Cài đặt dependencies

```bash
npm install
# hoặc
pnpm install
```

### Bước 3: Cấu hình môi trường

Tạo file `.env` trong thư mục gốc và cấu hình các biến môi trường:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3500
REACT_APP_ENVIRONMENT=development

# Optional: Cloudinary Configuration (if using image upload)
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Bước 4: Khởi chạy ứng dụng

```bash
# Development mode
npm start
# hoặc
pnpm start
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 📚 API Integration

Frontend tích hợp với Backend API thông qua các endpoint chính:

### 🔐 Authentication

-   `POST /auth/login` - Đăng nhập
-   `POST /auth/logout` - Đăng xuất
-   JWT token management

### 👤 User Management

-   `POST /user/schedule-appointment` - Đặt lịch hẹn
-   `POST /user/appointments` - Lấy danh sách lịch hẹn
-   `POST /user/medical-history` - Lấy lịch sử khám bệnh
-   `PUT /user/profile` - Lấy thông tin cá nhân
-   `PUT /user/upload-profile` - Cập nhật thông tin cá nhân
-   `PUT /user/upload-avatar` - Upload avatar

### 🏥 Common Routes

-   `GET /` - Thông tin giới thiệu
-   `GET /specialties` - Lấy danh sách chuyên khoa
-   `GET /clinics` - Lấy danh sách phòng khám
-   `POST /specialties/clinic-id` - Lấy chuyên khoa theo phòng khám
-   `POST /specialties/doctor-all` - Lấy tất cả chuyên khoa của bác sĩ
-   `POST /shifts-all` - Lấy tất cả ca trực
-   `POST /shifts/doctor-id` - Lấy ca trực theo bác sĩ
-   `GET /articles` - Lấy danh sách bài viết
-   `GET /achievements` - Lấy danh sách thành tích
-   `GET /professional` - Lấy danh sách bác sĩ
-   `POST /professional/doctor-id` - Lấy thông tin bác sĩ theo ID

### 👨‍⚕️ Doctor Routes

-   `GET /doctor/medical-examination/get-all` - Lấy tất cả phiếu khám
-   `GET /doctor/medical-examination/get-detail` - Lấy chi tiết phiếu khám
-   `PUT /doctor/medical-examination/update` - Cập nhật phiếu khám
-   `POST /doctor/prescription/update-form` - Cập nhật đơn thuốc
-   `POST /doctor/prescription/form` - Lấy đơn thuốc
-   `GET /doctor/medicine/get-all` - Lấy danh sách thuốc

### 📋 Receptionist Routes

-   `GET /receptionist/appointment/get-all` - Lấy tất cả lịch hẹn
-   `PUT /receptionist/appointment/update-status` - Cập nhật trạng thái lịch hẹn
-   `GET /receptionist/examination/get-all` - Lấy tất cả phiếu khám
-   `GET /receptionist/medical-examination/get-detail` - Lấy chi tiết phiếu khám
-   `POST /receptionist/invoice/create` - Tạo hóa đơn
-   `GET /receptionist/invoice/get-all` - Lấy tất cả hóa đơn
-   `PUT /receptionist/shifts/get-detail` - Lấy chi tiết ca trực
-   `POST /receptionist/prescription/form` - Lấy đơn thuốc

## 🗂️ Cấu trúc thư mục

```
src/
├── modules/                 # Các module theo tính năng
│   ├── auth/               # Module xác thực
│   │   ├── pages/         # Trang đăng nhập/đăng ký
│   │   ├── services/      # Dịch vụ API xác thực
│   │   └── routes/        # Định tuyến xác thực
│   ├── customer/           # Cổng thông tin bệnh nhân
│   │   ├── layout/        # Layout cho bệnh nhân
│   │   ├── pages/         # Trang bệnh nhân
│   │   │   ├── Appointment/    # Đặt lịch hẹn
│   │   │   ├── MedicalReport/  # Báo cáo y tế
│   │   │   ├── Profile/        # Hồ sơ cá nhân
│   │   │   └── Upload/         # Upload tài liệu
│   │   ├── services/      # Dịch vụ API bệnh nhân
│   │   └── routes/        # Định tuyến bệnh nhân
│   ├── doctor/            # Cổng thông tin bác sĩ
│   │   ├── layout/        # Layout cho bác sĩ
│   │   ├── pages/         # Trang bác sĩ
│   │   │   ├── ExaminationForm/ # Form khám bệnh
│   │   │   └── Dashboard/       # Dashboard bác sĩ
│   │   ├── services/      # Dịch vụ API bác sĩ
│   │   └── routes/        # Định tuyến bác sĩ
│   └── receptionist/      # Cổng thông tin lễ tân
│       ├── layout/        # Layout cho lễ tân
│       ├── pages/         # Trang lễ tân
│       │   ├── Appointment/     # Quản lý lịch hẹn
│       │   ├── ExaminationForm/ # Form khám bệnh
│       │   └── Invoice/         # Quản lý hóa đơn
│       ├── services/      # Dịch vụ API lễ tân
│       └── routes/        # Định tuyến lễ tân
├── shared/                # Các component và tiện ích dùng chung
│   ├── components/        # Component có thể tái sử dụng
│   │   ├── Header/        # Header component
│   │   ├── Nav/           # Navigation component
│   │   └── UserMenu/      # User menu component
│   ├── hooks/            # Custom React hooks
│   │   ├── useClinics.ts      # Hook quản lý phòng khám
│   │   ├── useSpecialties.ts  # Hook quản lý chuyên khoa
│   │   ├── useUser.ts         # Hook quản lý người dùng
│   │   ├── useDoctors.ts      # Hook quản lý bác sĩ
│   │   └── useShiftSchedule.ts # Hook quản lý ca trực
│   ├── interfaces/       # TypeScript interfaces
│   │   ├── AppointmentPayload.ts
│   │   ├── ClinicPayload.ts
│   │   ├── ExaminationPayload.ts
│   │   └── SpecialtyPayload.ts
│   └── globalStyle/      # Style toàn cục và biến
│       └── variables.scss
├── public/               # Trang và dịch vụ công khai
│   ├── pages/           # Trang công khai
│   │   ├── Home/        # Trang chủ
│   │   └── Specialties/ # Trang chuyên khoa
│   ├── services/        # Dịch vụ API công khai
│   └── routes/          # Định tuyến công khai
├── config/               # File cấu hình
│   └── index.ts         # Cấu hình API endpoints
├── Axios/               # Cấu hình HTTP client
│   └── axiosInstance.ts
├── assets/              # Tài nguyên tĩnh
├── routes/              # Định tuyến chính
└── App.tsx              # Component chính
```

## 🔧 Scripts

```bash
# Khởi chạy development server
npm start

# Build ứng dụng cho production
npm run build

# Chạy tests
npm test

# Eject từ Create React App (không khuyến khích)
npm run eject
```

### Modern UI Components

-   Calendar component cho lịch hẹn
-   Modal dialogs cho forms
-   Loading states và error handling
-   Toast notifications

### Accessibility

-   ARIA labels và semantic HTML
-   Keyboard navigation support
-   Screen reader compatibility

## 🔒 Bảo mật

-   JWT token management
-   Secure API calls với Axios interceptors
-   Input validation và sanitization
-   Protected routes theo vai trò
-   Secure file upload

## 📱 Responsive Design

Ứng dụng được thiết kế responsive cho:

-   Desktop (1200px+)
-   Tablet (768px - 1199px)
-   Mobile (320px - 767px)

## 🚀 Deployment

### Production Build

```bash
# Build ứng dụng
npm run build

# Serve static files
npx serve -s build
```

### Environment Variables

```env
# Production
REACT_APP_API_BASE_URL=https://your-api-domain.com
REACT_APP_ENVIRONMENT=production
```

### Docker (Tùy chọn)

```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing

```bash
# Chạy tests
npm test

# Chạy tests với coverage
npm test -- --coverage

# Chạy tests trong watch mode
npm test -- --watch
```

## 📊 Performance

-   Code splitting với React.lazy()
-   Image optimization
-   Bundle size optimization
-   Caching strategies

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Development Guidelines

-   Tuân thủ TypeScript best practices
-   Sử dụng functional components với hooks
-   Duy trì định dạng code nhất quán
-   Viết commit message có ý nghĩa
-   Test changes thoroughly

## 📞 Liên hệ

-   **Tác giả**: [Nguyễn Lan Chi]
-   **Email**: [chiinglan4464@gmail.com](chiinglan4464@gmail.com)
-   **GitHub**: [ChiNg22nd04](https://github.com/ChiNg22nd04)

## 🙏 Cảm ơn

Cảm ơn bạn đã quan tâm đến Clinic Management System Frontend! Nếu có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng tạo issue trên GitHub.

---

