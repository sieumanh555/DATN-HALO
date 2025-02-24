"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faSignal,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SearchComponent from "@/app/components/search";
import DropDown from "@/app/components/dropDown";
import Product from "@/app/components/product";
import Pagination from "@/app/components/pagination";
import Sidebar from "@/app/components/sidebar";
import Checkbox from "@/app/components/checkbox";
import Image from "next/image";
export default function Cart() {
  return (
    <div className="min-h-[1000px] w-full flex gap-[2%] my-5">
      <div className="w-[29%]">
        <div className="min-w-[100px] text-gray-900 flex gap-5 align-middle items-center bg-blue-300 py-3 px-2 rounded-lg h-[72px]">
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
        <div className="min-w-[100px] text-gray-900 flex gap-5 align-middle items-center bg-blue-300 py-3 px-2 rounded-lg h-[72px]">
          <FontAwesomeIcon icon={faSignal} className="text-[28px]" />
          <h2 className="text-[28px]">Tình trạng</h2>
        </div>
        <div className="px-6 py-4 overflow-y-auto text-[24px]">
          <Checkbox />
        </div>
        <div className="min-w-[100px] text-gray-900 flex gap-5 align-middle items-center bg-blue-300 py-3 px-2 rounded-lg h-[72px]">
          <FontAwesomeIcon icon={faFire} className="text-[28px]" />
          <h2 className="text-[28px]">Xu hướng</h2>
        </div>
        <div className="px-6 py-4 overflow-y-auto text-[24px]">
          <Checkbox />
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
      <div className="w-[69%]">
        <div className="text-gray-900  flex min-h-[58px] items-center bg-blue-300 rounded-lg py-3 px-2">
          <div className="w-[10%]">
            <span className="text-[28px]">Sắp xếp</span>
          </div>
          <div className="w-[20%]">
            <DropDown />
          </div>
          <div className="w-[20%]">
            <DropDown />
          </div>
          <div className="w-[50%] pl-[140px]">
            <SearchComponent />
          </div>
        </div>
        <div className="my-5 text-gray-900">
          <span>Kết quả tìm kiểm: 80 sản phẩm</span>
        </div>
        <div className="flex flex-wrap gap-[4.6px] my-5">
          {Array.from({ length: 16 }).map((_, i) => (
            <Product key={i} />
          ))}
        </div>
        <div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}
