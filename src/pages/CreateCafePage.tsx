// src/pages/CreateCafePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateCafeRequest } from "../type/store";

const CreateCafePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateCafeRequest>({
    cafe_name: "",
    address: "",
    phone_number: "",
    description: "",
    operating_hours: "",
    cafe_image_url: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (field: keyof CreateCafeRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: CreateCafeRequest = {
        cafe_name: form.cafe_name,
        address: form.address,
        phone_number: form.phone_number,
        description: form.description,
        operating_hours: form.operating_hours,
        cafe_image_url: form.cafe_image_url,
      };

      console.log("POST /cafes payload:", payload);

      // TODO: 실제 API 붙일 때 사용
      // const token = localStorage.getItem("access_token");
      // const res = await fetch("/cafes", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error("카페 등록에 실패했습니다.");
      // const data: CreateCafeResponse = await res.json();
      // console.log("카페 등록 성공:", data);

      // 예: 내 카페 목록으로 이동
      navigate("/ownercafes");
    } catch (err) {
      console.error(err);
      alert("카페 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center py-8 px-4 md:px-20">
      <section className="w-1/2 aspect-5/4 mx-auto bg-white rounded-3xl shadow-md px-8 py-8">
        <h1 className="text-lg font-semibold text-gray-900 mb-1">카페 등록</h1>
        <p className="text-xs text-gray-500 mb-6">
          새로운 카페를 등록하고 메뉴를 관리해 보세요.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              카페 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.cafe_name}
              onChange={handleChange("cafe_name")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              주소 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.address}
              onChange={handleChange("address")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={form.phone_number}
              onChange={handleChange("phone_number")}
              placeholder="010-1234-5678"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              운영 시간 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.operating_hours}
              onChange={handleChange("operating_hours")}
              placeholder="예: 매일 09:00 ~ 21:00"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">설명</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              카페 이미지 URL
            </label>
            <input
              type="text"
              value={form.cafe_image_url}
              onChange={handleChange("cafe_image_url")}
              placeholder="https://example.com/cafe.jpg"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-[#E17100] text-white text-sm font-semibold py-2.5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#cf6400] transition-colors"
          >
            {isLoading ? "등록 중..." : "카페 등록"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateCafePage;
