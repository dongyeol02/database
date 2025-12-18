// src/apis/orderApi.ts
import type {
  CreateOrderRequest,
  OrderSummary,
  CafeOrderListResponse,
  UpdateOrderStatusRequest,
  UpdateOrderStatusResponse,
} from "../type/order";
import { Api } from "./authApi";

export const createOrder = async (userId: number, body: CreateOrderRequest) => {
  const res = await Api.post("/orders", body, {
    headers: {
      "X-USER-ID": String(userId),
    },
  });
  return res.data;
};

// 내 주문 내역 조회
export const getMyOrders = async (userId: number): Promise<OrderSummary[]> => {
  const res = await Api.get("/users/me/orders", {
    headers: {
      "X-USER-ID": String(userId),
    },
  });
  return res.data;
};

// 사장님용: 카페 주문 목록 조회
export const getCafeOrders = async (
  cafeId: number,
  status?: string
): Promise<CafeOrderListResponse> => {
  const query = status ? `?status=${status}` : "";
  const res = await Api.get(`/cafes/${cafeId}/orders${query}`);
  return res.data;
};

// 사장님용: 주문 상태 변경
export const updateOrderStatus = async (
  orderId: number,
  body: UpdateOrderStatusRequest
): Promise<UpdateOrderStatusResponse> => {
  const res = await Api.put(`/orders/${orderId}/status`, body);
  return res.data;
};
