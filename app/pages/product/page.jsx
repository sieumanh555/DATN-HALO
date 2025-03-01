"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faSignal,
  faFire,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import SearchComponent from "@/app/components/search";
import DropDown from "@/app/components/dropDown";
import Product from "@/app/components/product";
import Pagination from "@/app/components/pagination";
import Sidebar from "@/app/components/sidebar";
import Checkbox from "@/app/components/checkbox";
import Processbar from "@/app/components/processBar";
import Image from "next/image";
export default function Products() {
  return (
    <div className="flex justify-center align-middle">
      <div className="min-h-[100vh] max-w-[1440px] flex gap-[2%] my-32">
        <div className="w-[25%]">
          <div className="bg-white rounded-xl mb-5">
            <div className="min-w-[100px] text-gray-900 flex gap-5 align-middle items-center bg-gradient-to-r from-blue-300 to-blue-400 hover:bg-blue-600 transition duration-300 py-3 px-2 rounded-lg h-[72px]">
              <FontAwesomeIcon icon={faListCheck} className="text-[28px]" />
              <h2 className="text-[28px]">Danh mục</h2>
            </div>
            <Sidebar>
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                      <svg
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </p>
                  </div>
                  {/* Add more content here */}
                </div>
              </div>
            </Sidebar>
          </div>
          <div className="bg-white rounded-xl mb-5">
            <div className="min-w-[100px] text-gray-900 flex gap-5 align-middle items-center bg-gradient-to-r from-blue-300 to-blue-400 hover:bg-blue-600 transition duration-300 py-3 px-2 rounded-lg h-[72px]">
              <FontAwesomeIcon icon={faSignal} className="text-[28px]" />
              <h2 className="text-[28px]">Tình trạng</h2>
            </div>
            <div className="px-6 py-4 overflow-y-auto text-[24px]">
              <Checkbox />
            </div>
          </div>
          <div className="bg-white rounded-xl mb-5">
            <div className="min-w-[100px] text-gray-900 flex gap-5 align-middle items-center bg-gradient-to-r from-blue-300 to-blue-400 hover:bg-blue-600 transition duration-300 py-3 px-2 rounded-lg h-[72px]">
              <FontAwesomeIcon icon={faFire} className="text-[28px]" />
              <h2 className="text-[28px]">Xu hướng</h2>
            </div>
            <div className="px-6 py-4 overflow-y-auto text-[24px]">
              <Checkbox />
            </div>
          </div>
          <div className="bg-white rounded-xl mb-5">
            <div className="min-w-[100px] text-gray-900 flex gap-5 align-middle items-center bg-gradient-to-r from-blue-300 to-blue-400 hover:bg-blue-600 transition duration-300 py-3 px-2 rounded-lg h-[72px]">
              <FontAwesomeIcon icon={faMoneyBill} className="text-[28px]" />
              <h2 className="text-[28px]">Theo giá</h2>
            </div>
            <div className="px-6 py-4 overflow-y-auto text-[24px]">
              <Processbar></Processbar>
            </div>
          </div>
          <div className="w-full min-h-auto bg-slate-700">
            <Image
              src="https://i.pinimg.com/736x/05/cb/ec/05cbecedd26fd8812e31d93855f59e1d.jpg"
              alt="Hình ảnh mô tả"
              layout="responsive"
              width={450}
              height={200}
              quality={100}
              priority // Load ảnh ngay lập tức với chất lượng cao
              className="border-4 border-gray-900/40"
            />
          </div>
        </div>
        <div className="w-[70%]">
          <div
            className="text-gray-900 flex items-center w-full 
    bg-gradient-to-r from-blue-300 to-blue-400 hover:bg-blue-600 transition duration-300
    rounded-lg px-5 py-5"
          >
            {/* Cụm Processbar & DropDown */}
            <div className="flex items-center gap-x-5">
              <div className="h-[48px]">
                <DropDown />
              </div>
              <div className="h-[48px]">
                <DropDown />
              </div>
            </div>

            {/* SearchComponent sát phải */}
            <div className="ml-auto">
              <SearchComponent />
            </div>
          </div>

          <div className="my-5 text-gray-900">
            <span>Kết quả tìm kiểm: 80 sản phẩm</span>
          </div>
          <div className="grid grid-cols-3 gap-y-7 py-7 bg-white rounded-xl overflow-hidden justify-center justify-items-center">
            {Array.from({ length: 16 }).map((_, i) => (
              <Product key={i} />
            ))}
          </div>
          <div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
