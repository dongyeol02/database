import { Link } from "react-router-dom";
import type { StoreCardProps } from "../../type/store";
import { primaryButtonHover } from "../Navbar";

const StoreCard = ({
  cafe_id,
  cafe_name,
  address,
  description,
  operating_hours,
  cafe_image_url,
}: StoreCardProps) => {
  return (
    <article
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl
                 transition-transform duration-450 cursor-pointer hover:scale-105"
    >
      <div className="w-full aspect-2/1 bg-gray-100 overflow-hidden">
        <img
          src={cafe_image_url}
          alt={cafe_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-[#7B3306]">{cafe_name}</h3>
        <p className="text-sm text-gray-600">{address}</p>
        <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
        <p className="text-xs text-gray-500 mt-1">
          영업시간: {operating_hours}
        </p>
        <Link
          to={`/store/${cafe_id}`}
          className={`w-full bg-[#E17100] h-10 text-white rounded-xl flex items-center justify-center ${primaryButtonHover}`}
        >
          주문하러 가기
        </Link>
      </div>
    </article>
  );
};

export default StoreCard;
