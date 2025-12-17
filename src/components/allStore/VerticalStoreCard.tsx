import type { StoreCardProps } from "../../type/store";
import { Link } from "react-router-dom";
import { primaryButtonHover } from "../Navbar";

const VerticalStoreCard = ({
  cafe_id,
  cafe_name,
  address,
  description,
  operating_hours,
  cafe_image_url,
}: StoreCardProps) => {
  return (
    <article
      className="w-full bg-white rounded-2xl shadow-md overflow-hidden
                 hover:shadow-xl transition-transform duration-150 hover:scale-[1.01] cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        {/* 이미지 영역 */}
        <div className="w-full md:w-64 h-48 bg-gray-100 shrink-0 overflow-hidden">
          <img
            src={cafe_image_url}
            alt={cafe_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 정보 + 버튼 영역 */}
        <div className="flex-1 p-4 flex flex-col gap-2">
          <h3 className="text-xl font-bold text-[#7B3306]">{cafe_name}</h3>
          <p className="text-sm text-gray-600">{address}</p>
          <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
          <p className="text-xs text-gray-500">영업시간: {operating_hours}</p>

          <div className="mt-3 flex gap-3">
            <Link
              to={`/stores/${cafe_id}`}
              className={
                "bg-[#E17100] w-40 text-white text-sm font-semibold px-4 py-2 rounded-lg flex items-center justify-center " +
                primaryButtonHover
              }
            >
              주문하러 가기
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VerticalStoreCard;
