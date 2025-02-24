
"use client"; 
"use client";
import { useState } from "react";
import { useVoucher } from "../context/page";
import Image from "next/image";


export default function Trangchitiet() {

const { voucher, applyVoucher } = useVoucher();
const [voucherCode, setVoucherCode] = useState("");

const handleApplyVoucher = () => {
  applyVoucher(voucherCode);
};

const colors = ["yellow", "blue", "green", "red"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);


  const sizes = ["X", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  }

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Hàm giảm số lượng (tối thiểu là 1)
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // State quản lý danh sách bình luận
  const [comments, setComments] = useState([]);
  // State quản lý nội dung comment đang nhập
  const [comment, setComment] = useState("");

  // Hàm xử lý thêm bình luận
  const handleAddComment = () => {
    if (comment.trim() === "") return; // Không cho phép comment rỗng

    // Cập nhật danh sách bình luận
    setComments([...comments, comment]);
    setComment(""); // Xóa nội dung ô input sau khi gửi
  };

  
  const thumbnails = [
    "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
    "/assets/images/MLB-Chunky-Liner-Mid-NY-Green(1).png",
    "/assets/images/Nike-Air-Force-1-ID-Gucci.png",
    "/assets/images/Nike-Air-Force-1-Low-Valentine’s-Day.png",
  ];

  // State để lưu ảnh sản phẩm chính
  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);
  const products = [
    {
      id: 1,
      name: "Giày Sneaker Nam Thể Thao Cao Cấp",
      price: "10.000 VND",
      oldPrice: "20.000 VND",
      sold: "Đã bán hơn 0",
      image: "/assets/images/MLB-Chunky-Runner-NY-Black-White(2).png",
    },
    {
      id: 2,
      name: "Giày Sneaker Nam Thể Thao Cao Cấp",
      price: "10.000 VND",
      oldPrice: "20.000 VND",
      sold: "Đã bán hơn 0",
      image: "/assets/images/MLB-Chunky-Runner-NY-Black-White(2).png",
    },
    {
      id: 3,
      name: "Giày Sneaker Nam Thể Thao Cao Cấp",
      price: "10.000 VND",
      oldPrice: "20.000 VND",
      sold: "Đã bán hơn 0",
      image: "/assets/images/MLB-Chunky-Runner-NY-Black-White(2).png",
    },
    {
      id: 4,
      name: "Giày Sneaker Nam Thể Thao Cao Cấp",
      price: "10.000 VND",
      oldPrice: "20.000 VND",
      sold: "Đã bán hơn 0",
      image: "/assets/images/MLB-Chunky-Runner-NY-Black-White(2).png",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Hình ảnh sản phẩm */}
        <div>
          {/* Ảnh chính */}
          <div className="w-full rounded-xl overflow-hidden shadow-lg border-2 border-gray-300">
            <Image
              src={selectedImage}
              alt="Product"
              width={400}
              height={400}
              className="object-cover w-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          {/* Ảnh nhỏ (Thumbnail) */}
          <div className="flex gap-2 mt-4">
            {thumbnails.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ${
                  selectedImage === image ? "border-blue-500 scale-110" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Áo hoodie siêu cấp M1024</h2>

          {/* Giá tiền */}
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xl font-bold text-red-500">108.000đ</span>
            <span className="text-gray-400 line-through">230.000đ</span>
          </div>

        {/* Ô nhập voucher */}
        <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã voucher..."
                  className="p-2 border rounded-md"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button
                  onClick={handleApplyVoucher}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Áp dụng
                </button>
              </div>

              {/* Hiển thị voucher nếu có */}
              {voucher && (
                <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md">
                  <p>🎉 {voucher.description}</p>
                </div>
              )}


          {/* Màu sắc */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">Chọn màu</h3>
            <div className="flex gap-2 mt-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer transition ${
                    selectedColor === color ? "border-black scale-110" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                ></div>
              ))}
            </div>
            <p className="mt-2 text-gray-600">Màu đã chọn: <span className="font-semibold">{selectedColor}</span></p>
          </div>


          {/* Size */}
          <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-700">Size</h3>
      <div className="flex gap-2 mt-2">
        {sizes.map((size) => (
          <div
            key={size}
            className={`px-4 py-2 text-sm border rounded-md cursor-pointer transition ${
              selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </div>
        ))}
      </div>
      <p className="mt-2 text-gray-600">
        Size đã chọn: <span className="font-semibold">{selectedSize}</span>
      </p>
    </div>


          {/* Số lượng */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">Số lượng</h3>
            <div className="flex items-center gap-4 mt-2">
              <button onClick={decreaseQuantity} className="px-3 py-2 text-lg bg-gray-200 rounded-md hover:bg-gray-300">
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button onClick={increaseQuantity} className="px-3 py-2 text-lg bg-gray-200 rounded-md hover:bg-gray-300">
                +
              </button>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex flex-col gap-2">
            <button className="px-6 py-3 border text-black font-medium rounded-md">Thêm vào giỏ hàng</button>
            <button className="px-6 py-3 bg-blue-200 text-black font-medium rounded-md">Mua ngay</button>
          </div>
          
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center">
      {/* Tiêu đề bình luận */}
      <div className="w-3/4">
        <h3 className="text-lg font-medium text-gray-700">Bình luận</h3>
      </div>

      {/* Ô nhập bình luận + Nút gửi */}
      <div className="w-3/4 flex items-center">
      <input
        type="text"
        placeholder="Viết bình luận..."
        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
      />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleAddComment}
        >
          Gửi
        </button>
      </div>

      {/* Hiển thị danh sách bình luận */}
        <div className="w-3/4 mt-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">Không có bình luận.</p>
          ) : (
            <ul className="space-y-2">
              {comments.map((cmt, index) => (
                <li key={index} className="p-2 border rounded-lg bg-gray-100 flex items-center gap-3">
                  {/* Avatar */}
                  <img
                    src="/assets/images/MLB-Chunky-Runner-NY-Black-White(4).png"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  {/* Bình luận */}
                  <span>{cmt}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>

        


        <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Sản phẩm khác</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            {/* Hình ảnh sản phẩm */}
            <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Thông tin sản phẩm */}
            <h3 className="text-sm font-medium mt-3">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-red-500 font-bold">{product.price}</span>
              <span className="text-gray-400 line-through">{product.oldPrice}</span>
            </div>

            {/* Đánh giá & số lượng bán */}
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <span>⭐⭐⭐⭐⭐</span>
              <span>{product.sold}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
}
