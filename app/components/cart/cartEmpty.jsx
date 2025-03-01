"use client";
import Link from "next/link";
import Image from "next/image";

export default function CartEmpty() {
    return (
        <div className="my-20 flex flex-col items-center space-y-6">
            <Image src="/assets/images/bag-icon.png" alt="Bag icon" width={100} height={100}/>
            <p className="text-2xl">Giỏ hàng của bạn đang trống</p>
            <Link href="#">
                <button className="w-52 h-10 bg-[#034292] text-white rounded">
                    Mua sắm ngay
                </button>
            </Link>
        </div>
    );
}