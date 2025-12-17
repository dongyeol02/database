type CartConfirmModalProps = {
  itemName: string;
  onClose: () => void;
  onGoCart: () => void;
};

const CartConfirmModal = ({
  itemName,
  onClose,
  onGoCart,
}: CartConfirmModalProps) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl px-6 py-5 w-80">
        <p className="text-sm font-semibold text-[#111827] mb-2">
          장바구니에 담겼어요
        </p>
        <p className="text-xs text-gray-500 mb-4">
          "{itemName}" 상품이 장바구니에 추가되었습니다.
        </p>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-xs font-semibold text-white bg-[#E17100] hover:brightness-110"
            onClick={onGoCart}
          >
            장바구니로 이동
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100"
            onClick={onClose}
          >
            추가 주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartConfirmModal;
