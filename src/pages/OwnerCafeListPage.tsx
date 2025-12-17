// src/pages/OwnerCafeListPage.tsx
import { useEffect, useState } from "react";
import { Coffee, Plus, Store } from "lucide-react";
import { dummyOwnerCafes } from "../mock/ownerCafe";
import type { OwnerCafeListResponse } from "../type/store";
import { Link } from "react-router-dom";

const OwnerCafeListPage = () => {
  const [cafes, setCafes] = useState<OwnerCafeListResponse>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 나중에 여기서 토큰의 user_id 를 owner_id 로 사용해서 실제 API 호출
  useEffect(() => {
    // 예시:
    // const token = localStorage.getItem("access_token");
    // const res = await fetch("/owner/cafes", {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // const data: OwnerCafeListResponse = await res.json();
    // setCafes(data);

    setTimeout(() => {
      setCafes(dummyOwnerCafes);
      setIsLoading(false);
    }, 200);
  }, []);

  if (isLoading) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <p className="text-sm text-gray-500">내 카페 정보를 불러오는 중...</p>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-4 md:px-10">
      <section className="w-full px-20 mx-auto flex flex-col gap-6">
        {/* 상단 헤더 */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 px-4 rounded-full bg-white shadow-sm flex items-center gap-2">
              <Coffee size={18} className="text-[#E17100]" />
              <span className="text-sm font-semibold text-[#E17100]">
                카페 오더
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-gray-900">
                내 카페 관리
              </h1>
              <p className="text-xs text-gray-500">
                {cafes.length}개의 카페를 운영중입니다.
              </p>
            </div>
          </div>

          <Link
            className="flex items-center gap-1 px-3 py-2 bg-[#E17100] text-white font-semibold rounded-xl hover:bg-[#cf6400] transition-colors"
            to={"/owner/cafes/new"}
          >
            <Plus size={28} />새 카페 추가
          </Link>
        </header>

        {/* 카페 리스트 */}
        {cafes.length === 0 ? (
          <section className="bg-white rounded-2xl shadow-md p-10 text-center">
            <p className="text-sm text-gray-500">
              아직 등록된 카페가 없습니다. 첫 번째 카페를 추가해 보세요.
            </p>
          </section>
        ) : (
          <section>
            <h2 className="text-sm font-semibold text-gray-800 mb-3">
              운영 중인 가게
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cafes.map((cafe) => (
                <article
                  key={cafe.cafe_id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col aspect-3/2"
                >
                  {/* 상단 이미지 */}
                  <div className="h-5/3 w-full overflow-hidden">
                    <img
                      src={cafe.cafe_image_url}
                      alt={cafe.cafe_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 flex flex-col px-4 py-3 gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {cafe.cafe_name}
                      </h3>
                      <p className="text-[11px] text-gray-500 truncate">
                        {cafe.address}
                      </p>
                    </div>
                  </div>

                  {/* 하단 버튼 */}
                  <div className="px-4 pb-4 pt-2 flex flex-col gap-2">
                    <Link
                      className="w-full text-xs py-2 rounded-lg bg-[#E17100] text-white font-semibold flex items-center justify-center gap-1"
                      to={`/ownercafedetail/${cafe.cafe_id}`}
                    >
                      <Store size={14} />
                      가게 관리하기
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default OwnerCafeListPage;
