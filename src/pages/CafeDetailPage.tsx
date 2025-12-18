// src/pages/CafeDetailPage.tsx
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";

import CafeInfoCard from "../components/cafe/CafeInfoCard";
import CafeMenuSection from "../components/cafe/CafeMenuSection";
import { getCafeDetail } from "../apis/CafeApi";
import type { CafeDetail } from "../type/store";

const CafeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const cafeId = id ? parseInt(id, 10) : 1;

  // 상태 관리
  const [cafe, setCafe] = useState<CafeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCafeDetail = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCafeDetail(cafeId);
      setCafe(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류";
      console.error("카페 조회 실패:", errorMessage);
      setError(`카페 정보를 불러오지 못했습니다. (${errorMessage})`);
      setCafe(null);
    } finally {
      setLoading(false);
    }
  }, [cafeId]);

  // 처음 마운트시 API 호출
  useEffect(() => {
    fetchCafeDetail();
  }, [fetchCafeDetail]);

  // 로딩중
  if (loading) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-6 md:px-20 flex items-center justify-center">
        <div className="text-center p-12 bg-white rounded-3xl shadow-xl">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-[#E17100]" />
          <p className="text-lg text-gray-600">
            최강동열이형의 비밀카페 정보를 불러오는 중...
          </p>
        </div>
      </main>
    );
  }

  // 에러
  if (error || !cafe) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-6 md:px-20 flex items-center justify-center">
        <div className="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md">
          <RefreshCw className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{error}</h2>
          <p className="text-gray-500 mb-6">카페 ID: {cafeId}</p>
          <button
            onClick={fetchCafeDetail}
            className="px-6 py-3 bg-[#E17100] text-white rounded-2xl font-bold hover:bg-[#D2691E] transition-all shadow-lg"
          >
            다시 불러오기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-6 md:px-20">
      <section className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/*새로고침 버튼 추가 */}
        <div className="flex justify-end">
          <button
            onClick={fetchCafeDetail}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all text-sm font-medium text-gray-700"
          >
            <RefreshCw size={16} />
            새로고침
          </button>
        </div>

        {/*기존 컴포넌트 그대로! */}
        <CafeInfoCard cafe={cafe} />
        <CafeMenuSection cafe={cafe} />
      </section>
    </main>
  );
};

export default CafeDetailPage;
