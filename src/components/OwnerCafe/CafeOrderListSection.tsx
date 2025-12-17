// src/components/OwnerCafe/CafeOrderListSection.tsx
import { useEffect, useState } from "react";
import type {
  CafeOrderListResponse,
  OrderStatus,
  UpdateOrderStatusRequest,
} from "../../type/order";
import { dummyCafeOrders } from "../../mock/cafeOrder";
type Props = {
  cafeId: number;
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "접수 대기",
  PREPARING: "제조 중",
  READY: "픽업 준비완료",
  COMPLETED: "완료",
  CANCELLED: "취소",
};

const CafeOrderListSection = ({ cafeId }: Props) => {
  const [orders, setOrders] = useState<CafeOrderListResponse>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">(
    "PENDING"
  );
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  // TODO: GET /cafes/:cafeId/orders?status=...
  useEffect(() => {
    // 실제 API 연동 시:
    // const query = statusFilter === "ALL" ? "" : `?status=${statusFilter}`;
    // const res = await fetch(`/cafes/${cafeId}/orders${query}`);
    // const data: CafeOrderListResponse = await res.json();
    // setOrders(data);

    setOrders(dummyCafeOrders);
  }, [cafeId]);

  const filteredOrders =
    statusFilter === "ALL"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  const handleChangeStatus = async (
    orderId: number,
    nextStatus: OrderStatus
  ) => {
    setIsUpdating(orderId);

    try {
      const body: UpdateOrderStatusRequest = { status: nextStatus };
      console.log("PUT /orders/:orderId/status", orderId, body);

      // TODO: 실제 API 호출
      // const res = await fetch(`/orders/${orderId}/status`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });
      // const data: UpdateOrderStatusResponse = await res.json();

      // 낙관적 업데이트
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === orderId ? { ...o, status: nextStatus } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("주문 상태 변경 중 오류가 발생했습니다.");
    } finally {
      setIsUpdating(null);
    }
  };

  const nextStatusOptions: OrderStatus[] = [
    "PENDING",
    "PREPARING",
    "READY",
    "COMPLETED",
    "CANCELLED",
  ];

  return (
    <section className="bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#7B3306]">카페 주문 목록</h2>

        <div className="flex gap-2 text-xs">
          {[
            { value: "ALL" as const, label: "전체" },
            { value: "PENDING" as const, label: "접수 대기" },
            { value: "PREPARING" as const, label: "제조 중" },
            { value: "READY" as const, label: "픽업 준비완료" },
            { value: "COMPLETED" as const, label: "완료" },
            { value: "CANCELLED" as const, label: "취소" },
          ].map((btn) => {
            const active = statusFilter === btn.value;
            return (
              <button
                key={btn.value}
                onClick={() =>
                  setStatusFilter(btn.value as typeof statusFilter)
                }
                className={
                  "px-2.5 py-1 rounded-full border transition-colors " +
                  (active
                    ? "bg-[#E17100] text-white border-[#E17100]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50")
                }
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-sm text-gray-500 py-4">
          선택한 상태의 주문이 없습니다.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredOrders.map((order) => (
            <article
              key={order.order_id}
              className="border border-gray-100 rounded-2xl px-4 py-3 flex flex-col gap-2 bg-[#FFFBED]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    주문번호 #{order.order_id} · {order.order_date}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {order.user_nickname} 님
                  </p>
                </div>
                <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-white text-[#7B3306] border border-[#FBD1A4]">
                  {statusLabels[order.status]}
                </span>
              </div>

              <div className="text-[11px] text-gray-600">
                {order.orderDetails
                  .map((d) => `${d.item_name} ${d.quantity}개`)
                  .join(" · ")}
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="text-sm text-gray-700">
                  총 {order.total_price.toLocaleString()}원
                </span>

                <div className="flex gap-1">
                  {nextStatusOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleChangeStatus(order.order_id, s)}
                      disabled={
                        isUpdating === order.order_id || order.status === s
                      }
                      className={
                        "px-2 py-1 text-[11px] rounded-full border " +
                        (order.status === s
                          ? "bg-[#E17100] text-white border-[#E17100]"
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 disabled:opacity-50")
                      }
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CafeOrderListSection;
