// src/type/order.ts
export type OrderDetailItem = {
  item_name: string;
  quantity: number;
  price_per_item: number;
};

// 고객용 주문 내역 (snake_case)
export type OrderSummary = {
  order_id: number;
  cafe_name: string;
  total_price: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  order_date: string;
  order_details: OrderDetailItem[];
};

// 사장님용 주문 (API 응답과 정확히 일치)
export type CafeOrder = {
  order_id: number;
  user_id: number;
  customer_name: string;
  total_price: number;
  status: OrderStatus;
  order_date: string;
  order_details: OrderDetailItem[]; // 🔥 snake_case로 수정!
};

export type CafeOrderListResponse = CafeOrder[];

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type UpdateOrderStatusRequest = { status: OrderStatus };
export type UpdateOrderStatusResponse = {
  order_id: number;
  status: OrderStatus;
};

export type CreateOrderItem = {
  item_id: number;
  quantity: number;
  price_per_item: number;
};
export type CreateOrderRequest = {
  cafe_id: number;
  items: CreateOrderItem[];
  user_reward_id?: number | null;
};
