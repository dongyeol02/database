// src/types/stamp.ts
export type StampHistory = {
  stamps_earned: number; // 적립된 스탬프 개수
  created_at: string;
  order_id: number;
};

export type StampStatus = {
  total_stamps: number; // 총 적립 개수
  histories: StampHistory[];
};

export type RewardPolicy = {
  reward_id: number;
  stamps_required: number;
  reward_name: string;
  discount_value: number;
  is_active: boolean;
};

export type UserReward = {
  user_reward_id: number;
  reward_id: number;
  reward_name: string; // 편의를 위해 이름까지 합쳐 둠
  is_used: boolean;
  used_at: string | null;
  expires_at: string;
  discount_value: number;
};
