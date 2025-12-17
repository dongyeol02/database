export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user_id: number;
  role: "customer" | "owner" | "admin";
  token: string; // JWT
};

export type SignupRequest = {
  email: string;
  password: string;
  confirmPassword: string;
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
