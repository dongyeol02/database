// src/api/axiosInstance.ts
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Zustand 스토어에서 토큰을 가져옵니다. (컴포넌트 외부에서 접근: .getState())
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // HTTP 401 Unauthorized 에러 확인
    if (error.response?.status === 401) {
      console.error("인증 실패 (401). 자동 로그아웃을 실행합니다.");
      // Zustand의 logout 액션을 호출하여 전역 로그아웃 처리
      useAuthStore.getState().logout();

      // 사용자에게 메시지 표시 또는 로그인 페이지로 리다이렉트 (추가 구현 필요)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
