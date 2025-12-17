const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#FFFBEd] mt-10">
      <div className="w-full px-10 mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 브랜드/카피라이트 */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-[#7B3306]">커피콩 저장소</p>
          <p className="text-xs text-gray-500">
            스마트 오더로 빠르고 편리한 카페 생활을 만들어갑니다.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            © {new Date().getFullYear()} Coffee Bean Storage. All rights
            reserved.
          </p>
        </div>

        {/* 링크 영역 */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <button className="hover:underline">이용약관</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">개인정보 처리방침</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">고객센터</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
