export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user_id: number;
  role: "customer" | "owner" | "admin";
  token: string; // JWT
  nickname: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
  role: "customer" | "owner";
  phone_number: string;
};

export type SignupResponse = {
  user_id: number;
  email: string;
  nickname: string;
  role: "customer" | "owner";
};

// src/types/auth.ts
export type UserRole = "customer" | "owner" | "admin";

export type AuthState = {
  token: string | null;
  role: UserRole | null;
  nickname: string | null;
  user_id: number | null;
  isAuthenticated: boolean;
  setAuth: (
    auth: {
      token: string | null;
      role: UserRole | null;
      nickname: string | null;
      user_id: number | null;
    } | null
  ) => void;
  logout: () => void;
};
