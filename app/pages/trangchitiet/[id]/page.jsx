
  "use client";
  import { useState } from "react";
  import Image from "next/image";


  export default function Trangchitiet() {



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

   
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [replies, setReplies] = useState({});
    const [likes, setLikes] = useState({});
  
    const handleAddComment = () => {
      if (comment.trim() === "") return;
      const newComment = {
        id: Date.now(),
        username: "User123",
        content: comment,
        time: new Date().toLocaleString(),
        avatar: "/assets/images/avatar-default.png",
      };
      setComments([newComment, ...comments]);
      setComment("");
    };
  
    const handleReplyComment = (commentId, replyText) => {
      if (!replyText.trim()) return;
      const newReply = {
        id: Date.now(),
        username: "User123",
        content: replyText,
        time: new Date().toLocaleString(),
        avatar: "/assets/images/avatar-default.png",
      };
      setReplies({
        ...replies,
        [commentId]: [...(replies[commentId] || []), newReply],
      });
      setReplyingTo(null);
    };
  
    const toggleLike = (commentId) => {
      setLikes((prevLikes) => ({
        ...prevLikes,
        [commentId]: prevLikes[commentId] ? prevLikes[commentId] + 1 : 1,
      }));
    };
    
    

    
    const thumbnails = [
            "/assets/images/Nike-Air-Force-1-ID-Gucci(1).png",
            "/assets/images/Nike-Air-Force-1-ID-Gucci(2).png",
            "/assets/images/Nike-Air-Force-1-ID-Gucci(3).png",
            "/assets/images/Nike-Air-Force-1-ID-Gucci(4).png",
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
      <div className="px-4 md:px-8 lg:px-16 mt-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 bg-white rounded-xl shadow-md">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex md:flex-col gap-3">
          {thumbnails.map((image, index) => (
            <div
              key={index}
              className={`w-16 h-16 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 shadow-sm ${
    selectedImage === image ? "border-blue-500 scale-110" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt="Thumbnail"
                width={64}
                height={64}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg border">
          <Image
            src={selectedImage}
            alt="Product"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div>
        <h2 className="text-3xl font-semibold">Áo Hoodie Siêu Cấp M1024</h2>
         {/* Mô tả sản phẩm */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">Mô tả sản phẩm</h3>
            <p className="mt-2 text-gray-600">
              Áo hoodie siêu cấp M1024 được làm từ chất liệu cotton cao cấp, mang đến sự thoải mái và giữ ấm tốt. 
              Thiết kế hiện đại phù hợp với nhiều phong cách thời trang khác nhau.
            </p>
          </div>
        <div className="mt-3 flex items-center gap-4">
          <span className="text-2xl font-bold text-red-500">108.000đ</span>
          <span className="text-gray-400 line-through">230.000đ</span>
        </div>

        {/* Chọn màu */}
        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-lg font-medium">Chọn màu</h3>
          <div className="flex gap-3">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-110 shadow ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>


        {/* Chọn size */}
        <div className="mt-6">
          <h3 className="text-lg font-medium">Size</h3>
          <div className="flex gap-3 mt-2">
            {sizes.map((size) => (
              <div
                key={size}
                className={`px-5 py-2 border rounded-md cursor-pointer transition-all duration-300 hover:shadow-md ${
    selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
<br/>
       {/* Số lượng */}
<div className="mt-6 flex justify-between items-center">
  <h3 className="text-lg font-medium">Số lượng</h3>
  <div className="flex items-center gap-5">
    <button
      onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
    >
      -
    </button>
    <span className="text-lg font-semibold">{quantity}</span>
    <button
      onClick={() => setQuantity((q) => q + 1)}
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
    >
      +
    </button>
  </div>
</div>


        {/* Nút hành động */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <button className="w-full md:w-auto px-6 py-3 border rounded-md text-gray-900 hover:bg-gray-100 transition-all">Thêm vào giỏ hàng</button>
          <button className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">Mua ngay</button>
        </div>
      </div>
    </div>

{/*------------------------------------------ */}



        <div className="mt-6 flex flex-col items-center">
        <div className="w-3/4">
          <h3 className="text-lg font-medium text-gray-700">Bình luận</h3>
        </div>
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
        <div className="w-3/4 mt-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">Không có bình luận.</p>
          ) : (
            <ul className="space-y-2">
              {comments.map((cmt) => (
                <li key={cmt.id} className="p-3 border rounded-lg bg-gray-100 flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <img
                      src={cmt.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border"
                    />
                    <div>
                      <span className="font-bold text-blue-600">{cmt.username}</span>
                      <p className="text-gray-800">{cmt.content}</p>
                      <span className="text-gray-500 text-sm">{cmt.time}</span>
                      <div className="flex gap-4 mt-1">
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => setReplyingTo(cmt.id)}
                        >
                          Phản hồi
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => toggleLike(cmt.id)}
                        >
                          👍 {likes[cmt.id] || 0}
                        </button>
                      </div>
                    </div>
                  </div>
                  {replyingTo === cmt.id && (
                    <div className="ml-12 mt-2 flex items-center">
                      <input
                        type="text"
                        placeholder="Nhập phản hồi..."
                        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleReplyComment(cmt.id, e.target.value);
                        }}
                      />
                      <button
                        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => {
                          const replyText = prompt("Nhập phản hồi của bạn:");
                          if (replyText) handleReplyComment(cmt.id, replyText);
                        }}
                      >
                        Gửi
                      </button>
                    </div>
                  )}
                  {replies[cmt.id] && (
                    <ul className="ml-12 mt-2 space-y-1">
                      {replies[cmt.id].map((reply) => (
                        <li key={reply.id} className="p-2 border rounded-lg bg-gray-200 flex gap-3">
                          <img
                            src={reply.avatar}
                            alt="Avatar"
                            className="w-8 h-8 rounded-full border"
                          />
                          <div>
                            <span className="font-bold text-blue-600">{reply.username}</span>
                            <p className="text-gray-800">{reply.content}</p>
                            <span className="text-gray-500 text-sm">{reply.time}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
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
            <div key={product.id} className="border bg-white rounded-lg p-4 shadow-sm">
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
