// src/pages/EditMenuItemPage.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 임시: 더미 데이터에서 아이템 하나 찾아오기
import { dummyCafeDetail } from "../mock/store";
import type { MenuItem, UpdateMenuItemRequest } from "../type/store";

const EditMenuItemPage = () => {
  const { cafeId, itemId } = useParams<{ cafeId: string; itemId: string }>();
  const navigate = useNavigate();

  // 실제로는 GET /cafes/:cafeId/items/:itemId 으로 가져와야 함
  const originalItem: MenuItem | undefined = dummyCafeDetail.items.find(
    (i) => i.item_id === Number(itemId)
  );

  const [form, setForm] = useState<UpdateMenuItemRequest>({
    item_name: originalItem?.item_name ?? "",
    price: originalItem?.price ?? 0,
    description: originalItem?.description ?? "",
    category: originalItem?.category ?? "",
    item_image_url: originalItem?.item_image_url ?? "",
  });

  const [isLoading, setIsLoading] = useState(false);

  if (!originalItem) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <p className="text-sm text-gray-500">메뉴 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

  const handleChange =
    (field: keyof UpdateMenuItemRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "price" ? Number(e.target.value || 0) : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: UpdateMenuItemRequest = {
        // 수정한 값만 보내고 싶으면 여기서 빈 값 필터링
        item_name: form.item_name,
        price: form.price,
        description: form.description,
        category: form.category,
        item_image_url: form.item_image_url,
      };

      console.log(
        "PUT /cafes/:cafeId/items/:itemId payload:",
        cafeId,
        itemId,
        payload
      );

      // TODO: 실제 API 붙일 때 사용
      // const res = await fetch(`/cafes/${cafeId}/items/${itemId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error("메뉴 수정에 실패했습니다.");
      // const data: UpdateMenuItemResponse = await res.json();
      // console.log("메뉴 수정 성공:", data);

      // 성공 후 내 카페 상세로 이동
      navigate(`/ownercafedetail/${cafeId}`);
    } catch (err) {
      console.error(err);
      alert("메뉴 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center py-8 px-4 md:px-20">
      <section className="w-1/2 aspect-5/4 mx-auto bg-white rounded-3xl shadow-md px-8 py-8">
        <h1 className="text-lg font-semibold text-gray-900 mb-1">메뉴 수정</h1>
        <p className="text-xs text-gray-500 mb-6">
          {originalItem.item_name} 메뉴 정보를 수정합니다.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              메뉴 이름
            </label>
            <input
              type="text"
              value={form.item_name ?? ""}
              onChange={handleChange("item_name")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">가격</label>
            <input
              type="number"
              value={form.price ?? 0}
              onChange={handleChange("price")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">설명</label>
            <textarea
              rows={3}
              value={form.description ?? ""}
              onChange={handleChange("description")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              카테고리
            </label>
            <input
              type="text"
              value={form.category ?? ""}
              onChange={handleChange("category")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              이미지 URL
            </label>
            <input
              type="text"
              value={form.item_image_url ?? ""}
              onChange={handleChange("item_image_url")}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#E17100]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-[#E17100] text-white text-sm font-semibold py-2.5 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#cf6400] transition-colors"
          >
            {isLoading ? "수정 중..." : "수정 완료"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default EditMenuItemPage;
