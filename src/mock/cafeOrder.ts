// src/mock/cafeOrders.ts
import type { CafeOrderListResponse } from "../type/order";

export const dummyCafeOrders: CafeOrderListResponse = [
  {
    order_id: 1,
    user_id: 101,
    user_nickname: "커피러버",
    total_price: 8200,
    status: "PENDING",
    order_date: "2025-12-17 15:32",
    orderDetails: [
      { item_name: "아메리카노", quantity: 2, price_per_item: 4100 },
    ],
  },
  {
    order_id: 2,
    user_id: 102,
    user_nickname: "latte_king",
    total_price: 6100,
    status: "PREPARING",
    order_date: "2025-12-17 15:20",
    orderDetails: [
      { item_name: "카페라떼", quantity: 1, price_per_item: 4100 },
      { item_name: "치즈케이크", quantity: 1, price_per_item: 2000 },
    ],
  },
];
