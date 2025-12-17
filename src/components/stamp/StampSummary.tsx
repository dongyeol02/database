import { Coffee } from "lucide-react";
import type { StampStatus, RewardPolicy } from "../../type/stamp";

type Props = {
  stampStatus: StampStatus;
  rewardPolicy: RewardPolicy;
};

const StampSummaryCard = ({ stampStatus, rewardPolicy }: Props) => {
  const progress = Math.min(
    (stampStatus.total_stamps / rewardPolicy.stamps_required) * 100,
    100
  ).toFixed(0);

  return (
    <section className="w-full bg-gradient-to-r from-[#FF8A00] to-[#FF5E3A] rounded-3xl p-6 px-20 text-white shadow-lg aspect-4/1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold">통합 스탬프</p>
          <p className="text-xs opacity-80">
            모든 제휴 카페에서 공유되는 스탬프입니다.
          </p>
        </div>
        <div className="text-right text-sm">진행률 {progress}%</div>
      </div>

      {/* 진행률 바 */}
      <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-white rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 스탬프 칸 */}
      <div className="grid grid-cols-5 gap-3 mb-3">
        {Array.from({ length: rewardPolicy.stamps_required }).map(
          (_, index) => {
            const filled = index < stampStatus.total_stamps;
            return (
              <div
                key={index}
                className={`aspect-2/1 rounded-2xl border border-white/40 flex items-center justify-center text-2xl
                  ${
                    filled
                      ? "bg-white/90 text-[#FF8A00]"
                      : "bg-white/10 text-white/70"
                  }`}
              >
                <Coffee size={45} />
              </div>
            );
          }
        )}
      </div>

      <p className="text-xs text-center opacity-90">
        {rewardPolicy.stamps_required - stampStatus.total_stamps}개만 더 모으면{" "}
        {rewardPolicy.reward_name}을(를) 받을 수 있어요!
      </p>
    </section>
  );
};

export default StampSummaryCard;
