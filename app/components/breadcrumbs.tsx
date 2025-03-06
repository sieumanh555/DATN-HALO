'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";

import {ChevronRight} from "lucide-react";
import CartState from "@/app/models/CartState";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const cart = useSelector((state: CartState) => state.cart.products || []);

    // ['', 'pages', 'product', 'product-detail', '1'] -> ['product', 'product-detail', '1']
    const filterPaths = pathname.split("/").filter((path) => path !== "" && path !== "pages");
    const hiddenOnPaths = ["/", "/pages/login", "/pages/register"];
    const isHidden = hiddenOnPaths.includes(pathname);

    function handlePath(path: string) {
        if (path === "cart") {
            return path = "Giỏ hàng"
        } else if (path === "product") {
            return path = "Sản phẩm";
        }
    }

    return (
        <div>
            {!isHidden && cart.length > 0 &&(
                <div className={`w-full h-8 bg-gray-200 my-4 px-[100px] flex items-center space-x-2`}>
                    <Link href={`/`}>
                        <span>Trang chủ</span>
                    </Link>
                    {filterPaths.map((path, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <ChevronRight className="text-gray-500"/>
                            <Link href={`/${filterPaths.slice(0, index + 1).join("/")}`}>
                                <span>{handlePath(path)}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
