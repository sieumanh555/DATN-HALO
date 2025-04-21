"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Product from "../components/product";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(
                    `http://localhost:5000/product?search=${encodeURIComponent(query)}`
                );
                if (!response.ok) {
                    throw new Error("Không thể tải kết quả tìm kiếm");
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [query]);

    if (loading) return <div className="text-center py-8">Đang tải...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Lỗi: {error}</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">
                Kết quả tìm kiếm cho: {query || "Không có từ khóa"}
            </h1>
            <Product products={products} /> {/* Truyền dữ liệu sản phẩm vào Product */}
        </div>
    );
}