"use client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListCheck} from "@fortawesome/free-solid-svg-icons";
import SearchComponent from "@/app/components/search";
import DropDown from "@/app/components/dropDown";
import Product from "@/app/components/product";
import Pagination from "@/app/components/pagination"

export default function Cart() {
    return (
        <div className="min-h-[1000px] w-full flex gap-[2%] my-5">
            <div className="w-[29%] bg-slate-400">
                <div className="w-[100px] text-gray-900 flex gap-5">
                    <FontAwesomeIcon icon={faListCheck}/>
                    <h2>Danh mục</h2>
                </div>
            </div>
            <div className="w-[69%]">
                <div className="text-gray-900  flex min-h-[58px] items-center bg-blue-300 rounded-lg py-3 px-2">
                    <div className="w-[10%]">
                        <span className="text-[28px]">Sắp xếp</span>
                    </div>
                    <div className="w-[20%]">
                        <DropDown/>
                    </div>
                    <div className="w-[20%]">
                        <DropDown/>
                    </div>
                    <div className="w-[50%] pl-[140px]">
                        <SearchComponent/>
                    </div>
                </div>
                <div className="my-5 text-gray-900">
                    <span>Kết quả tìm kiểm: 80 sản phẩm</span>
                </div>
                <div className="flex flex-wrap gap-[4.6px] my-5">
                    {Array.from({length: 16}).map((_, i) => (
                        <Product key={i}/>
                    ))}
                </div>
                <div>
                    <Pagination/>
                </div>
            </div>
        </div>
    );
}
