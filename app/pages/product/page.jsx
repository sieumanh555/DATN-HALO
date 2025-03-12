"use client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListCheck, faMoneyBill,} from "@fortawesome/free-solid-svg-icons";
import SearchComponent from "@/app/components/search";
import DropDown from "@/app/components/arrange";
import CategoryPro from "@/app/components/categoryPro";
import Product from "@/app/components/product";
import Pagination from "@/app/components/pagination";
import Sidebar from "@/app/components/sidebar";
import Processbar from "@/app/components/processBar";

export default function Products() {
    return (
        <div className="flex justify-center bg-gray-100">
            <div className="min-h-[100vh] max-w-[1440px] flex gap-6 my-20 px-6">
                {/* Sidebar */}
                <div className="w-[25%] hidden lg:block">
                    <div className="space-y-5">
                        {[
                            {icon: faListCheck, title: "Danh mục", content: <Sidebar/>},
                            {icon: faMoneyBill, title: "Theo giá", content: <Processbar/>},
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md">
                                <div
                                    className="flex items-center gap-4 text-gray-900 bg-gradient-to-r from-blue-400 to-blue-600 py-4 px-4 rounded-t-xl">
                                    <FontAwesomeIcon icon={item.icon} className="text-[24px] text-white"/>
                                    <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                                </div>
                                <div className="p-4">{item.content}</div>
                            </div>
                        ))}
                    </div>

                    {/* Image Banner */}
                    {/* <div className="mt-5 rounded-lg overflow-hidden shadow-md">
            <Image
              src="https://i.pinimg.com/736x/05/cb/ec/05cbecedd26fd8812e31d93855f59e1d.jpg"
              alt="Hình ảnh mô tả"
              layout="responsive"
              width={450}
              height={200}
              quality={100}
              className="border border-gray-300"
            />
          </div> */}
                </div>

                {/* Main Content */}
                <div className="w-full lg:w-[70%]">
                    {/* Top Filter Bar */}
                    <div
                        className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 px-5 rounded-lg shadow-md">
                        <div className="flex gap-x-4">
                            <DropDown/>
                            <CategoryPro/>
                        </div>
                        <div className="mt-3 md:mt-0">
                            <SearchComponent/>
                        </div>
                    </div>

                    {/* Result Count */}
                    <div className="my-5 text-gray-900 text-lg font-medium">
                        Kết quả tìm kiếm: <span className="text-blue-600">80 sản phẩm</span>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-3 gap-6 py-6  rounded-lg shadow-md p-4">
                        {Array.from({length: 15}).map((_, i) => (
                            <Product key={i}/>
                        ))}
                    </div>


                    {/* Pagination */}
                    <div className="mt-6 flex justify-center">
                        <Pagination/>
                    </div>
                </div>
            </div>
        </div>
    );
}