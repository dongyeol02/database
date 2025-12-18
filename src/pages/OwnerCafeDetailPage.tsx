import CafeInfoCard from "../components/cafe/CafeInfoCard";

import type { CafeDetail } from "../type/store";
import { dummyCafeDetail } from "../mock/store";
import MenuManageSummary from "../components/OwnerCafe/MenuManageSummary";
import MyCafeMenuSection from "../components/OwnerCafe/MyCafeMenuSection";
import CafeOrderListSection from "../components/OwnerCafe/CafeOrderListSection";

const OwnerCafeDetailPage = () => {
  const cafe: CafeDetail = dummyCafeDetail;

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-6 md:px-20">
      <section className="w-full mx-auto flex flex-col gap-6">
        <CafeInfoCard cafe={cafe} />

        <CafeOrderListSection cafeId={1} />
        <MenuManageSummary
          menuCount={cafe.items.length}
          cafeId={cafe.cafe_id}
        />
        <MyCafeMenuSection cafe={cafe} />
      </section>
    </main>
  );
};

export default OwnerCafeDetailPage;
