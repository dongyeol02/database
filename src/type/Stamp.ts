// src/types/stamp.ts
export type StampHistory = {
  stamps_earned: number;
  created_at: string;
  order_id: number;
};

export type StampStatus = {
  total_stamps: number;
  histories: StampHistory[];
};

export type UserReward = {
  user_reward_id: number;
  reward_id: number;
  reward_name: string;
  is_used: boolean;
  used_at: string | null;
  expires_at: string;
  discount_value: number;
};

// GET /api/v1/rewards/stamps 응답 전체
export type StampApiResponse = {
  total_stamps: number;
  histories: StampHistory[];
  user_rewards: UserReward[];
};

export type RewardPolicy = {
  reward_id: number;
  stamps_required: number;
  reward_name: string;
  discount_value: number;
  is_active: boolean;
};
