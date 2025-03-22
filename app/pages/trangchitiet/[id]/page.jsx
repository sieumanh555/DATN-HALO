"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp } from "@fortawesome/free-solid-icons";
import { useParams } from "next/navigation";
import Product from "../../../components/product";

export default function Trangchitiet() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = {
          name: "Giày của HALO Cao Cấp",
          price: 2800000,
          pricePromo: 2500000,
          hot: true,
          mota: "Giày Nike Air Max 270 mang đến phong cách hiện đại, trẻ trung với thiết kế năng động, phù hợp cho mọi hoạt động hằng ngày. Được trang bị công nghệ đệm khí 270 độ, đôi giày này mang lại cảm giác êm ái, thoải mái vượt trội, giúp giảm áp lực lên bàn chân khi di chuyển.",
          hinhanh: "https://i.pinimg.com/736x/f3/0b/14/f30b14128e01f1199fd240ccc9a6954f.jpg",
          isNew: false,
          rating: 4,
          quantity: 40,
          location: "Cần Thơ",
          category: "Giày Nam",
          variants: [
            {
              size: "40",
              color: "Đỏ",
              price: 2800000,
              stock: 20,
              status: "Còn hàng",
              images: [
                "https://i.pinimg.com/736x/f3/0b/14/f30b14128e01f1199fd240ccc9a6954f.jpg",
              ],
            },
            {
              size: "41",
              color: "Xanh",
              status: "Còn hàng",
              price: 2800000,
              stock: 15,
              images: [
                "https://i.pinimg.com/736x/70/4e/c8/704ec873531b79a613271505c0663f78.jpg",
              ],
            },
            {
              size: "41",
              color: "Trắng",
              status: "Còn hàng",
              price: 2800000,
              stock: 25,
              images: [
                "https://i.pinimg.com/736x/70/4e/c8/704ec873531b79a613271505c0663f78.jpg",
              ],
            },
            {
              size: "40",
              color: "Xám",
              price: 2800000,
              stock: 10,
              status: "Còn hàng",
              images: [
                "https://i.pinimg.com/736x/f3/0b/14/f30b14128e01f1199fd240ccc9a6954f.jpg",
              ],
            },
          ],
        };
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [likedComments, setLikedComments] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState({});

  const sizes = [...new Set(product?.variants.map((v) => v.size))];
  const colors = selectedSize
    ? product?.variants.filter((v) => v.size === selectedSize).map((v) => v)
    : [];

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedSize(sizes[0]);
      setSelectedColor(product.variants[0]);
    }
  }, [product]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const firstVariant = product.variants.find((v) => v.size === size);
    setSelectedColor(firstVariant);
  };

  const handleColorChange = (variant) => {
    setSelectedColor(variant);
  };

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

  const toggleLike = (commentId) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    setLikes((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + (likedComments[commentId] ? -1 : 1),
    }));
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!product || !product.variants) return <p>Không tìm thấy sản phẩm hoặc dữ liệu không hợp lệ.</p>;

  return (
    <div className="max-w-[1920px]">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8 p-6 md:p-10 bg-white rounded-xl shadow-md min-h-[500px]">
        {/* Hình ảnh chính */}
        <div className="md:col-span-6 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border">
            <Image
              src={selectedColor?.images[0] || product.hinhanh}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vw"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="md:col-span-4 flex flex-col justify-between min-h-[500px]">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-semibold">{product.name}</h2>
              {product.pricePromo < product.price && (
                <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
                  Giảm {Math.round(((product.price - product.pricePromo) / product.price) * 100)}%
                </span>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">Mô tả sản phẩm</h3>
              <p className="mt-2 text-gray-600">{product.mota}</p>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-2xl font-bold text-red-500">
                {product.pricePromo.toLocaleString()}đ
              </span>
              <span className="text-gray-400 line-through">
                {product.price.toLocaleString()}đ
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium">Size</h3>
              <div className="flex gap-3 mt-2">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`px-5 py-2 border rounded-md cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>

              {selectedSize && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium">Màu sắc</h3>
                  <div className="flex flex-col gap-3 mt-2">
                    {colors.map((variant, index) => (
                      <div
                        key={`${variant.size}-${variant.color}-${index}`}
                        className={`px-5 py-2 border rounded-md cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedColor === variant ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => handleColorChange(variant)}
                      >
                        {`${variant.color} (${variant.stock} còn hàng)`}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
                  onClick={() => setQuantity((q) => Math.min(q + 1, selectedColor?.stock || 1))}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button className="flex-1 px-6 py-3 border border-blue-500 rounded-md text-gray-900 hover:bg-blue-500 hover:text-white transition-all">
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Phần bình luận */}
      <div className="mt-6 flex flex-col items-start">
        <div className="w-full max-w-3/4">
          <h3 className="text-lg font-medium text-gray-700">Bình luận</h3>
        </div>
        <div className="w-full max-w-3/4 flex items-center">
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
        <div className="w-full max-w-3/4 mt-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">Không có bình luận.</p>
          ) : (
            <ul className="space-y-2">
              {comments.map((cmt) => (
                <li key={cmt.id} className="p-3 border rounded-lg bg-gray-100 flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <img src={cmt.avatar} alt="Avatar" className="w-10 h-10 rounded-full border" />
                    <div>
                      <span className="font-bold text-blue-600">{cmt.username}</span>
                      <p className="text-gray-800">{cmt.content}</p>
                      <span className="text-gray-500 text-sm">{cmt.time}</span>
                      <div className="flex gap-4 mt-1">
                        <button
                          className={`text-lg flex items-center gap-1 ${
                            likedComments[cmt.id] ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
                          }`}
                          onClick={() => toggleLike(cmt.id)}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} /> {likes[cmt.id] || 0}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center">Sản phẩm khác</h2>
        <Product products={product} limit={3} />
      </div>
    </div>
  );
}