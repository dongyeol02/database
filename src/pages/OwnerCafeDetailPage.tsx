// src/pages/OwnerCafeDetailPage.tsx
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";

import CafeInfoCard from "../components/cafe/CafeInfoCard";
import MenuManageSummary from "../components/OwnerCafe/MenuManageSummary";
import MyCafeMenuSection from "../components/OwnerCafe/MyCafeMenuSection";
import CafeOrderListSection from "../components/OwnerCafe/CafeOrderListSection";

import type { CafeDetail } from "../type/store";
import { getCafeDetail } from "../apis/CafeApi";

const OwnerCafeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const cafeId = id ? Number(id) : 1;

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
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      console.error("사장님 카페 상세 조회 실패:", msg);
      setError("카페 정보를 불러오지 못했습니다.");
      setCafe(null);
    } finally {
      setLoading(false);
    }
  }, [cafeId]);

  useEffect(() => {
    fetchCafeDetail();
  }, [fetchCafeDetail]);

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RefreshCw className="w-5 h-5 animate-spin text-[#E17100]" />
          <span>카페 정보를 불러오는 중...</span>
        </div>
      </main>
    );
  }

  if (error || !cafe) {
    return (
      <main className="w-full min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md px-8 py-6 text-center">
          <p className="text-sm text-red-600 mb-3">
            {error ?? "카페 정보를 찾을 수 없습니다."}
          </p>
          <button
            type="button"
            onClick={fetchCafeDetail}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#E17100] text-white rounded-xl hover:bg-[#cf6400]"
          >
            <RefreshCw size={14} />
            다시 불러오기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#F5F5F7] py-8 px-6 md:px-20">
      <section className="w-full mx-auto flex flex-col gap-6">
        <CafeInfoCard cafe={cafe} />

        <CafeOrderListSection cafeId={cafe.cafe_id} />

        <MenuManageSummary
          menuCount={cafe.items.length}
          cafeId={cafe.cafe_id}
        />

        <MyCafeMenuSection cafe={cafe} />
      </section>
    </main>
  );
};

export default OwnerCafeDetailPage;
