// src/pages/Homepage.tsx
import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import Intro from "../components/home/Intro";
import StoreCard from "../components/home/StoreCard";
import { getCafeList } from "../apis/CafeApi";
import type { CafeListItem } from "../type/store";

const Homepage = () => {
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
      // any → unknown
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
      <div className="w-full min-h-screen bg-[#F5F5F7] flex items-center justify-center py-20">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-6 text-[#E17100]" />
          <p className="text-xl text-gray-600">내 주변 카페를 찾아오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-max pb-20">
      <Intro />
      <section className="w-full mt-10 px-4 sm:px-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black bg-linear-to-r from-[#7B3306] to-[#E17100] bg-clip-text text-transparent">
              내 주변 카페
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              총{" "}
              <span className="font-bold text-[#E17100]">{cafes.length}</span>개
              카페
            </p>
          </div>
          {cafes.length > 0 && (
            <button
              onClick={fetchCafeList}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all text-sm font-semibold text-gray-700"
            >
              <RefreshCw size={18} />
              새로고침
            </button>
          )}
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
              아직 카페가 없어요
            </h3>
            <p className="text-lg text-gray-500">
              근처 카페들이 곧 업데이트됩니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cafes.map((cafe) => (
              <StoreCard
                key={cafe.cafe_id}
                cafe_id={cafe.cafe_id}
                cafe_name={cafe.cafe_name}
                address={cafe.address}
                description={cafe.description}
                operating_hours={cafe.operating_hours}
                cafe_image_url={cafe.cafe_image_url}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;
