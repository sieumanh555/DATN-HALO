  "use client";
  import { useState, useEffect, useRef } from "react";
  import Image from "next/image";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
  import { useParams } from "next/navigation";
  import Product from "../../../components/product";

  export default function Trangchitiet() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageHeight, setImageHeight] = useState('auto');
    const productInfoRef = useRef(null);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/product/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.status}`);
          }
          const data = await response.json();
          setProduct(data);

          const productsResponse = await fetch(`http://localhost:5000/product`); // Giả sử endpoint này trả về tất cả sản phẩm
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.status}`);
        }
        const allProducts = await productsResponse.json();

        const filteredProducts = allProducts.filter(p => p._id !== id);
        setRelatedProducts(filteredProducts);

        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      if (id) {
        fetchProduct();
      }
    }, [id]);

    useEffect(() => {
      if (productInfoRef.current) {
        const height = productInfoRef.current.offsetHeight;
        setImageHeight(`${height}px`);
      }
    }, [product]);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [replyInput, setReplyInput] = useState({});
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});
    const [likedComments, setLikedComments] = useState({});
    const [dislikedComments, setDislikedComments] = useState({});
    const [showReplies, setShowReplies] = useState({});

    const sizes = [...new Set(product?.variants?.map((v) => v.size) || [])];
    const allColors = ["black", "white", "blue", "red", "yellow"]; 
    const availableColors = selectedSize
      ? product?.variants
          ?.filter((v) => v.size === selectedSize)
          .map((v) => ({ color: v.color.toLowerCase(), stock: v.stock, images: v.images })) || []
      : [];

    useEffect(() => {
      if (product?.variants?.length > 0 && !selectedSize) {
        setSelectedSize(sizes[0]);
        const firstVariant = product.variants.find((v) => v.size === sizes[0]);
        setSelectedColor(firstVariant);
      }
    }, [product]);

    const handleSizeChange = (size) => {
      setSelectedSize(size);
      const firstVariant = product.variants.find((v) => v.size === size);
      setSelectedColor(firstVariant || null);
    };

    const handleColorChange = (color) => {
      const variant = availableColors.find((v) => v.color === color);
      if (variant) {
        setSelectedColor(variant);
      }
    };

    const handleAddComment = () => {
      if (comment.trim() === "") return;
      const newComment = {
        id: Date.now(),
        username: "User123",
        content: comment,
        time: new Date().toLocaleString(),
        avatar: "/assets/images/avatar-default.png",
        replies: [],
      };
      setComments([newComment, ...comments]);
      setComment("");
    };

    const handleAddReply = (commentId) => {
      if (!replyInput[commentId]?.trim()) return;
      const newReply = {
        id: Date.now(),
        username: "User123",
        content: replyInput[commentId],
        time: new Date().toLocaleString(),
        avatar: "/assets/images/avatar-default.png",
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      ));
      setReplyInput(prev => ({ ...prev, [commentId]: "" }));
      // Tự động hiển thị replies sau khi thêm reply mới
      setShowReplies(prev => ({ ...prev, [commentId]: true }));
    };

    const toggleLike = (id, isReply = false, parentId = null) => {
      const target = isReply ? `${parentId}-${id}` : id;
      setLikedComments(prev => ({
        ...prev,
        [target]: !prev[target]
      }));
      setDislikedComments(prev => ({
        ...prev,
        [target]: prev[target] && false
      }));
      setLikes(prev => ({
        ...prev,
        [target]: (prev[target] || 0) + (likedComments[target] ? -1 : 1)
      }));
      setDislikes(prev => ({
        ...prev,
        [target]: prev[target] && (prev[target] - 1) || 0
      }));
    };

    const toggleDislike = (id, isReply = false, parentId = null) => {
      const target = isReply ? `${parentId}-${id}` : id;
      setDislikedComments(prev => ({
        ...prev,
        [target]: !prev[target]
      }));
      setLikedComments(prev => ({
        ...prev,
        [target]: prev[target] && false
      }));
      setDislikes(prev => ({
        ...prev,
        [target]: (prev[target] || 0) + (dislikedComments[target] ? -1 : 1)
      }));
      setLikes(prev => ({
        ...prev,
        [target]: prev[target] && (prev[target] - 1) || 0
      }));
    };

    const toggleShowReplies = (commentId) => {
      setShowReplies(prev => ({
        ...prev,
        [commentId]: !prev[commentId]
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
            <div 
              className="w-full rounded-xl overflow-hidden shadow-lg border"
              style={{ height: imageHeight }}
            >
              <Image
                src={selectedColor?.images?.[0] || product.image || "/placeholder.jpg"}
                alt={product.name || "Product"}
                width={600}
                height={520}
                sizes="100vw"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </div>

          {/* Product Info */}
          <div 
            ref={productInfoRef}
            className="md:col-span-4 flex flex-col"
          >
            <div>
              <h2 className="text-3xl font-semibold">{product.name}</h2>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700">Mô tả sản phẩm</h3>
                <p className="mt-2 text-gray-600">{product.mota}</p>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-2xl font-bold text-red-500">
                  {product.pricePromo?.toLocaleString() || product.price?.toLocaleString()}đ
                </span>
                {product.pricePromo && (
                  <span className="text-gray-400 line-through">
                    {product.price.toLocaleString()}đ
                  </span>
                )}
                {product.pricePromo && product.price && (
                  <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
                    Giảm {Math.round(((product.price - product.pricePromo) / product.price) * 100)}%
                  </span>
                )}
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
                    <div className="flex flex-row flex-wrap gap-3 mt-2 max-w-full">
                      {allColors.map((color) => {
                        const variant = availableColors.find((v) => v.color === color);
                        const isAvailable = !!variant;
                        return (
                          <div key={color} className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 ${
                                isAvailable
                                  ? selectedColor?.color.toLowerCase() === color
                                    ? "border-blue-500 scale-110"
                                    : "border-gray-300 hover:border-gray-500 cursor-pointer"
                                  : "border-gray-300 opacity-50 cursor-not-allowed"
                              }`}
                              style={{ backgroundColor: color }}
                              onClick={() => isAvailable && handleColorChange(color)}
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

        {/* Comments Section */}
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
              <ul className="space-y-4">
                {comments.map((cmt) => (
                  <li key={cmt.id} className="p-3 border rounded-lg bg-gray-100">
                    <div className="flex items-start gap-3">
                      <img src={cmt.avatar} alt="Avatar" className="w-10 h-10 rounded-full border" />
                      <div className="flex-1">
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
                          <button
                            className={`text-lg flex items-center gap-1 ${
                              dislikedComments[cmt.id] ? "text-red-600" : "text-gray-600 hover:text-gray-800"
                            }`}
                            onClick={() => toggleDislike(cmt.id)}
                          >
                            <FontAwesomeIcon icon={faThumbsDown} /> {dislikes[cmt.id] || 0}
                          </button>
                          <button
                            className="text-sm text-gray-600 hover:text-blue-600"
                            onClick={() => setReplyInput(prev => ({ ...prev, [cmt.id]: prev[cmt.id] || "" }))}
                          >
                            Trả lời
                          </button>
                        </div>

                        {/* Reply Input */}
                        {replyInput[cmt.id] !== undefined && (
                          <div className="mt-2 flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Viết câu trả lời..."
                              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={replyInput[cmt.id]}
                              onChange={(e) => setReplyInput(prev => ({ ...prev, [cmt.id]: e.target.value }))}
                              onKeyDown={(e) => e.key === "Enter" && handleAddReply(cmt.id)}
                            />
                            <button
                              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                              onClick={() => handleAddReply(cmt.id)}
                            >
                              Gửi
                            </button>
                          </div>
                        )}

                        {/* Reply Toggle */}
                        {cmt.replies.length > 0 && (
                          <div className="mt-2">
                            <button
                              className="text-sm text-gray-600 hover:text-blue-600"
                              onClick={() => toggleShowReplies(cmt.id)}
                            >
                              {showReplies[cmt.id] 
                                ? "Ẩn phản hồi" 
                                : `Xem ${cmt.replies.length} phản hồi`}
                            </button>

                            {/* Replies */}
                            {showReplies[cmt.id] && (
                              <ul className="mt-2 ml-6 space-y-2">
                                {cmt.replies.map((reply) => (
                                  <li key={reply.id} className="border-l-2 pl-2">
                                    <div className="flex items-start gap-2">
                                      <img src={reply.avatar} alt="Avatar" className="w-8 h-8 rounded-full border" />
                                      <div>
                                        <span className="font-bold text-blue-600">{reply.username}</span>
                                        <p className="text-gray-800">{reply.content}</p>
                                        <span className="text-gray-500 text-sm">{reply.time}</span>
                                        <div className="flex gap-4 mt-1">
                                          <button
                                            className={`text-sm flex items-center gap-1 ${
                                              likedComments[`${cmt.id}-${reply.id}`] ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
                                            }`}
                                            onClick={() => toggleLike(reply.id, true, cmt.id)}
                                          >
                                            <FontAwesomeIcon icon={faThumbsUp} /> {likes[`${cmt.id}-${reply.id}`] || 0}
                                          </button>
                                          <button
                                            className={`text-sm flex items-center gap-1 ${
                                              dislikedComments[`${cmt.id}-${reply.id}`] ? "text-red-600" : "text-gray-600 hover:text-gray-800"
                                            }`}
                                            onClick={() => toggleDislike(reply.id, true, cmt.id)}
                                          >
                                            <FontAwesomeIcon icon={faThumbsDown} /> {dislikes[`${cmt.id}-${reply.id}`] || 0}
                                          </button>
                                        </div>
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

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center">Sản phẩm khác</h2>
          <div className="mt-12">
            <Product products={relatedProducts} limit={3} />
          </div>
        </div>
      </div>
    );
  }