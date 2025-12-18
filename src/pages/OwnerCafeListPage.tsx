// src/pages/OwnerCafeListPage.tsx
import { useEffect, useState, useCallback } from "react";
import { Coffee, Plus, Store, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import type { OwnerCafeListResponse } from "../type/store";
import { getOwnerCafesMe } from "../apis/CafeApi";

const OwnerCafeListPage = () => {
  const { user_id } = useAuthStore(); // 1) 훅은 컴포넌트 안에서 호출

  const [cafes, setCafes] = useState<OwnerCafeListResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOwnerCafes = useCallback(async () => {
    if (!user_id) {
      setError("로그인 정보를 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await getOwnerCafesMe(user_id);
      setCafes(data);
      console.log(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      console.error("내 카페 목록 조회 실패:", msg);
      setError("내 카페 정보를 불러오지 못했습니다.");
      setCafes([]);
    } finally {
      setIsLoading(false);
    }
  }, [user_id]); // 2) deps 에 user_id 추가

  useEffect(() => {
    fetchOwnerCafes();
  }, [fetchOwnerCafes]);

  if (isLoading) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E17100]" />
          <span>내 카페 정보를 불러오는 중...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-4 md:px-10">
      <section className="w-full max-w-6xl mx-auto flex flex-col gap-6">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchOwnerCafes}
              className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50"
            >
              <RefreshCw size={14} />
              새로고침
            </button>

            <Link
              className="flex items-center gap-1 px-3 py-2 bg-[#E17100] text-white font-semibold rounded-xl hover:bg-[#cf6400] transition-colors text-sm"
              to={"/owner/cafes/new"}
            >
              <Plus size={18} />새 카페 추가
            </Link>
          </div>
        </header>

        {error && (
          <section className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
            {error}
          </section>
        )}

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
                  <div className="h-5/3 w-full overflow-hidden">
                    <img
                      src={cafe.cafe_image_url}
                      alt={cafe.cafe_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

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
