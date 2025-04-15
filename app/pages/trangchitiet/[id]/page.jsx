"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import Product from "../../../components/product";
import Dhsize from "@/app/components/hdsize";

export default function Trangchitiet() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageHeight, setImageHeight] = useState("auto");
  const productInfoRef = useRef(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Comment-related states
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [replyInput, setReplyInput] = useState({});
  const [showReplies, setShowReplies] = useState({});

  // Giả định token được lưu trong localStorage sau khi đăng nhập
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch product and comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch product
        const productResponse = await fetch(`https://datn-api-production.up.railway.app/product/${id}`);
        if (!productResponse.ok) {
          throw new Error(`Failed to fetch product: ${productResponse.status}`);
        }
        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch related products
        const productsResponse = await fetch(`https://datn-api-production.up.railway.app/product`);
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.status}`);
        }
        const allProducts = await productsResponse.json();
        const filteredProducts = allProducts.filter((p) => p._id !== id);
        setRelatedProducts(filteredProducts);

        // Fetch comments
        const commentsResponse = await fetch(`http://localhost:5000/comments`);
        if (!commentsResponse.ok) {
          throw new Error(`Failed to fetch comments: ${commentsResponse.status}`);
        }
        const commentsData = await commentsResponse.json();
        // Lọc comments theo productID
        const productComments = commentsData.filter(
          (cmt) => cmt.product.productID.toString() === id
        );
        setComments(productComments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Các phần khác giữ nguyên (size, color, quantity, v.v.)
  useEffect(() => {
    if (productInfoRef.current) {
      const height = productInfoRef.current.offsetHeight;
      setImageHeight(`${height}px`);
    }
  }, [product]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const sizes = [...new Set(product?.variants?.map((v) => v.size) || [])];
  const allColors = ["black", "white", "blue", "red", "gray"];
  const availableColors = selectedSize
    ? product?.variants
        ?.filter((v) => v.size === selectedSize)
        .map((v) => ({ color: v.color.toLowerCase(), stock: v.stock, images: v.images })) || []
    : [];

  useEffect(() => {
    if (product?.variants?.length && !selectedSize && sizes.length) {
      const defaultSize = sizes[0];
      setSelectedSize(defaultSize);
      const firstVariant = product.variants.find((v) => v.size === defaultSize);
      if (firstVariant) {
        setSelectedColor({
          color: firstVariant.color.toLowerCase(),
          stock: firstVariant.stock,
          images: firstVariant.images,
        });
      }
    }
  }, [product, sizes]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const firstVariant = product?.variants.find((v) => v.size === size);
    setSelectedColor(
      firstVariant
        ? { color: firstVariant.color.toLowerCase(), stock: firstVariant.stock, images: firstVariant.images }
        : null
    );
  };

  const handleColorChange = (color) => {
    const variant = availableColors.find((v) => v.color === color);
    if (variant && variant.stock > 0) {
      setSelectedColor(variant);
    } else {
      setSelectedColor({
        color,
        stock: 0,
        images: selectedColor?.images || [],
      });
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || selectedColor.stock === 0) {
      alert("Vui lòng chọn size và màu sắc hợp lệ!");
      return;
    }
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  // Comment handlers
  const handleAddComment = async () => {
    if (comment.trim() === "") {
      setCommentError("Bình luận không được để trống");
      return;
    }
    if (!token) {
      setCommentError("Vui lòng đăng nhập để bình luận");
      return;
    }

    try {
      setCommentError(null);
      const response = await fetch(`https://datn-api-production.up.railway.app/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: localStorage.getItem("userId"), // Giả định userId được lưu
          product: id,
          content: comment,
          like: 0,
          dislike: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể thêm bình luận");
      }

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setComment("");
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const toggleLike = async (commentId) => {
    if (!token) {
      setCommentError("Vui lòng đăng nhập để thích bình luận");
      return;
    }

    try {
      const comment = comments.find((cmt) => cmt._id === commentId);
      const response = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: comment.content,
          like: comment.like + 1,
          dislike: comment.dislike,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể cập nhật lượt thích");
      }

      const updatedComment = await response.json();
      setComments(
        comments.map((cmt) => (cmt._id === commentId ? updatedComment : cmt))
      );
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const toggleDislike = async (commentId) => {
    if (!token) {
      setCommentError("Vui lòng đăng nhập để không thích bình luận");
      return;
    }

    try {
      const comment = comments.find((cmt) => cmt._id === commentId);
      const response = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: comment.content,
          like: comment.like,
          dislike: comment.dislike + 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể cập nhật lượt không thích");
      }

      const updatedComment = await response.json();
      setComments(
        comments.map((cmt) => (cmt._id === commentId ? updatedComment : cmt))
      );
    } catch (error) {
      setCommentError(error.message);
    }
  };

  // Trả lời bình luận (chưa hỗ trợ bởi backend, giữ logic cục bộ)
  const handleAddReply = (commentId) => {
    if (!replyInput[commentId]?.trim()) return;
    const newReply = {
      id: Date.now(),
      username: "User123",
      content: replyInput[commentId],
      time: new Date().toLocaleString(),
      avatar: "https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg",
    };

    setComments(
      comments.map((comment) =>
        comment._id === commentId
          ? { ...comment, replies: [...(comment.replies || []), newReply] }
          : comment
      )
    );
    setReplyInput((prev) => ({ ...prev, [commentId]: "" }));
    setShowReplies((prev) => ({ ...prev, [commentId]: true }));
  };

  const toggleShowReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;
  if (!product) return <p className="text-center">Không tìm thấy sản phẩm.</p>;

  return (
    <div className="max-w-[1920px] px-4 md:px-[100px] py-12 md:py-[48px]">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8 p-4 md:p-6 lg:p-10 bg-white rounded-xl shadow-md">
        {/* Product Image */}
        <div className="md:col-span-6 flex items-center justify-center">
          <div className="w-[600px] h-[520px] rounded-xl overflow-hidden shadow-lg border">
            <Image
              src={selectedColor?.images?.[0] || product.image || "/placeholder.jpg"}
              alt={product.name || "Product"}
              width={600}
              height={520}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div ref={productInfoRef} className="md:col-span-4 flex flex-col">
          <div>
            <h2 className="text-2xl font-medium">{product.name || "Sản phẩm không xác định"}</h2>
            <div className="mt-4">
              <p className="mt-2 text-gray-600">{product.mota || "Không có mô tả."}</p>
            </div>
            <div className="mt-3 flex items-center gap-4">
              <span className="text-2xl font-bold text-red-500">
                {(product.pricePromo || product.price)?.toLocaleString()}đ
              </span>
              {product.pricePromo && product.price && (
                <>
                  <span className="text-gray-400 line-through">{product.price.toLocaleString()}đ</span>
                  <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
                    Giảm {Math.round(((product.price - product.pricePromo) / product.price) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              {selectedSize && selectedColor ? (
                selectedColor.stock > 0 ? (
                  <p className="text-blue-600 font-medium">Tình trạng: Còn hàng ({selectedColor.stock})</p>
                ) : (
                  <p className="text-red-600 font-medium">Tình trạng: Hết hàng (0)</p>
                )
              ) : product.quantity > 0 ? (
                <p className="text-green-600 font-medium">Tình trạng: Còn hàng ({product.quantity})</p>
              ) : (
                <p className="text-red-600 font-medium">Tình trạng: Hết hàng (0)</p>
              )}
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Size</h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Hướng dẫn chọn size
                </button>
              </div>
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
                  <div className="flex flex-row flex-wrap gap-3 mt-2 max-w-full">
                    {allColors.map((color) => {
                      const variant = availableColors.find((v) => v.color === color);
                      const isAvailable = variant && variant.stock > 0;
                      return (
                        <div key={color} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 ${
                              selectedColor?.color.toLowerCase() === color
                                ? "border-blue-500 scale-110"
                                : isAvailable
                                ? "border-gray-300 hover:border-gray-500 cursor-pointer"
                                : "border-gray-300 opacity-50 cursor-not-allowed"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                          />
                        </div>
                      );
                    })}
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

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 border border-blue-500 rounded-md text-gray-900 hover:bg-blue-500 hover:text-white transition-all"
            >
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6 w-full">
        <h3 className="text-lg font-medium text-gray-700">Bình luận</h3>
        <div className="flex items-center mt-4">
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
        {commentError && (
          <p className="text-red-500 text-sm mt-2">{commentError}</p>
        )}
        <div className="mt-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">Không có bình luận.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((cmt) => (
                <li key={cmt._id} className="p-3 border rounded-lg bg-gray-100">
                  <div className="flex items-start gap-3">
                    <img
                      src={cmt.user.avatar || "https://i.pinimg.com/736x/b7/91/44/b79144e03dc4996ce319ff59118caf65.jpg"}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-blue-600">{cmt.user.name || "Ẩn danh"}</span>
                      <p className="text-gray-800">{cmt.content}</p>
                      <span className="text-gray-500 text-sm">
                        {new Date(cmt.createdAt).toLocaleString()}
                      </span>
                      <div className="flex gap-4 mt-1">
                        <button
                          className={`text-lg flex items-center gap-1 text-gray-600 hover:text-gray-800`}
                          onClick={() => toggleLike(cmt._id)}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} /> {cmt.like || 0}
                        </button>
                        <button
                          className={`text-lg flex items-center gap-1 text-gray-600 hover:text-gray-800`}
                          onClick={() => toggleDislike(cmt._id)}
                        >
                          <FontAwesomeIcon icon={faThumbsDown} /> {cmt.dislike || 0}
                        </button>
                        <button
                          className="text-sm text-gray-600 hover:text-blue-600"
                          onClick={() => setReplyInput((prev) => ({ ...prev, [cmt._id]: prev[cmt._id] || "" }))}
                        >
                          Trả lời
                        </button>
                      </div>

                      {/* Reply Input */}
                      {replyInput[cmt._id] !== undefined && (
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Viết câu trả lời..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={replyInput[cmt._id]}
                            onChange={(e) =>
                              setReplyInput((prev) => ({ ...prev, [cmt._id]: e.target.value }))
                            }
                            onKeyDown={(e) => e.key === "Enter" && handleAddReply(cmt._id)}
                          />
                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={() => handleAddReply(cmt._id)}
                          >
                            Gửi
                          </button>
                        </div>
                      )}

                      {/* Reply Toggle */}
                      {cmt.replies?.length > 0 && (
                        <div className="mt-2">
                          <button
                            className="text-sm text-gray-600 hover:text-blue-600"
                            onClick={() => toggleShowReplies(cmt._id)}
                          >
                            {showReplies[cmt._id] ? "Ẩn phản hồi" : `Xem ${cmt.replies.length} phản hồi`}
                          </button>

                          {/* Replies */}
                          {showReplies[cmt._id] && (
                            <ul className="mt-2 ml-6 space-y-2">
                              {cmt.replies.map((reply) => (
                                <li key={reply.id} className="border-l-2 pl-2">
                                  <div className="flex items-start gap-2">
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
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center">Sản phẩm khác</h2>
        <div className="mt-12">
          <Product products={relatedProducts} limit={3} />
        </div>
      </div>

      {/* Render Size Guide Modal */}
      {showSizeGuide && <Dhsize onClose={() => setShowSizeGuide(false)} />}
    </div>
  );
}