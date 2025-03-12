"use client";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faStar  } from "@fortawesome/free-solid-svg-icons";


export default function Trangchitiet() {

    const colorImageMap = {
        yellow: "/assets/images/haloyellow.jpg",
        blue: "/assets/images/haloblue.jpg",
        red: "/assets/images/haloered.webp",
        pink: "/assets/images/halohong.webp",
    };

    // Hàm cập nhật màu sắc và thay đổi hình ảnh tương ứng
    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedImage(colorImageMap[color]);
    };

    const sizeColorOptions = {
        X: ["yellow", "blue"],
        M: ["red", "pink"],
        L: ["blue", "red", "yellow"],
        XL: ["pink", "yellow"]
    };
    // Trạng thái size và màu sắc
    const sizes = Object.keys(sizeColorOptions);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [availableColors, setAvailableColors] = useState(sizeColorOptions[selectedSize]);
    const [selectedColor, setSelectedColor] = useState(availableColors[0]);
    const [selectedImage, setSelectedImage] = useState(colorImageMap[selectedColor]);

    // Cập nhật màu khi chọn size mới
    const handleSizeChange = (size) => {
        const newColors = sizeColorOptions[size];
        setSelectedSize(size);
        setAvailableColors(newColors);
        setSelectedColor(newColors[0]);
        setSelectedImage(colorImageMap[newColors[0]]);
    };

    const [quantity, setQuantity] = useState(1);
    const [likedComments, setLikedComments] = useState({});

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [replies] = useState({});
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

    const handleSubmitComment = () => {
        if (comment.trim() !== "") {
            handleAddComment();
        }
    };

    const toggleLike = (commentId) => {
        setLikedComments((prevLiked) => ({
            ...prevLiked,
            [commentId]: !prevLiked[commentId], // Đảo trạng thái like
        }));

        setLikes((prevLikes) => ({
            ...prevLikes,
            [commentId]: (prevLikes[commentId] || 0) + (likedComments[commentId] ? -1 : 1),
        }));
    };


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
            <div className="grid grid-cols-10 gap-8 p-6 md:p-10 bg-white rounded-xl shadow-md">
                {/* Hình ảnh sản phẩm */}
                <div className="col-span-6 flex flex-col md:flex-row gap-6">
                    <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg border">
                        <Image src={selectedImage}
                               alt="Product" width={500}
                               height={500}
                               className="object-cover w-full h-full" />
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="col-span-4">
                    <h2 className="text-3xl font-semibold">Giày Rollers Halo Hồng Twinkle BREEZY ROLLERS 2186860</h2>
                    {/* Mô tả sản phẩm */}
                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-700">Mô tả sản phẩm</h3>
                        <p className="mt-2 text-gray-600">
                            Giày Rollers Halo Hồng Twinkle BREEZY ROLLERS 2186860 được làm từ chất liệu cotton cao cấp, mang đến sự thoải mái và giữ ấm tốt.
                            Thiết kế hiện đại phù hợp với nhiều phong cách thời trang khác nhau.
                        </p>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                        <span className="text-2xl font-bold text-red-500">108.000đ</span>
                        <span className="text-gray-400 line-through">230.000đ</span>
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
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chọn màu dựa trên size */}
                    <div className="mt-6 flex justify-between items-center">
                        <h3 className="text-lg font-medium">Chọn màu</h3>
                        <div className="flex gap-3">
                            {availableColors.map((color) => (
                                <div
                                    key={color}
                                    className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all duration-300 hover:scale-110 shadow ${
                                        selectedColor === color ? "border-black" : "border-gray-300"
                                    }`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(color)}
                                ></div>
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
                        <button className="flex-1 px-6 py-3 border  border-blue-500 rounded-md text-gray-900 hover:bg-blue-500 hover:text-white transition-all">
                            Thêm vào giỏ hàng
                        </button>
                        <button className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>


            {/*------------------------------------------ */}



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
                                                    className={`text-lg flex items-center gap-1 ${
                                                        likedComments[cmt.id] ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
                                                    }`}
                                                    onClick={() => toggleLike(cmt.id)}
                                                >
                                                    <FontAwesomeIcon icon={faThumbsUp} /> {likes[cmt.id] || 0}
                                                </button>

                                                <button
                                                    className="text-gray-600 hover:text-gray-800"
                                                    onClick={() => setReplyingTo(cmt.id)}
                                                >
                                                    Phản hồi
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {replyingTo === cmt.id && (
                                        <div className="ml-12 mt-2 flex items-center">
                                            <input
                                                type="text"
                                                placeholder="Viết bình luận..."
                                                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()} // Xử lý khi nhấn Enter
                                            />
                                            <button
                                                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                onClick={handleSubmitComment} // Xử lý khi nhấn nút "Gửi"
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
                <span>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg" />
                </span>
                                <span>{product.sold}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}