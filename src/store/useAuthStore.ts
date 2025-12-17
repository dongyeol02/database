// src/store/useAuthStore.ts
import { create } from "zustand";
import type { UserRole, AuthState } from "../type/auth";

const initialToken = localStorage.getItem("authToken");
const initialRole = localStorage.getItem("role") as UserRole | null;
const initialNickname = localStorage.getItem("nickname");
const initialUserId = localStorage.getItem("user_id");

export const useAuthStore = create<AuthState>((set) => ({
  token: initialToken,
  role: initialRole ?? null,
  nickname: initialNickname,
  user_id: initialUserId ? Number(initialUserId) : null,
  isAuthenticated: !!initialToken,

  setAuth: (auth) => {
    if (auth && auth.token) {
      localStorage.setItem("authToken", auth.token);
      localStorage.setItem("role", auth.role ?? "");
      localStorage.setItem("nickname", auth.nickname ?? "");
      localStorage.setItem("user_id", String(auth.user_id ?? ""));

      set({
        token: auth.token,
        role: auth.role,
        nickname: auth.nickname,
        user_id: auth.user_id,
        isAuthenticated: true,
      });
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      localStorage.removeItem("nickname");
      localStorage.removeItem("user_id");

      set({
        token: null,
        role: null,
        nickname: null,
        user_id: null,
        isAuthenticated: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("nickname");
    localStorage.removeItem("user_id");

    set({
      token: null,
      role: null,
      nickname: null,
      user_id: null,
      isAuthenticated: false,
    });
  },
}));
