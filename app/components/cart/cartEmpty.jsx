import Link from "next/link";
import Image from "next/image";

export default function CartEmpty() {
  return (
    <div className="my-6 flex flex-col items-center space-y-6">
      <Image src="/assets/images/bag-icon.png" alt="" width={100} height={100} />
      <p className="text-2xl">Giỏ hàng của bạn đang trống</p>
      <Link href="/">
        <button className="w-[200px] h-[40px] bg-[#034292] text-white rounded">
          Mua sắm ngay
        </button>
      </Link>
    </div>
  );
}