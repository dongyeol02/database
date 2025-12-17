// src/type/cart.ts
export type CartItem = {
  item_id: number;
  cafe_id: number;
  item_name: string;
  price: number;
  quantity: number;
};

export type CartState = {
  cafe_name: string | null;

  cafe_id: number | null; // 한 번에 한 카페만 주문한다!!
  items: CartItem[];
  user_reward_id?: number | null;
};
