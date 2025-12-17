import axios from "axios";
import type { LoginRequest, LoginResponse, SignupRequest } from "../type/auth";

export const API_BASE_URL = "http://localhost:8080";

export const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 로그인
export const login = async (
  signinData: LoginRequest
): Promise<LoginResponse> => {
  const response = await Api.post<LoginResponse>("/auth/login", signinData);
  return response.data;
};

// 회원가입
export const signup = async (signupData: SignupRequest): Promise<void> => {
  await Api.post("/auth/register", signupData);
};
