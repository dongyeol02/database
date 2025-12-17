import type { CafeDetail } from "../../type/store";

type Props = {
  cafe: CafeDetail;
};

const CafeInfoCard = ({ cafe }: Props) => {
  return (
    <section className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-72 h-56 md:h-auto bg-gray-100 shrink-0">
        <img
          src={cafe.cafe_image_url}
          alt={cafe.cafe_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-[#7B3306]">{cafe.cafe_name}</h1>
        <p className="text-sm text-gray-600">{cafe.address}</p>
        <p className="text-sm text-gray-600">전화번호: {cafe.phone_number}</p>
        <p className="text-sm text-gray-700">{cafe.description}</p>
        <p className="text-xs text-gray-500">
          영업시간: {cafe.operating_hours}
        </p>
      </div>
    </section>
  );
};

export default CafeInfoCard;
