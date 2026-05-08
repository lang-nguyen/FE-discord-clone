import axios from 'axios';

// Định nghĩa URL gốc tới Server Service hoặc API Gateway của hệ thống Microservices
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Hỗ trợ tự động gắn token trước khi gửi request tới BE .NET
axiosClient.interceptors.request.use(
    (config) => {
        // Lấy token từ Redux, localStorage hoặc cookie tùy dự án của bạn
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor: Xử lý response từ BE trả về
axiosClient.interceptors.response.use(
    (response) => {
        return response.data; // Chỉ lấy phần data từ Server
    },
    (error) => {
        // Xử lý lỗi toàn cục (VD: hết hạn token, lỗi 500,...)
        return Promise.reject(error);
    }
);

export default axiosClient;