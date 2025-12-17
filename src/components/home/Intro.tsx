import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <section className="bg-[#FFFBEd] w-full flex flex-col items-center justify-center py-16">
      <p className="text-sm font-semibold text-[#E17100] mb-3">
        스마트 오더로 빠르고 편리하게
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-[#7B3306] text-center mb-4 leading-snug">
        좋아하는 카페에서 <br className="hidden md:block" />
        스마트 오더로 주문하고
      </h1>
      <p className="text-base md:text-lg text-[#7B3306] text-center mb-8">
        스탬프를 모아 특별한 혜택을 받으세요!
      </p>

      <div className="flex gap-4">
        <Link
          className="bg-[#E17100] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:scale-105 hover:brightness-110 active:scale-95 transition-transform duration-150"
          to={"/AllStore"}
        >
          가게 보고 주문하기
        </Link>
      </div>
    </section>
  );
};
export default Intro;
