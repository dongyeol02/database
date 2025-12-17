// src/components/owner/MyCafeSection.tsx
import { useState } from "react";
import type { CafeDetail } from "../../type/store";
import OwnerMenuItemCard from "./OwnerMenuItemCard";

type Props = {
  cafe: CafeDetail;
};

const MyCafeMenuSection = ({ cafe }: Props) => {
  const categories = ["전체", ...new Set(cafe.items.map((i) => i.category))];
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const filteredItems =
    selectedCategory === "전체"
      ? cafe.items
      : cafe.items.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-white rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#7B3306] mb-4">메뉴</h2>

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

      {/* 메뉴 리스트 (읽기 전용) */}
      {filteredItems.length === 0 ? (
        <p className="text-sm text-gray-500 py-6">
          선택한 카테고리에 해당하는 메뉴가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <OwnerMenuItemCard
              key={item.item_id}
              item={item}
              cafeId={cafe.cafe_id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyCafeMenuSection;
