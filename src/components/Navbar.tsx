import { Award, Coffee, ScrollText, ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router-dom";

export const primaryButtonHover =
  "transition-transform duration-150 hover:scale-105 hover:brightness-110 active:scale-95";
const navbtnCss = `text-[#7B3306] font-medium hover:underline border-2 border-[#7B3306]/50 h-10 w-10 rounded-xl flex items-center justify-center ${primaryButtonHover}`;
// 더미 로그인
const dummyUser = {
  user_id: "정동열",
  role: "owner", // "owner" | "customer"
  token: "dummy-jwt-token",
};

const isLoggedIn = !!dummyUser.token;

const Navbar = () => {
  const isOwner = dummyUser.role === "owner";

  return (
    <nav className="w-full h-20 px-10 flex items-center justify-between shadow-sm">
      <Link
        className="flex items-center gap-2 transition-transform duration-150 hover:scale-105"
        to={"/"}
      >
        <Coffee size={40} color="#E17100" />
        <span className="text-[#7B3306] text-2xl">커피콩 저장소</span>
      </Link>

      {isLoggedIn ? (
        <div className="flex items-center gap-6">
          {/* 인사 영역 */}
          {isOwner ? (
            <span className="font-semibold">
              <span className="text-black">{dummyUser.user_id}</span>
              <span className="text-[#E17100]">(사장님)</span>
              <span className="text-black"> 반갑습니다</span>
            </span>
          ) : (
            <span className="text-black font-semibold">
              {dummyUser.user_id} 반갑습니다
            </span>
          )}

          {/* 공통 메뉴 */}
          <Link to="/orderHistory" className={navbtnCss}>
            <ScrollText />
          </Link>
          <Link to="/stamp" className={navbtnCss}>
            <Award />
          </Link>
          <Link to="/cart" className={navbtnCss}>
            <ShoppingCart />
          </Link>

          {/* 사장님 전용 버튼 */}
          {isOwner && (
            <Link
              to="/my-store"
              className={
                "bg-[#E17100] text-white text-sm font-semibold px-4 py-2 rounded-lg w-40 h-13 flex items-center justify-center gap-3 " +
                primaryButtonHover
              }
            >
              <Store />내 가게 보기
            </Link>
          )}
        </div>
      ) : (
        <Link
          className={
            "bg-[#E17100] rounded-xl flex items-center justify-center text-white text-lg font-bold px-6 py-3 " +
            primaryButtonHover
          }
          to="/login"
        >
          로그인/회원가입
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
