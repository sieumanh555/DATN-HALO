"use client";
import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold text-blue-600">Kết quả tìm kiếm cho: "{query}"</h1>

      {/* Render danh sách sản phẩm theo query */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* Gọi API hoặc map dữ liệu tìm kiếm tại đây */}
        <p className="text-gray-500">Hiển thị sản phẩm...</p>
      </div>
    </div>
  );
}
