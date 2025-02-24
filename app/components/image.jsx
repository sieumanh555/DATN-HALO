import Image from "next/image";

export default function Images() {
  return (
    <Image
      src="https://i.pinimg.com/736x/1e/40/52/1e40527dfdff0ae315f471a32e02c5e8.jpg"
      width={450}
      height={200}
      alt="Hình ảnh mô tả"
      className="border-4 border-gray-900/40 cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-102"
    />
  );
}
