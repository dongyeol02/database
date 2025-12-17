import { Link } from "react-router-dom";

type MenuManageSummaryProps = {
  menuCount: number;
  cafeId: number;
};

const MenuManageSummary = ({ menuCount, cafeId }: MenuManageSummaryProps) => {
  return (
    <section className="w-full bg-white rounded-2xl border border-gray-100 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">메뉴 추가</h2>
        <p className="text-xs text-gray-500 mt-1">
          현재 {menuCount}개의 메뉴가 등록되어 있습니다.
        </p>
      </div>
      <Link
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E17100] text-white text-xs font-semibold hover:bg-[#cf6400] transition-colors"
        to={`/ownercafedetail/${cafeId}/menus/new`}
      >
        <span className="text-lg leading-none">≡</span>
        <span>메뉴 추가</span>
      </Link>
    </section>
  );
};

export default MenuManageSummary;
