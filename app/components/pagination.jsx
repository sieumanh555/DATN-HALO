export default function Pagination({
  currentPage,
  setCurrentPage,
  totalProducts,
  productsPerPage,
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="flex gap-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded ${
            currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCurrentPage(index + 1)} // Gọi hàm setCurrentPage đã được truyền từ parent
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}