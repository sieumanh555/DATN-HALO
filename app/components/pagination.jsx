"use client";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalProducts,
  productsPerPage,
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const maxPageButtons = 5; // Số nút tối đa hiển thị (có thể tùy chỉnh)

  // Hàm tính toán các trang hiển thị
  const getPageNumbers = () => {
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPageButtons - 1);

    // Điều chỉnh start nếu end chạm giới hạn
    start = Math.max(1, end - maxPageButtons + 1);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Hàm chuyển trang
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (totalPages <= 1) return null; // Không hiển thị nếu chỉ có 1 trang

  return (
    <div className="flex items-center gap-2">
      {/* Nút "Trước" */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded bg-gray-200 text-gray-700 ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-300"
        }`}
      >
        Trước
      </button>

      {/* Hiển thị trang đầu nếu không nằm trong range */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => goToPage(1)}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="px-4 py-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Các nút trang */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-4 py-2 rounded ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Hiển thị trang cuối nếu không nằm trong range */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-4 py-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => goToPage(totalPages)}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Nút "Sau" */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded bg-gray-200 text-gray-700 ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-300"
        }`}
      >
        Sau
      </button>
    </div>
  );
}