// src/context/CartContext.tsx
import { createContext, useContext, useReducer } from "react";
import type { CartItem, CartState } from "../../type/cart";

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: CartItem & { cafe_name: string };
    }
  | { type: "CLEAR" }
  | { type: "SET_REWARD"; payload: number | null };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const cafe_id = state.cafe_id ?? action.payload.cafe_id;
      const cafe_name = state.cafe_name ?? action.payload.cafe_name;

      // 다른 카페에서 동시 주문 안됨!
      if (state.cafe_id && state.cafe_id !== action.payload.cafe_id) {
        console.warn("다른 카페의 상품은 같은 장바구니에 담을 수 없습니다.");
        return state;
      }

      const exists = state.items.find(
        (i) => i.item_id === action.payload.item_id
      );

      if (exists) {
        return {
          ...state,
          cafe_id,
          cafe_name, // ✅ 유지
          items: state.items.map((i) =>
            i.item_id === action.payload.item_id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }

      return {
        ...state,
        cafe_id,
        cafe_name, // ✅ 첫 담기 때 세팅
        items: [...state.items, action.payload],
      };
    }
    case "CLEAR":
      return {
        cafe_id: null,
        cafe_name: null,
        items: [],
        user_reward_id: null,
      }; // ✅ 이름도 초기화
    case "SET_REWARD":
      return { ...state, user_reward_id: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cafe_id: null,
    cafe_name: null, // ✅ 초기값
    items: [],
    user_reward_id: null,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
