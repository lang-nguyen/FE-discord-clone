# 🚀 Discord Clone Frontend

## 📂 Folder Structure

- **`src/`**: Mã nguồn chính của ứng dụng
    - **`api/`**: Cấu hình / hàm gọi API chung
    - **`assets/`**: Tài nguyên tĩnh (ảnh, icon, style)
        - **`icons/`**: Icon dùng trong app
        - **`images/`**: Hình ảnh
        - **`styles/`**: CSS/SCSS global, theme
    - **`config/`**: Config toàn cục (env, constants, route names)
    - **`features/`**: Các tính năng chính của ứng dụng
        - **`messages/`**: Ví dụ: feature Messages
            - **`components/`**: UI components riêng cho feature
            - **`hooks/`**: Custom hooks của feature
            - **`models/`**: Định nghĩa kiểu dữ liệu (Message, User…)
            - **`pages/`**: Trang chính liên quan đến feature
            - **`services/`**: API calls, logic kết nối backend
    - **`layouts/`**: Các layout chính (AuthLayout, MainLayout…)
    - **`routes/`**: Định nghĩa routing của app
    - **`shared/`**: Thành phần tái sử dụng (components, hooks, utils)
    - **`store/`**: Global state (Redux/Zustand/Context)
    - **`App.jsx`**: Root component
    - **`index.css`**: File CSS chính
    - **`main.jsx`**: Entry point khởi chạy React

---

## 🛠️ Tech Stack
- **React + Vite**
- **TailwindCSS**
- **Redux Toolkit**
- **React Router v6**

---

## 📖 Hướng dẫn chạy dự án

```bash
# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Build production
npm run build

# Preview build
npm run preview
