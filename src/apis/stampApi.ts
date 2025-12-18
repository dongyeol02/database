// src/apis/stampApi.ts

import type { RewardPolicy, StampApiResponse } from "../type/stamp";
import { Api } from "./authApi";

export const fetchUserStamps = async (userId: number) => {
  const res = await Api.get<StampApiResponse>(`/api/v1/rewards/stamps`, {
    params: { userId },
  });
  return res.data;
};

export const fetchRewardPolicies = async (): Promise<RewardPolicy[]> => {
  const res = await Api.get<RewardPolicy[]>("/api/v1/rewards");
  return res.data;
};
