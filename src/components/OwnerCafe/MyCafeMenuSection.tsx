// src/components/OwnerCafe/MyCafeMenuSection.tsx
import { useState } from "react";
import type { CafeDetail } from "../../type/store";
import OwnerMenuItemCard from "./OwnerMenuItemCard";
import { useNavigate } from "react-router-dom";

type Props = {
  cafe: CafeDetail;
};

const MyCafeMenuSection = ({ cafe }: Props) => {
  const categories =
    cafe.items.length === 0
      ? ["전체"]
      : ["전체", ...new Set(cafe.items.map((i) => i.category))];

  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const navigate = useNavigate();
  const filteredItems =
    selectedCategory === "전체"
      ? cafe.items
      : cafe.items.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-white rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#7B3306] mb-4">메뉴</h2>

      {/* 메뉴가 하나도 없을 때 */}
      {cafe.items.length === 0 ? (
        <div className="py-6 flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">
            아직 등록된 메뉴가 없습니다. 첫 메뉴를 추가해 보세요.
          </p>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-[#E17100] text-white text-xs font-semibold hover:bg-[#cf6400] transition-colors"
            // 메뉴 추가 페이지로 이동
            onClick={() =>
              navigate(`/ownercafedetail/${cafe.cafe_id}/menus/new`)
            }
          >
            메뉴 추가하기
          </button>
        </div>
      ) : (
        <>
          {/* 카테고리 탭 */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive = category === selectedCategory;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    "px-3 py-1.5 text-xs rounded-full border transition-colors " +
                    (isActive
                      ? "bg-[#E17100] text-white border-[#E17100]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50")
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* 메뉴 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <OwnerMenuItemCard
                key={item.item_id}
                item={item}
                cafeId={cafe.cafe_id}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MyCafeMenuSection;
