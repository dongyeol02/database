// src/pages/StampPage.tsx
import { useEffect, useState } from "react";
import OwnedCouponsSection from "../components/stamp/OwnedCouponsSection";
import StampGuideSection from "../components/stamp/StampGuideSection";
import StampSummaryCard from "../components/stamp/StampSummary";
import { fetchUserStamps, fetchRewardPolicies } from "../apis/stampApi";

import { useAuthStore } from "../store/useAuthStore";
import type { StampStatus, UserReward, RewardPolicy } from "../type/stamp";

const StampPage = () => {
  const user_id = useAuthStore((s) => s.user_id);

  const [stampStatus, setStampStatus] = useState<StampStatus>({
    total_stamps: 0,
    histories: [],
  });
  const [activeRewards, setActiveRewards] = useState<UserReward[]>([]);
  const [rewardPolicy, setRewardPolicy] = useState<RewardPolicy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user_id) {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      try {
        const [stampData, rewardPolicies] = await Promise.all([
          fetchUserStamps(user_id),
          fetchRewardPolicies(),
        ]);

        setStampStatus({
          total_stamps: stampData.total_stamps,
          histories: stampData.histories,
        });
        setActiveRewards(stampData.user_rewards.filter((r) => !r.is_used));

        const activePolicy =
          rewardPolicies.find((r) => r.is_active) ?? rewardPolicies[0] ?? null;
        setRewardPolicy(activePolicy);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [user_id]);

  if (!user_id) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] pt-8 px-20">
        <section className="w-full mx-auto">
          <p className="text-sm text-gray-500">
            스탬프를 조회하려면 먼저 로그인해주세요.
          </p>
        </section>
      </main>
    );
  }

  if (isLoading || !rewardPolicy) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] pt-8 px-20">
        <section className="w-full mx-auto">
          <p className="text-sm text-gray-500">스탬프 정보를 불러오는 중...</p>
        </section>
      </main>
    );
  }

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
