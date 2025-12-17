// src/mock/orders.ts
import type { OrderSummary } from "../type/order";

export const dummyOrders: OrderSummary[] = [
  {
    order_id: 101,
    cafe_name: "브라운빈 카페",
    total_price: 13500,
    status: "COMPLETED",
    order_date: "2025-12-15 14:32",
    orderDetails: [
      { item_name: "아메리카노", quantity: 1, price_per_item: 4500 },
      { item_name: "카페라떼", quantity: 1, price_per_item: 5500 },
      { item_name: "초코 라떼", quantity: 1, price_per_item: 3500 },
    ],
  },
  {
    order_id: 102,
    cafe_name: "모닝라떼",
    total_price: 9000,
    status: "PENDING",
    order_date: "2025-12-16 09:10",
    orderDetails: [
      { item_name: "아메리카노", quantity: 2, price_per_item: 4500 },
    ],
  },
  {
    order_id: 103,
    cafe_name: "그린빈 라운지",
    total_price: 6500,
    status: "CANCELLED",
    order_date: "2025-12-10 19:45",
    orderDetails: [
      { item_name: "뉴욕 치즈케이크", quantity: 1, price_per_item: 6500 },
    ],
  },
];
