// 토큰이 만료되면 로그인 페이지로 리디렉션하는 인터셉터를 추가한 Axios 인스턴스를 생성
import axios from 'axios';

// Axios 인스턴스를 생성
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DB_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data === "Token expired") {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;