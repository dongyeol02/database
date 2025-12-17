import { useState } from "react";
import type { MenuItem } from "../../type/store";

type MenuItemCardProps = {
  item: MenuItem;
  cafeId: number;
  cafeName: string;
  onAddToCart: (payload: {
    cafe_name: string;
    item_id: number;
    cafe_id: number;
    item_name: string;
    price: number;
    quantity: number;
  }) => void;
};

const MenuItemCard = ({
  item,
  cafeId,
  cafeName,
  onAddToCart,
}: MenuItemCardProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => Math.min(10, q + 1));
  };

  const handleAddToCart = () => {
    onAddToCart({
      cafe_name: cafeName,
      item_id: item.item_id,
      cafe_id: cafeId,
      item_name: item.item_name,
      price: item.price,
      quantity,
    });
  };

  return (
    <article className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-150 overflow-hidden flex flex-col">
      <div className="w-full aspect-5/3 bg-gray-100 overflow-hidden">
        <img
          src={item.item_image_url}
          alt={item.item_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#111827] line-clamp-1">
            {item.item_name}
          </h3>
          <span className="text-sm font-bold text-[#7B3306]">
            {item.price.toLocaleString()}원
          </span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
        <p className="text-[11px] text-gray-400">카테고리: {item.category}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            className="w-6 h-6 rounded-full border text-xs flex items-center justify-center"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="text-xs w-6 text-center">{quantity}</span>
          <button
            type="button"
            className="w-6 h-6 rounded-full border text-xs flex items-center justify-center"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="mt-2 inline-flex items-center justify-center px-3 py-1.5 rounded-lg
                     bg-[#E17100] text-white text-xs font-semibold
                     transition-transform duration-150 hover:scale-105 active:scale-95"
          onClick={handleAddToCart}
        >
          장바구니에 담기
        </button>
      </div>
    </article>
  );
};

export default MenuItemCard;
