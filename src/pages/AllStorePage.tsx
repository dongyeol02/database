import VerticalStoreCard from "../components/allStore/VerticalStoreCard";
import { dummyStores } from "../mock/store";

const AllStoresPage = () => {
  return (
    <main className="w-full mx-auto px-10 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-[#7B3306] mb-6">
        전체 가게
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        스마트 오더가 가능한 카페를 둘러보고, 원하는 가게를 선택해 주문해
        보세요.
      </p>

      <section className="flex flex-col gap-6">
        {dummyStores.map((store) => (
          <VerticalStoreCard key={store.cafe_id} {...store} />
        ))}
      </section>
    </main>
  );
};

export default AllStoresPage;
