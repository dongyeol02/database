// components/CafeMenuSection.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CafeDetail } from "../../type/store";
import { useCart } from "../context/CartContext";
import CartConfirmModal from "./CartConfirmModal";
import MenuItemCard from "./MenuItemCard";

type Props = {
  cafe: CafeDetail;
};

const CafeMenuSection = ({ cafe }: Props) => {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastAddedItemName, setLastAddedItemName] = useState("");

  const hasItems = cafe.items.length > 0;

  const categories = hasItems
    ? ["전체", ...new Set(cafe.items.map((i) => i.category))]
    : ["전체"];

  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const filteredItems =
    selectedCategory === "전체"
      ? cafe.items
      : cafe.items.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (payload: {
    cafe_name: string;
    item_id: number;
    cafe_id: number;
    item_name: string;
    price: number;
    quantity: number;
  }) => {
    dispatch({ type: "ADD_ITEM", payload });
    setLastAddedItemName(payload.item_name);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-white rounded-3xl shadow-md p-6">
      <h2 className="text-xl font-bold text-[#7B3306] mb-4">메뉴</h2>

      {/* 메뉴가 하나도 없을 때 */}
      {!hasItems ? (
        <p className="text-sm text-gray-500 py-6">
          아직 등록된 메뉴가 없습니다.
        </p>
      ) : (
        <>
          {/* 카테고리 탭 바 */}
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

          {/* 메뉴 리스트: 가로 3 그리드 */}
          {filteredItems.length === 0 ? (
            <p className="text-sm text-gray-500 py-6">
              선택한 카테고리에 해당하는 메뉴가 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.item_id}
                  item={item}
                  cafeId={cafe.cafe_id}
                  cafeName={cafe.cafe_name}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <CartConfirmModal
          itemName={lastAddedItemName}
          onClose={() => setIsModalOpen(false)}
          onGoCart={() => {
            setIsModalOpen(false);
            navigate("/cart");
          }}
        />
      )}
    </section>
  );
};

export default CafeMenuSection;
