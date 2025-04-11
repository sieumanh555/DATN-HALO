"use client";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useParams} from "next/navigation";
import Product from "../../../components/product";

import type {ProductResponse} from "@/app/models/Product";
import {addItem} from "@/redux/slices/cartSlice";
import CartState from "@/app/models/CartState";

export default function Trangchitiet() {
    const dispatch = useDispatch();
    const cart = useSelector((state: CartState) => state.cart.products || []);
    console.log(">>>> check cart: ", cart);
    const {id} = useParams();
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageHeight, setImageHeight] = useState('auto');
    const productInfoRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/products/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch product: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data.data);
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
    const [likedComments, setLikedComments] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState({});

    const sizes = [...new Set(product?.variants?.map((v) => v.size) || [])];
    const allColors = ["black", "white", "blue", "red", "yellow"];
    const availableColors = selectedSize
        ? product?.variants
        ?.filter((v) => v.size === selectedSize)
        .map((v) => ({color: v.color.toLowerCase(), stock: v.stock, images: v.images})) || []
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
            setSelectedColor(variant); // Cập nhật selectedColor với toàn bộ variant
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

    if (loading) return <p className="text-center">Đang tải...</p>;
    if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;
    if (!product) return <p className="text-center">Không tìm thấy sản phẩm.</p>;

    return (
        <div className="max-w-[1920px] px-[100px] py-[48px]">
            <div className="grid grid-cols-1 md:grid-cols-10 gap-8 p-6 md:p-10 bg-white rounded-xl shadow-md">
                {/* Product Image */}
                <div className="md:col-span-6 flex items-center justify-center">
                    <div
                        className="w-full rounded-xl overflow-hidden shadow-lg border"
                        style={{height: imageHeight}}
                    >
                        <Image
                            src={selectedColor?.hinhanh?.[0] || product.hinhanh || "/placeholder.jpg"}
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
                                    <div className="flex flex-row gap-4 mt-2">
                                        {allColors.map((color) => {
                                            const variant = availableColors.find((v) => v.color === color);
                                            const isAvailable = !!variant;
                                            return (
                                                <div
                                                    key={color}
                                                    className="flex flex-col items-center"
                                                >
                                                    <div
                                                        className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                                                            isAvailable
                                                                ? selectedColor?.color.toLowerCase() === color
                                                                    ? "border-blue-500 scale-110"
                                                                    : "border-gray-300 hover:border-gray-500 cursor-pointer"
                                                                : "border-gray-300 opacity-50 cursor-not-allowed"
                                                        }`}
                                                        style={{backgroundColor: color}}
                                                        onClick={() => isAvailable && handleColorChange(color)}
                                                    />
                                                    {/* {selectedColor?.color.toLowerCase() === color && (
                            <span className="text-sm mt-1 text-center text-gray-600">
                              {isAvailable ? `${variant.stock} còn` : "Hết hàng"}
                            </span>
                          )} */}
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
                        <button
                            onClick={() => dispatch(addItem({
                                ...product,
                                selectedSize: selectedSize,
                                selectedVariant: selectedColor,
                                quantityy: quantity
                            }))}
                            className="flex-1 px-6 py-3 border border-blue-500 rounded-md text-gray-900 hover:bg-blue-500 hover:text-white transition-all">
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">
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
                        <ul className="space-y-2">
                            {comments.map((cmt) => (
                                <li key={cmt.id} className="p-3 border rounded-lg bg-gray-100 flex flex-col gap-2">
                                    <div className="flex items-start gap-3">
                                        <img src={cmt.avatar} alt="Avatar" className="w-10 h-10 rounded-full border"/>
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
                                                    <FontAwesomeIcon icon={faThumbsUp}/> {likes[cmt.id] || 0}
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
                <Product products={[product]} limit={3}/>
            </div>
        </div>
    );
}