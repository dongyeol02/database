import { dummyCafeDetail } from "../mock/store";
import CafeInfoCard from "../components/cafe/CafeInfoCard";
import CafeMenuSection from "../components/cafe/CafeMenuSection";

const CafeDetailPage = () => {
  const cafe = dummyCafeDetail;

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-6 md:px-20">
      <section className="w-full mx-auto flex flex-col gap-8">
        <CafeInfoCard cafe={cafe} />
        <CafeMenuSection cafe={cafe} />
      </section>
    </main>
  );
};

export default CafeDetailPage;
