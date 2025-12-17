import type { UserReward } from "../../type/Stamp";

type Props = {
  activeRewards: UserReward[];
};

const OwnedCouponsSection = ({ activeRewards }: Props) => {
  return (
    <section className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#7B3306]">
            보유 쿠폰
          </span>
        </div>
        <span className="text-xs text-gray-500">{activeRewards.length}장</span>
      </div>

      {activeRewards.length === 0 ? (
        <div className="px-5 py-6 text-sm text-gray-500">
          아직 보유 중인 쿠폰이 없습니다.
        </div>
      ) : (
        <div className="px-5 py-4">
          {activeRewards.map((reward) => (
            <div
              key={reward.user_reward_id}
              className="bg-[#FFF7DD] border border-[#FFE2A3] rounded-xl px-4 py-3 flex items-center justify-between mb-3 last:mb-0"
            >
              <div>
                <p className="text-sm font-semibold text-[#7B3306]">
                  {reward.reward_name}
                </p>
                <p className="text-xs text-gray-500">
                  장바구니에서 사용 가능 · 만료일 {reward.expires_at}
                </p>
              </div>
              <span className="text-sm font-bold text-[#E17100]">
                {reward.discount_value}원
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OwnedCouponsSection;
