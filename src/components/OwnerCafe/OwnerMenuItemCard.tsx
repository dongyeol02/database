// src/components/owner/OwnerMenuItemCard.tsx
import { useNavigate } from "react-router-dom";
import type { MenuItem } from "../../type/store";

type Props = {
  item: MenuItem;
  cafeId: number;
};

const OwnerMenuItemCard = ({ item, cafeId }: Props) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/ownercafedetail/${cafeId}/menus/${item.item_id}/edit`);
  };

  return (
    <article className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-150 overflow-hidden flex flex-col">
      <div className="w-full aspect-5/3 bg-gray-100 overflow-hidden">
        {item.item_image_url && (
          <img
            src={item.item_image_url}
            alt={item.item_name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-3 flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item.item_name}
        </h3>
        <p className="text-xs text-gray-500 truncate">{item.description}</p>
        <p className="mt-1 text-sm font-bold text-[#7B3306]">
          {item.price.toLocaleString()}원
        </p>
      </div>
      <div className="px-3 pb-3">
        <button
          type="button"
          onClick={handleEditClick}
          className="w-full text-xs font-semibold text-white  bg-[#E17100] rounded-lg py-1.5 hover:bg-[#cf6400] transition-colors"
        >
          메뉴 수정하기
        </button>
      </div>
    </article>
  );
};

export default OwnerMenuItemCard;
