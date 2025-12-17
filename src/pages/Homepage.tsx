import Intro from "../components/home/Intro";
import StoreCard from "../components/home/StoreCard";
import { dummyStores } from "../mock/store";

const Homepage = () => {
  return (
    <div className="w-full min-h-max pb-20">
      <Intro />
      <section className="w-full mt-10 px-10">
        <h2 className="text-2xl font-bold text-[#7B3306] mb-6">내 주변 카페</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyStores.map((store) => (
            <StoreCard key={store.cafe_id} {...store} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
