# 🎬 Cineverse

Dự án này mình xây dựng để rèn luyện kỹ năng React, đặc biệt là cách handle dữ liệu từ TMDB API sao cho mượt và tối ưu. Layout thì mình "mượn" cảm hứng từ Netflix nhưng có tinh chỉnh lại màu sắc Neon Cyan cho nó cá tính hơn.

## 🚀 Tính năng mình đã làm:
- **Trang chủ**: Banner random, các dãy phim trượt mượt (Trending, To Rated, Action...).
- **Cơ chế Load cực nhanh**: Sử dụng **TanStack Query (React Query)** để cache dữ liệu, không lo request trùng lặp.
- **Cuộn vô hạn (Infinite Scroll)**: Trang tìm kiếm cuộn thả ga không cần bấm qua trang mới.
- **Xem Trailer**: Tích hợp sẵn YouTube Player để xem trailer trực tiếp.
- **Xác thực (Auth)**: Chạy JWT theo flow thực tế (Access/Refresh Token) dù đang dùng mock dữ liệu.
- **Performance**: Có Error Boundary để app k bao giờ bị "trắng trang", Lazy loading để tải trang nào nạp trang đó.

## 🛠 Công nghệ mình dùng:
- **Frontend**: React 19, Vite, Tailwind CSS (styling đỉnh cao).
- **Quản lý dữ liệu**: TanStack Query v5.
- **Routing**: React Router DOM (có bảo vệ route bằng ProtectedRoute).
- **API**: TMDB (The Movie Database).

## 💻 Cách chạy dự án:
1. Copy repo này về: `git clone ...`
2. Cài đồ chơi: `npm install`
3. Tạo file `.env` bỏ API Key của TMDB vào: `VITE_TMDB_API_KEY=your_key`
4. Lên nhạc: `npm run dev`

### � Acc test cho bạn nào lười đăng ký:
- **Email**: `admin@cineverse.com`
- **Pass**: `admin123`

---
*Dự án mang tính chất học tập & rèn luyện!*