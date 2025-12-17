// src/pages/StampPage.tsx
import {
  dummyRewardPolicies,
  dummyStampStatus,
  dummyUserRewards,
} from "../mock/stamp";

import OwnedCouponsSection from "../components/stamp/OwnedCouponsSection";
import StampGuideSection from "../components/stamp/StampGuideSection";
import StampSummaryCard from "../components/stamp/StampSummary";

const StampPage = () => {
  const stampStatus = dummyStampStatus;
  const rewardPolicy = dummyRewardPolicies[0];
  const activeRewards = dummyUserRewards.filter((r) => !r.is_used);

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] pt-8 px-20">
      <section className="w-full mx-auto flex flex-col gap-6">
        <header className="flex px-10 items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#7B3306]">내 스탬프</h1>
            <p className="text-sm text-gray-500">
              {stampStatus.total_stamps}/{rewardPolicy.stamps_required} 스탬프
            </p>
          </div>
        </header>

        <StampSummaryCard
          stampStatus={stampStatus}
          rewardPolicy={rewardPolicy}
        />

        <OwnedCouponsSection activeRewards={activeRewards} />

        <StampGuideSection rewardPolicy={rewardPolicy} />
      </section>
    </main>
  );
};

export default StampPage;
