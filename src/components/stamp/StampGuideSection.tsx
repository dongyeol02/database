import type { RewardPolicy } from "../../type/Stamp";

type Props = {
  rewardPolicy: RewardPolicy;
};

const StampGuideSection = ({ rewardPolicy }: Props) => {
  return (
    <section className="bg-[#F4F6FF] rounded-2xl px-5 py-4 text-xs text-[#4B5563] leading-relaxed">
      <p className="font-semibold mb-2 text-[#374151]">스탬프 안내</p>
      <ul className="list-disc pl-4 space-y-1">
        <li>주문 1건당 스탬프 1개가 적립됩니다.</li>
        <li>모든 제휴 카페에서 공유되는 통합 스탬프입니다.</li>
        <li>
          {rewardPolicy.stamps_required}개를 모으면 {rewardPolicy.reward_name}
          을(를) 받을 수 있습니다.
        </li>
        <li>쿠폰은 장바구니에서 사용 가능합니다.</li>
      </ul>
    </section>
  );
};

export default StampGuideSection;
