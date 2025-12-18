// src/pages/CartPage.tsx
import { useEffect, useState } from "react";
import { useCart } from "../components/context/CartContext";
import type { UserReward } from "../type/stamp";
import { fetchUserStamps } from "../apis/stampApi";
import { useAuthStore } from "../store/useAuthStore";

type CreateOrderRequest = {
  cafe_id: number;
  items: {
    item_id: number;
    quantity: number;
    price_per_item: number;
  }[];
  user_reward_id?: number | null;
};

const CartPage = () => {
  const { state, dispatch } = useCart();
  const user_id = useAuthStore((s) => s.user_id);

  const [availableCoupons, setAvailableCoupons] = useState<UserReward[]>([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(true);

  // 쿠폰 불러오기
  useEffect(() => {
    if (!user_id) {
      setIsLoadingCoupons(false);
      return;
    }

    const load = async () => {
      try {
        const stampData = await fetchUserStamps(user_id);
        const usable = stampData.user_rewards.filter((r) => !r.is_used);
        setAvailableCoupons(usable);
        console.log(stampData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingCoupons(false);
      }
    };

    load();
  }, [user_id]);

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const selectedCoupon = availableCoupons.find(
    (c) => c.user_reward_id === state.user_reward_id
  );
  const discount = selectedCoupon ? selectedCoupon.discount_value : 0;
  const finalPrice = Math.max(totalPrice - discount, 0);

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleSelectCoupon = (coupon: UserReward | null) => {
    dispatch({
      type: "SET_REWARD",
      payload: coupon ? coupon.user_reward_id : null,
    });
  };

  const handleOrder = async () => {
    if (!state.cafe_id || state.items.length === 0) return;

    const body: CreateOrderRequest = {
      cafe_id: state.cafe_id,
      items: state.items.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
        price_per_item: item.price,
      })),
      user_reward_id: state.user_reward_id ?? null,
    };

    console.log("POST /orders payload:", body);
    // TODO: 실제 주문 생성 API 호출
  };

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-4 md:px-20">
      <section className="w-full px-20 mx-auto flex flex-col gap-5">
        {/* 헤더 */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#7B3306]">장바구니</h1>
            {state.cafe_name && (
              <p className="text-lg text-gray-500 mt-1">
                현재 <span className="font-semibold">{state.cafe_name}</span>
                에서 주문 중입니다.
              </p>
            )}
          </div>
          {state.items.length > 0 && (
            <button
              className="text-lg text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline"
              onClick={handleClear}
            >
              장바구니 비우기
            </button>
          )}
        </header>

        {state.items.length === 0 ? (
          <section className="bg-white rounded-2xl shadow-md p-8 text-center">
            <p className="text-sm text-gray-500">
              장바구니가 비어 있습니다.
              <br />
              원하는 카페에서 메뉴를 담아 주세요.
            </p>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
            {/* 아이템 리스트 */}
            <section className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 h-auto">
              <h2 className="text-sm font-semibold text-[#7B3306] mb-1">
                주문 상품
              </h2>
              <div className="divide-y divide-gray-100">
                {state.items.map((item) => (
                  <div
                    key={item.item_id}
                    className="py-3 flex items-center justify-between text-sm"
                  >
                    <div className="flex flex-col">
                      <p className="font-semibold text-[#111827]">
                        {item.item_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.price.toLocaleString()}원 × {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-[#7B3306]">
                      {(item.price * item.quantity).toLocaleString()}원
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 합계 + 쿠폰 + 주문 카드 */}
            <section className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 h-fit">
              <h2 className="text-sm font-semibold text-[#7B3306]">
                주문 요약
              </h2>

              {/* 쿠폰 선택 영역 */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-500">사용 가능 쿠폰</span>
                {isLoadingCoupons ? (
                  <p className="text-xs text-gray-400">
                    쿠폰 정보를 불러오는 중입니다...
                  </p>
                ) : availableCoupons.length === 0 ? (
                  <p className="text-xs text-gray-400">
                    사용 가능한 쿠폰이 없습니다.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className={
                        "w-full text-xs px-3 py-2 rounded-lg border " +
                        (!selectedCoupon
                          ? "border-[#E17100] text-[#E17100] bg-[#FFF7E8]"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50")
                      }
                      onClick={() => handleSelectCoupon(null)}
                    >
                      쿠폰 사용 안 함
                    </button>
                    {availableCoupons.map((coupon) => {
                      const isActive =
                        coupon.user_reward_id === state.user_reward_id;
                      return (
                        <button
                          key={coupon.user_reward_id}
                          type="button"
                          className={
                            "w-full text-xs px-3 py-2 rounded-lg border flex items-center justify-between " +
                            (isActive
                              ? "border-[#E17100] bg-[#FFF7E8] text-[#7B3306]"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50")
                          }
                          onClick={() => handleSelectCoupon(coupon)}
                        >
                          <span>{coupon.reward_name}</span>
                          <span className="font-semibold text-[#E17100]">
                            -{coupon.discount_value.toLocaleString()}원
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">상품 금액</span>
                <span className="font-semibold text-[#111827]">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">쿠폰 할인</span>
                <span className="font-semibold text-[#E17100]">
                  -{discount.toLocaleString()}원
                </span>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">총 결제 금액</span>
                <span className="text-xl font-bold text-[#7B3306]">
                  {finalPrice.toLocaleString()}원
                </span>
              </div>

              <button
                className="mt-2 w-full bg-[#E17100] text-white font-semibold py-3 rounded-xl
                           transition-transform duration-150 hover:scale-[1.01] active:scale-95"
                onClick={handleOrder}
              >
                주문하기
              </button>

              <p className="text-[11px] text-gray-400">
                주문 확정 후에는 취소/변경이 제한될 수 있습니다.
              </p>
            </section>
          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;
