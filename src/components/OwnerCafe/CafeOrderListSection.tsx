// src/components/OwnerCafe/CafeOrderListSection.tsx
import { useEffect, useState, useCallback } from "react";
import {
  Clock,
  CheckCircle2,
  Package,
  User,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import type {
  CafeOrder,
  OrderDetailItem,
  OrderStatus,
  UpdateOrderStatusRequest,
} from "../../type/order";
import { getCafeOrders, updateOrderStatus } from "../../apis/orderApi";

type Props = {
  cafeId: number;
};

type FilterStatus = OrderStatus | "ALL";

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "접수 대기",
  PREPARING: "제조 중",
  READY: "픽업 준비완료",
  COMPLETED: "완료",
  CANCELLED: "취소",
};

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  PENDING: <Clock size={14} className="text-yellow-500" />,
  PREPARING: <Package size={14} className="text-blue-500" />,
  READY: <CheckCircle2 size={14} className="text-emerald-500" />,
  COMPLETED: <CheckCircle2 size={14} className="text-green-500" />,
  CANCELLED: <AlertCircle size={14} className="text-red-500" />,
};

const safeOrderDetails = (
  details?: OrderDetailItem[] | null
): OrderDetailItem[] => {
  return Array.isArray(details) ? details : [];
};

const CafeOrderListSection = ({ cafeId }: Props) => {
  const [orders, setOrders] = useState<CafeOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("PENDING");
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setOrders([]);
      const data = await getCafeOrders(
        cafeId,
        statusFilter === "ALL" ? undefined : statusFilter
      );

      if (Array.isArray(data)) {
        setOrders(data);
        console.log(data);
      } else {
        setOrders([]);
        console.warn("API 응답이 배열이 아닙니다:", data);
      }
    } catch (err) {
      console.error("카페 주문 조회 실패:", err);
      setError("주문 목록을 불러오지 못했습니다.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [cafeId, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleChangeStatus = async (
    orderId: number,
    nextStatus: OrderStatus
  ) => {
    if (updatingOrderId === orderId) return;

    setUpdatingOrderId(orderId);

    try {
      const body: UpdateOrderStatusRequest = { status: nextStatus };

      setOrders((prev) =>
        prev.map((order) =>
          order.order_id === orderId ? { ...order, status: nextStatus } : order
        )
      );

      await updateOrderStatus(orderId, body);
    } catch (err) {
      fetchOrders();
      setError("주문 상태 변경 중 오류가 발생했습니다.");
      console.error("주문 상태 변경 실패:", err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const filteredOrders: CafeOrder[] =
    statusFilter === "ALL"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const handleRefresh = () => {
    fetchOrders();
  };

  // 🔥 로딩 컴포넌트 조기 리턴
  if (loading) {
    return (
      <section className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-10 h-10 animate-spin text-[#E17100] mx-auto mb-4" />
          <span className="text-lg text-gray-500">
            주문 목록을 불러오는 중...
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      {/* 헤더 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFE7C7] to-[#FFDAC1] rounded-2xl flex items-center justify-center shadow-lg">
            <User size={24} className="text-[#E17100]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#7B3306]">
              카페 주문 목록
            </h2>
            <p className="text-sm text-gray-500">
              총{" "}
              <span className="font-semibold text-[#E17100]">
                {filteredOrders.length}
              </span>
              건
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#FFE7C7] text-[#7B3306] rounded-xl font-medium hover:bg-[#E17100] hover:text-white transition-all duration-200 shadow-md disabled:opacity-50 flex-shrink-0"
          >
            <RefreshCw size={16} />
            새로고침
          </button>

          <div className="flex gap-1 bg-gray-50 rounded-2xl p-1 shadow-inner flex-wrap w-full sm:w-auto">
            {[
              {
                value: "ALL" as FilterStatus,
                label: "전체",
                icon: <User size={14} className="text-gray-500" />,
              },
              {
                value: "PENDING" as FilterStatus,
                label: "접수 대기",
                icon: statusIcons.PENDING,
              },
              {
                value: "PREPARING" as FilterStatus,
                label: "제조 중",
                icon: statusIcons.PREPARING,
              },
              {
                value: "READY" as FilterStatus,
                label: "픽업 준비완료",
                icon: statusIcons.READY,
              },
              {
                value: "COMPLETED" as FilterStatus,
                label: "완료",
                icon: statusIcons.COMPLETED,
              },
              {
                value: "CANCELLED" as FilterStatus,
                label: "취소",
                icon: statusIcons.CANCELLED,
              },
            ].map((btn) => {
              const active = statusFilter === btn.value;
              return (
                <button
                  key={String(btn.value)}
                  onClick={() => setStatusFilter(btn.value)}
                  disabled={loading}
                  className={
                    "px-3 py-2.5 justify-center rounded-xl transition-all duration-200 flex items-center gap-2 text-xs sm:text-sm font-semibold shadow-sm whitespace-nowrap flex-1 sm:flex-none " +
                    (active
                      ? "bg-gradient-to-r from-[#E17100] to-[#F59E0B] text-white shadow-orange-300/50 !scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md hover:scale-[1.02]")
                  }
                >
                  {btn.icon}
                  <span className="hidden sm:inline">{btn.label}</span>
                  <span className="sm:hidden">
                    {btn.label.length > 2 ? btn.label.slice(0, 2) : btn.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 에러 상태 */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-red-700 font-medium truncate">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors"
            >
              다시 불러오기
            </button>
          </div>
        </div>
      )}

      {/* 빈 상태 */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16">
          <User className="w-20 h-20 mx-auto mb-6 text-gray-300" />
          <p className="text-xl font-semibold text-gray-500 mb-2">
            {statusFilter === "ALL"
              ? "주문 내역이 없습니다."
              : "선택한 상태의 주문이 없습니다."}
          </p>
          <p className="text-gray-400">첫 주문을 기다리고 있어요!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <article
              key={order.order_id}
              className="bg-gradient-to-r **from-amber-50 to-orange-100** rounded-2xl p-6 border-2 border-orange-100/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* 상단: 주문자 정보 & 상태 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md border">
                    <User size={20} className="text-[#7B3306]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#7B3306] truncate">
                      {order.customer_name || "고객"} 님
                    </p>
                    <p className="text-xs text-gray-500">
                      주문번호 #{order.order_id} ·{" "}
                      {order.order_date || "날짜 없음"}
                    </p>
                  </div>
                </div>

                <span className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-sm font-bold shadow-md flex items-center gap-2 border border-gray-200">
                  {statusIcons[order.status] || (
                    <Clock size={14} className="text-gray-500" />
                  )}
                  {statusLabels[order.status] || "알 수 없음"}
                </span>
              </div>

              {/* 🔥 안전한 orderDetails.map */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4 border border-orange-200/50">
                <div className="flex flex-wrap gap-2 text-sm text-gray-700 mb-3 min-h-[20px]">
                  {safeOrderDetails(order.order_details).map((detail, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-100 px-3 py-1 rounded-full font-medium text-xs"
                    >
                      {detail.item_name || "메뉴"} ×{detail.quantity || 0}
                    </span>
                  ))}
                  {safeOrderDetails(order.order_details).length === 0 && (
                    <span className="text-gray-400 text-xs">
                      메뉴 정보 없음
                    </span>
                  )}
                </div>
                <p className="text-lg font-bold text-[#7B3306]">
                  총 {order.total_price?.toLocaleString() || 0}원
                </p>
              </div>

              {/* 상태 변경 버튼들 */}
              <div className="flex gap-2 flex-wrap">
                {[
                  "PENDING",
                  "PREPARING",
                  "READY",
                  "COMPLETED",
                  "CANCELLED",
                ].map((status) => {
                  const currentStatus = status as OrderStatus;
                  const isCurrent = order.status === currentStatus;
                  const isUpdating = updatingOrderId === order.order_id;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        handleChangeStatus(order.order_id, currentStatus)
                      }
                      disabled={isUpdating || isCurrent}
                      className={
                        " py-2.5 text-sm font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 flex-1 min-w-[70px] " +
                        (isCurrent
                          ? "bg-[#E17100] text-white shadow-orange-400/50 cursor-default"
                          : isUpdating
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed animate-pulse"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02]")
                      }
                    >
                      {statusIcons[currentStatus]}
                      <span className="whitespace-nowrap">
                        {statusLabels[currentStatus]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CafeOrderListSection;
