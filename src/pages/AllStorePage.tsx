// src/pages/AllStoresPage.tsx
import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import VerticalStoreCard from "../components/allStore/VerticalStoreCard";
import { getCafeList } from "../apis/CafeApi";
import type { CafeListItem } from "../type/store";

const AllStoresPage = () => {
  const [cafes, setCafes] = useState<CafeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCafeList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCafeList();
      setCafes(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류";
      console.error("카페 목록 조회 실패:", errorMessage);
      setError("카페 목록을 불러오지 못했습니다.");
      setCafes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCafeList();
  }, [fetchCafeList]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <main className="flex-1 w-full mx-auto px-10 py-10">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-6 text-[#E17100]" />
            <p className="text-xl text-gray-600">전체 카페를 불러오는 중...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <main className="flex-1 w-full mx-auto px-20 py-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#7B3306] to-[#E17100] bg-clip-text text-transparent mb-4">
            전체 가게
          </h1>
          <p className="text-lg text-gray-600">
            스마트 오더가 가능한 카페를 둘러보고, 원하는 가게를 선택해 주문해
            보세요.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            총 <span className="font-bold text-[#E17100]">{cafes.length}</span>
            개 카페
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 mb-8 text-center">
            <h3 className="text-xl font-bold text-red-800 mb-2">{error}</h3>
            <button
              onClick={fetchCafeList}
              className="px-6 py-3 bg-red-500 text-white rounded-2xl font-semibold hover:bg-red-600"
            >
              다시 불러오기
            </button>
          </div>
        )}

        {cafes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              등록된 카페가 없습니다
            </h3>
            <p className="text-lg text-gray-500">
              스마트 오더 가능한 카페들이 곧 추가됩니다.
            </p>
          </div>
        ) : (
          <section className="flex flex-col gap-4">
            {cafes.map((cafe) => (
              <VerticalStoreCard
                key={cafe.cafe_id}
                cafe_id={cafe.cafe_id}
                cafe_name={cafe.cafe_name}
                address={cafe.address}
                description={cafe.description}
                operating_hours={cafe.operating_hours}
                cafe_image_url={cafe.cafe_image_url}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default AllStoresPage;
