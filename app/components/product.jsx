import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product() {
  return (
    <div className="w-[321px] min-h-[456] bg-white flex flex-col gap-5  text-gray-900 py-2 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
      <div className="overflow-hidden w-[321] h-[290]">
        <Image
          src="https://i.pinimg.com/736x/a0/34/5f/a0345fdbcf2697e90a1b1241437870ad.jpg"
          width={321}
          height={205}
          alt="Hình ảnh mô tả"
        />
      </div>
      <div className="flex flex-row gap-2 h-[50] px-2">
        <Image
          src="https://i.pinimg.com/736x/a0/34/5f/a0345fdbcf2697e90a1b1241437870ad.jpg"
          width={50}
          height={20}
          alt="Hình ảnh mô tả"
          className="border-4 border-gray-500/40"
        />
        <Image
          src="https://i.pinimg.com/736x/a0/34/5f/a0345fdbcf2697e90a1b1241437870ad.jpg"
          width={50}
          height={50}
          alt="Hình ảnh mô tả"
          className="border-4 border-gray-500/40"
        />
      </div>
      <div
        className="text-lg antialiased md:subpixel-antialiased px-2"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
          width: "321px",
        }}
      >
        <h1>Áo Thun Local Brand Unisex Teelab Seasonal Tshirt TS295 </h1>
      </div>

      <div>
        <span className="text-red-500 px-2">10.000VNĐ</span>
        <span className="px-2 line-through">20.000VNĐ</span>
      </div>
      <div>
        <span className="text-yellow-300 px-2">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </span>
        <span className="px-2 text-gray-400">Đã bán hơn 2,4k</span>
      </div>
      <div className="flex flex-row gap-2 items-center px-2">
        <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
        <span className="text-lg relative top-0.5">Hồ Chí Minh</span>
      </div>
    </div>
  );
}
