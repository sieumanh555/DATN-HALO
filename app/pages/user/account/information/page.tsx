"use client"
import UserInformationComponent from "@/app/components/user-information/information";

export default function Information() {
    return (
            <div className="full-shadow h-full bg-white rounded-lg shadow-sm px-4 pt-6">
                <h2 className="text-xl font-semibold mb-4">Thông tin tài khoản</h2>
                <UserInformationComponent/>
            </div>
    )
}