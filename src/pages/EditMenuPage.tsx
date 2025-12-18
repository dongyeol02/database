import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MenuItem, UpdateMenuItemRequest } from "../type/store";
import { getCafeMenus, updateMenuItem } from "../apis/CafeApi";
import { useAuthStore } from "../store/useAuthStore";

const EditMenuItemPage = () => {
  const { cafeId, itemId } = useParams<{ cafeId: string; itemId: string }>();
  const navigate = useNavigate();
  const { user_id } = useAuthStore();

  const [originalItem, setOriginalItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<UpdateMenuItemRequest>({
    item_name: "",
    price: 0,
    description: "",
    category: "",
    item_image_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!cafeId || !itemId) return;

    const fetchItem = async () => {
      try {
        setIsFetching(true);
        const items = await getCafeMenus(Number(cafeId)); // GET /cafes/{cafeId}/menus
        const found = items.find((i) => i.item_id === Number(itemId)) ?? null;
        setOriginalItem(found);

        if (found) {
          setForm({
            item_name: found.item_name,
            price: found.price,
            description: found.description,
            category: found.category,
            item_image_url: found.item_image_url,
          });
        }
      } catch (err) {
        console.error(err);
        alert("메뉴 정보를 불러오지 못했습니다.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchItem();
  }, [cafeId, itemId]);

  const handleChange =
    (field: keyof UpdateMenuItemRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "price" ? Number(e.target.value || 0) : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user_id) {
      alert("로그인 정보가 없습니다.");
      return;
    }
    if (!itemId) {
      alert("메뉴 ID가 없습니다.");
      return;
    }

    setIsLoading(true);

    try {
      const payload: UpdateMenuItemRequest = {
        item_name: form.item_name,
        price: form.price,
        description: form.description,
        category: form.category,
        item_image_url: form.item_image_url,
      };

      const data = await updateMenuItem(user_id, Number(itemId), payload); // PUT /cafes/menus/{itemId}
      console.log("메뉴 수정 성공:", data);

      navigate(`/ownercafedetail/${cafeId}`);
    } catch (err) {
      console.error(err);
      alert("메뉴 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <p className="text-sm text-gray-500">메뉴 정보를 불러오는 중...</p>
      </main>
    );
  }

  if (!originalItem) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <p className="text-sm text-gray-500">메뉴 정보를 찾을 수 없습니다.</p>
      </main>
    );
  }

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
