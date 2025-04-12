// component/dhsize.jsx
import Image from "next/image";
import { useState } from "react";

export default function Dhsize({ onClose }) {
  const [activeTab, setActiveTab] = useState("Nam"); // Default to "Nam" tab

  // Men's size data (based on the first image)
  const menSizes = [
    { eu: 39, us: 6.5, uk: 6, footLength: 247, minMax: "241-247" },
    { eu: 40, us: 7, uk: 6.5, footLength: 253, minMax: "248-253" },
    { eu: 41, us: 8, uk: 7.5, footLength: 260, minMax: "254-260" },
    { eu: 42, us: 8.5, uk: 8, footLength: 267, minMax: "261-267" },
    { eu: 43, us: 9.5, uk: 9, footLength: 273, minMax: "268-273" },
    { eu: 44, us: 10, uk: 9.5, footLength: 280, minMax: "274-280" },
    { eu: 45, us: 11, uk: 10.5, footLength: 287, minMax: "281-287" },
  ];

  // Women's size data (based on the second image)
  const womenSizes = [
    { eu: 35, us: 4.5, uk: 2.5, footLength: 220, minMax: "214-220" },
    { eu: 36, us: 5.5, uk: 3.5, footLength: 227, minMax: "221-227" },
    { eu: 37, us: 6, uk: 4, footLength: 233, minMax: "228-233" },
    { eu: 38, us: 7, uk: 5, footLength: 240, minMax: "234-240" },
    { eu: 39, us: 8, uk: 6, footLength: 247, minMax: "241-247" },
  ];

  // Toggle between "Nam" and "Nữ"
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Determine which data to display based on the active tab
  const currentSizes = activeTab === "Nam" ? menSizes : womenSizes;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Size Guide Content */}
        <h2 className="text-2xl font-bold text-blue-600 mb-4">BẢNG SIZE GIÀY HALO</h2>
        <p className="text-sm text-gray-600 mb-4">
          Dưới đây là bảng kích cỡ để bạn tham khảo. Nếu bạn không biết kích cỡ của mình, hãy sử dụng “Hướng dẫn cách chọn size” ở cuối bảng kích cỡ để giúp bạn tìm được kích cỡ phù hợp. Lưu ý: kích thước mm thể hiện trên hộp và nhãn giày khác với chiều dài bàn chân (mm).
        </p>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => handleTabChange("Nam")}
            className={`px-4 py-2 font-semibold ${activeTab === "Nam" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
          >
            Nam
          </button>
          <button
            onClick={() => handleTabChange("Nữ")}
            className={`px-4 py-2 font-semibold ${activeTab === "Nữ" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
          >
            Nữ
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-center text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 font-semibold">HALO (SIZE EU)</th>
                {currentSizes.map((size, index) => (
                  <th key={index} className="border p-3">{size.eu}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3 font-semibold">US (SIZE MỸ)</td>
                {currentSizes.map((size, index) => (
                  <td key={index} className="border p-3">{size.us}</td>
                ))}
              </tr>
              <tr>
                <td className="border p-3 font-semibold">UK (SIZE ANH)</td>
                {currentSizes.map((size, index) => (
                  <td key={index} className="border p-3">{size.uk}</td>
                ))}
              </tr>
              <tr>
                <td className="border p-3 font-semibold">Chiều dài bàn chân chuẩn (mm)</td>
                {currentSizes.map((size, index) => (
                  <td key={index} className="border p-3">{size.footLength}</td>
                ))}
              </tr>
              <tr>
                <td className="border p-3 font-semibold">Chiều dài bàn chân Min-Max (mm)</td>
                {currentSizes.map((size, index) => (
                  <td key={index} className="border p-3">{size.minMax}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Instructions */}
        <div className="mt-6 flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Hướng dẫn chọn size</h3>
            <ol className="list-decimal list-inside mt-2 text-gray-700">
              <li>
                Đặt bàn chân của bạn lên tờ giấy vạch ra 2 đường thẳng song song để xác định khoảng cách xa nhất từ gót chân đến mũi chân.
              </li>
              <li>
                Dùng thước đo khoảng cách từ ngón chân trước đến gót chân.
              </li>
              <li>
                Lấy số đo này đối chiếu với bảng size Biti's để có kết quả size vừa với chân của bạn.
              </li>
            </ol>
          </div>
          <div className="w-32">
            <Image
              src="/assets/images/logo.jpg"
              alt="Foot Measurement Guide"
              width={100}
              height={100}
              style={{ mixBlendMode: "darken" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}