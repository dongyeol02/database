// src/pages/LoginPage.tsx
import { useState } from "react";
import { Coffee, Mail, Lock } from "lucide-react";
import type { LoginRequest, LoginResponse } from "../type/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../apis/authApi";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    global?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const handleChange =
    (field: keyof LoginRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError((prev) => ({ ...prev, [field]: undefined, global: undefined }));
    };

  const validate = () => {
    const nextError: typeof error = {};
    if (!form.email) nextError.email = "이메일을 입력해주세요.";
    if (!form.password) nextError.password = "비밀번호를 입력해주세요.";
    setError(nextError);
    return Object.keys(nextError).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const body: LoginRequest = {
        email: form.email,
        password: form.password,
      };
      const data: LoginResponse = await login(body); // ★ 래퍼 사용
      // data: { role, token, nickname, user_id }
      console.log(data);
      alert("로그인 성공 ");
      setAuth({
        token: data.token,
        role: data.role,
        nickname: data.nickname,
        user_id: data.user_id,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError((prev) => ({
        ...prev,
        global: "이메일 또는 비밀번호를 다시 확인해주세요.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md bg-white rounded-3xl shadow-xl px-10 py-10">
      {/* 상단 헤더 */}

      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 rounded-full bg-[#E17100] flex items-center justify-center mb-3">
          <Coffee size={26} color="#FFFFFF" />
        </div>
        <h1 className="text-xl font-semibold text-[#111827] mb-1">로그인</h1>
        <p className="text-xs text-gray-500">카페 통합 주문 시스템</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 이메일 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">이메일</label>
          <div
            className={
              "flex items-center gap-2 border rounded-lg px-3 py-2 text-sm " +
              (error.email
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-white")
            }
          >
            <Mail
              size={16}
              className={error.email ? "text-red-400" : "text-gray-400"}
            />
            <input
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange("email")}
              className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
          </div>
          {error.email && (
            <p className="text-[11px] text-red-500">{error.email}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">비밀번호</label>
          <div
            className={
              "flex items-center gap-2 border rounded-lg px-3 py-2 text-sm " +
              (error.password
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-white")
            }
          >
            <Lock
              size={16}
              className={error.password ? "text-red-400" : "text-gray-400"}
            />
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={handleChange("password")}
              className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
          </div>
          {error.password && (
            <p className="text-[11px] text-red-500">{error.password}</p>
          )}
        </div>

        {/* 글로벌 에러 */}
        {error.global && (
          <p className="text-[11px] text-red-500 mt-1">{error.global}</p>
        )}

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full bg-[#E17100] text-white text-sm font-semibold py-2.5 rounded-xl
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-transform duration-150 hover:scale-[1.01] active:scale-95"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* 하단 가입 유도 */}
      <div className="mt-6 text-center text-xs text-gray-500">
        아직 계정이 없으신가요?{" "}
        <Link
          className="font-semibold text-[#E17100] hover:underline"
          to={"/signup"}
        >
          회원가입하기
        </Link>
      </div>
    </section>
  );
};

export default LoginPage;
