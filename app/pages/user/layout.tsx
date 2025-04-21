'use client';
import {useRouter} from "next/navigation";
import {Box, House, LogOut, User} from 'lucide-react';
import {deleteOneCookie} from "@/app/libs/Cookie/clientSideCookie";

import NavItem from "@/app/components/user-information/navItem";

export default function UserLayout({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const signOut = () => {
        deleteOneCookie("as_tn");
        // deleteOneCookie("rh-tn");
        router.push("/");
    }
    return (
        <div className="min-h-screen bg-gray-50 py-4">

            <div className="flex">

                <aside className="full-shadow w-72 min-h-[600px] bg-white rounded-lg">
                    <div className="px-4 py-6">
                        <div className="flex flex-col gap-[360px]">
                            <ul className="space-y-4">
                                <NavItem href="/" icon={<House size={24} strokeWidth={1.5}/>} label="Trang chủ"/>
                                <NavItem href="/pages/user/account/information" icon={<User size={24} strokeWidth={1.5}/>}
                                         label="Thông tin tài khoản"/>
                                <NavItem href="/pages/user/order" icon={<Box size={24} strokeWidth={1.5}/>} label="Quản lý đơn hàng"/>
                            </ul>
                            <button
                                onClick={() => signOut()}
                                className="group rounded-lg flex justify-center items-center gap-3 transition-transform  duration-300 hover:scale-110">
                                <LogOut strokeWidth={1.5} size={20} className="group-hover:text-blue-600"/>
                                <p className="group-hover:text-blue-600 font-medium py-3">Đăng xuất</p>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content sẽ thay đổi dựa trên children */}
                <div className="w-full px-6">
                    {children}
                </div>

            </div>

        </div>
    );
}
