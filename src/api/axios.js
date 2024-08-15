// 토큰이 만료되면 로그인 페이지로 리디렉션하는 인터셉터를 추가한 Axios 인스턴스를 생성
import axios from 'axios';

// Axios 인스턴스를 생성
const axiosInstance = axios.create({
  baseURL: 'http://13.209.250.36:8080',  // Spring 애플리케이션의 URL
  withCredentials: true  // 자격 증명 허용 (쿠키를 사용할 경우)
}
);

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