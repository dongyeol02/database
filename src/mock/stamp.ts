// src/mocks/stamp.ts

import type { StampStatus, RewardPolicy, UserReward } from "../type/Stamp";

export const dummyStampStatus: StampStatus = {
  total_stamps: 7,
  histories: [
    { stamps_earned: 1, created_at: "2025-12-01", order_id: 101 },
    { stamps_earned: 2, created_at: "2025-12-03", order_id: 102 },
    { stamps_earned: 4, created_at: "2025-12-10", order_id: 103 },
  ],
};

export const dummyRewardPolicies: RewardPolicy[] = [
  {
    reward_id: 1,
    stamps_required: 10,
    reward_name: "무료 음료 쿠폰",
    discount_value: 5000,
    is_active: true,
  },
];

export const dummyUserRewards: UserReward[] = [
  {
    user_reward_id: 1,
    reward_id: 1,
    reward_name: "음료 할인 쿠폰",
    is_used: false,
    used_at: null,
    expires_at: "2026-01-31",
    discount_value: 5000,
  },
  {
    user_reward_id: 2,
    reward_id: 1,
    reward_name: "음료 할인 쿠폰",
    is_used: true,
    used_at: "2025-12-10",
    expires_at: "2025-12-31",
    discount_value: 5000,
  },
  {
    user_reward_id: 3,
    reward_id: 1,
    reward_name: "음료 할인 쿠폰",
    is_used: false,
    used_at: "2025-12-10",
    expires_at: "2025-12-31",
    discount_value: 5000,
  },
];
