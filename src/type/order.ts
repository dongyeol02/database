// src/type/order.ts
export type OrderDetailItem = {
  item_name: string;
  quantity: number;
  price_per_item: number;
};

export type OrderSummary = {
  order_id: number;
  cafe_name: string;
  total_price: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED"; // 예시
  order_date: string; // ISO 문자열 or yyyy-MM-dd
  orderDetails: OrderDetailItem[];
};

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type CafeOrder = {
  order_id: number;
  user_id: number;
  user_nickname: string;
  total_price: number;
  status: OrderStatus;
  order_date: string;
  orderDetails: OrderDetailItem[];
};

export type CafeOrderListResponse = CafeOrder[];

export type UpdateOrderStatusRequest = {
  status: OrderStatus;
};

export type UpdateOrderStatusResponse = {
  order_id: number;
  status: OrderStatus;
};
