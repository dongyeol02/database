// src/pages/OrderHistoryPage.tsx
import { useState } from "react";
import { Coffee, Clock, CheckCircle2, XCircle } from "lucide-react";

import type { OrderSummary } from "../type/order";
import { dummyOrders } from "../mock/order";

const statusLabels: Record<OrderSummary["status"], string> = {
  PENDING: "진행중",
  COMPLETED: "완료",
  CANCELLED: "취소",
};

const OrderHistoryPage = () => {
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | OrderSummary["status"]
  >("ALL");

  const filteredOrders =
    statusFilter === "ALL"
      ? dummyOrders
      : dummyOrders.filter((o) => o.status === statusFilter);

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-4 md:px-20">
      <section className="w-full px-20 mx-auto flex flex-col gap-6">
        {/* 헤더 */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFE7C7] flex items-center justify-center">
              <Coffee size={22} color="#E17100" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#7B3306]">주문 내역</h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <Clock size={16} className="text-gray-400" />
                최근 주문 기록과 상태를 확인할 수 있어요.
              </p>
            </div>
          </div>

          {/* 상태 필터 */}
          <div className="flex gap-2 text-sm">
            {[
              { value: "ALL", label: "전체" },
              { value: "PENDING", label: "진행중" },
              { value: "COMPLETED", label: "완료" },
              { value: "CANCELLED", label: "취소" },
            ].map((btn) => {
              const isActive = statusFilter === btn.value;
              return (
                <button
                  key={btn.value}
                  onClick={() =>
                    setStatusFilter(btn.value as typeof statusFilter)
                  }
                  className={
                    "px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1 " +
                    (isActive
                      ? "bg-[#E17100] text-white border-[#E17100]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50")
                  }
                >
                  {btn.value === "COMPLETED" && <CheckCircle2 size={14} />}
                  {btn.value === "CANCELLED" && <XCircle size={14} />}
                  {btn.value === "PENDING" && <Clock size={14} />}
                  {btn.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* 내용 */}
        {filteredOrders.length === 0 ? (
          <section className="bg-white rounded-2xl shadow-md p-10 text-center">
            <p className="text-base text-gray-500">
              선택한 상태의 주문 내역이 없습니다.
            </p>
          </section>
        ) : (
          <section className="flex flex-col gap-4">
            {filteredOrders.map((order) => (
              <article
                key={order.order_id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-150"
              >
                {/* 상단: 카페/상태/날짜 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FFF3E0] flex items-center justify-center">
                      <Coffee size={18} color="#E17100" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#7B3306]">
                        {order.cafe_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        주문번호 #{order.order_id} · {order.order_date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={
                      "text-xs font-semibold px-2.5 py-1.5 rounded-full flex items-center gap-1 " +
                      (order.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-600")
                    }
                  >
                    {order.status === "COMPLETED" && <CheckCircle2 size={14} />}
                    {order.status === "CANCELLED" && <XCircle size={14} />}
                    {order.status === "PENDING" && <Clock size={14} />}
                    {statusLabels[order.status]}
                  </span>
                </div>

                {/* 중간: 메뉴 목록 요약 */}
                <div className="bg-[#FFFBED] rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#7B3306]">
                      주문 메뉴 (
                      {order.orderDetails.reduce(
                        (sum, d) => sum + d.quantity,
                        0
                      )}
                      개)
                    </span>
                    <span className="text-xs text-gray-400">
                      {order.orderDetails[0]?.item_name}
                      {order.orderDetails.length > 1 &&
                        ` 외 ${order.orderDetails.length - 1}개`}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {order.orderDetails.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm bg-white rounded-lg px-3 py-2"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-[#111827]">
                            {detail.item_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            수량 {detail.quantity}개 · 단가{" "}
                            {detail.price_per_item.toLocaleString()}원
                          </span>
                        </div>
                        <span className="font-semibold text-[#7B3306]">
                          {(
                            detail.price_per_item * detail.quantity
                          ).toLocaleString()}
                          원
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 하단: 총액 */}
                <div className="flex items-center justify-between text-base">
                  <span className="text-gray-600">총 결제 금액</span>
                  <span className="font-bold text-[#7B3306]">
                    {order.total_price.toLocaleString()}원
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
};

export default OrderHistoryPage;
