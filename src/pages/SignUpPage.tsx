// src/pages/SignupPage.tsx
import { useState } from "react";
import { Mail, Lock, User, Phone, UserCircle2, Store } from "lucide-react";
import type { SignupRequest } from "../type/auth";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState<SignupRequest>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    role: "customer",
    phone_number: "",
  });

  const [error, setError] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    nickname?: string;
    phone_number?: string;
    global?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (field: keyof SignupRequest) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setError((prev) => ({ ...prev, [field]: undefined, global: undefined }));
    };

  const handleRoleChange = (role: SignupRequest["role"]) => {
    setForm((prev) => ({ ...prev, role }));
  };

  const validate = () => {
    const nextError: typeof error = {};

    if (!form.email) nextError.email = "이메일을 입력해주세요.";
    if (!form.password) nextError.password = "비밀번호를 입력해주세요.";
    else if (form.password.length < 6)
      nextError.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    if (!form.confirmPassword)
      nextError.confirmPassword = "비밀번호를 다시 입력해주세요.";
    else if (form.password !== form.confirmPassword)
      nextError.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!form.nickname) nextError.nickname = "닉네임을 입력해주세요.";
    if (!form.phone_number) nextError.phone_number = "전화번호를 입력해주세요.";

    setError(nextError);
    return Object.keys(nextError).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const body: Omit<SignupRequest, "confirmPassword"> = {
        email: form.email,
        password: form.password,
        nickname: form.nickname,
        role: form.role,
        phone_number: form.phone_number,
      };

      console.log("POST /auth/register payload:", body);

      // TODO: 실제 API 붙일 때 사용
      // const res = await fetch("/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      // if (!res.ok) throw new Error("회원가입에 실패했습니다.");
      // const data: SignupResponse = await res.json();
      // console.log("회원가입 성공:", data);
    } catch (err) {
      console.log(err);
      setError((prev) => ({
        ...prev,
        global: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-xl bg-white rounded-3xl shadow-xl px-10 py-10">
      {/* 상단 헤더 */}
      <div className="flex flex-col mb-8">
        <h1 className="text-lg font-semibold text-[#111827] mb-1">회원가입</h1>
        <p className="text-xs text-gray-500">
          카페 통합 주문 시스템에 가입하세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 이메일 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">
            이메일 <span className="text-red-500">*</span>
          </label>
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
          <label className="text-xs font-medium text-gray-700">
            비밀번호 <span className="text-red-500">*</span>
          </label>
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
              placeholder="최소 6자 이상"
              value={form.password}
              onChange={handleChange("password")}
              className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
          </div>
          {error.password && (
            <p className="text-[11px] text-red-500">{error.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">
            비밀번호 확인 <span className="text-red-500">*</span>
          </label>
          <div
            className={
              "flex items-center gap-2 border rounded-lg px-3 py-2 text-sm " +
              (error.confirmPassword
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-white")
            }
          >
            <Lock
              size={16}
              className={
                error.confirmPassword ? "text-red-400" : "text-gray-400"
              }
            />
            <input
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
          </div>
          {error.confirmPassword && (
            <p className="text-[11px] text-red-500">{error.confirmPassword}</p>
          )}
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">
            닉네임 <span className="text-red-500">*</span>
          </label>
          <div
            className={
              "flex items-center gap-2 border rounded-lg px-3 py-2 text-sm " +
              (error.nickname
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-white")
            }
          >
            <User
              size={16}
              className={error.nickname ? "text-red-400" : "text-gray-400"}
            />
            <input
              type="text"
              placeholder="앱에서 사용할 닉네임"
              value={form.nickname}
              onChange={handleChange("nickname")}
              className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
          </div>
          {error.nickname && (
            <p className="text-[11px] text-red-500">{error.nickname}</p>
          )}
        </div>

        {/* 전화번호 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">
            전화번호 <span className="text-red-500">*</span>
          </label>
          <div
            className={
              "flex items-center gap-2 border rounded-lg px-3 py-2 text-sm " +
              (error.phone_number
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-white")
            }
          >
            <Phone
              size={16}
              className={error.phone_number ? "text-red-400" : "text-gray-400"}
            />
            <input
              type="tel"
              placeholder="010-1234-5678"
              value={form.phone_number}
              onChange={handleChange("phone_number")}
              className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
            />
          </div>
          {error.phone_number && (
            <p className="text-[11px] text-red-500">{error.phone_number}</p>
          )}
        </div>

        {/* 가입 유형 */}
        <div className="flex flex-col gap-2 mt-1">
          <span className="text-xs font-medium text-gray-700">
            가입 유형 <span className="text-red-500">*</span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleRoleChange("customer")}
              className={
                "flex flex-col items-center justify-center gap-1 border rounded-2xl py-3 text-xs " +
                (form.role === "customer"
                  ? "border-[#E17100] bg-[#FFF7E8] text-[#E17100]"
                  : "border-gray-200 bg-white text-gray-500")
              }
            >
              <UserCircle2
                size={20}
                className={
                  form.role === "customer" ? "text-[#E17100]" : "text-gray-400"
                }
              />
              <span>고객</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange("owner")}
              className={
                "flex flex-col items-center justify-center gap-1 border rounded-2xl py-3 text-xs " +
                (form.role === "owner"
                  ? "border-[#E17100] bg-[#FFF7E8] text-[#E17100]"
                  : "border-gray-200 bg-white text-gray-500")
              }
            >
              <Store
                size={20}
                className={
                  form.role === "owner" ? "text-[#E17100]" : "text-gray-400"
                }
              />
              <span>사장님</span>
            </button>
          </div>
        </div>

        {/* 글로벌 에러 */}
        {error.global && (
          <p className="text-[11px] text-red-500 mt-1">{error.global}</p>
        )}

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-3 w-full bg-[#E17100] text-white text-sm font-semibold py-2.5 rounded-xl
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition-transform duration-150 hover:scale-[1.01] active:scale-95"
        >
          {isLoading ? "가입 중..." : "회원가입"}
        </button>
      </form>

      {/* 하단 - 로그인 이동 */}
      <div className="mt-6 text-center text-xs text-gray-500">
        이미 계정이 있으신가요?{" "}
        <Link
          className="font-semibold text-[#E17100] hover:underline"
          to={"/login"}
        >
          로그인하기
        </Link>
      </div>
    </section>
  );
};

export default SignupPage;
