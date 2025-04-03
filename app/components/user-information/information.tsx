"use client"
// import {useRouter} from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";
import {ChevronUp, Edit, Save, X} from "lucide-react";

import type User from "@/app/models/User";
import {getCookieCSide, getPayload, setCookie} from "@/app/libs/Cookie/clientSideCookie";

export default function UserInformation() {
    // const router = useRouter();
    const token = getCookieCSide("as_tn");
    // if(!token){
    //     alert("Phiên đăng nhập hết hạn")
    //     router.push("/pages/login")
    // }
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState(user?.name);
    const [gender, setGender] = useState(user?.gender);
    const [birthday, setBirthDay] = useState(user?.birthday ? new Date(user.birthday).toISOString().split("T")[0] : "");
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [zipcode, setZipCode] = useState(user?.zipcode);
    const [dropDown, setDropDown] = useState(false);

    useEffect(() => {
        const payload = getPayload();
        setUser(payload);
        if (payload) {
            setName(payload.name || "");
            setGender(payload.gender || "");
            setBirthDay(payload.birthday ? new Date(payload.birthday).toISOString().split("T")[0] : "");
            setPhone(payload.phone || "");
            setAddress(payload.address || "");
            setZipCode(payload.zipcode || "");
        }
    }, []);

    const updateUserInfo = async () => {
        try {
            const values = {name, gender, birthday, phone, address, zipcode};
            const response = await fetch(`http://localhost:3000/users/${user?._id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (!response.ok) {
                console.log("Lỗi sửa thông tin user: ", data);
                return;
            }
            setCookie("as_tn", data.access_token, 3);
            setCookie("rh_tn", data.refresh_token, 7);
            setUser(getPayload());
            alert("Sửa thông tin thành công");
        } catch (error) {
            console.log(">>> Lỗi: ", error);
        }
    }
    return (
        <div className="w-full mx-auto py-4 sm:p-6 bg-white rounded-xl">
            {user && (

                <div className="flex flex-col gap-8">

                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-100 rounded-lg">
                        <div className="relative">
                            <Image
                                src={`/assets/images/MLB-Chunky-Runner-NY-Black-White(4).png`}
                                alt="Avatar"
                                width={120}
                                height={120}
                                className="rounded-full object-cover ring-4 ring-white shadow-md"
                            />
                        </div>
                        <div className="flex flex-col text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-gray-800 capitalize">{name}</h2>
                            <p className="text-gray-500 mt-1">{user?.email}</p>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Tên tài khoản</label>
                                <input
                                    type="text"
                                    value={name}
                                    readOnly={!isEditing}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full px-4 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none border
                                        ${!isEditing ? 'bg-gray-50  cursor-not-allowed' : 'bg-white'}`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Giới tính</label>
                                {isEditing ? (
                                    <div className="relative w-full">
                                        <div className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-300 border-gray-200'} 
                                            flex justify-between items-center cursor-pointer`}
                                             onClick={() => setDropDown(!dropDown)}>
                                            <input
                                                type="text"
                                                value={gender}
                                                readOnly
                                                className="text-sm focus:outline-none cursor-pointer bg-transparent w-full"
                                            />
                                            <ChevronUp
                                                size={20}
                                                strokeWidth={1.5}
                                                className={`transition-transform duration-300 ${dropDown ? '-rotate-180' : 'rotate-0'}`}
                                            />
                                        </div>
                                        {/* Dropdown Menu */}
                                        <div
                                            className={`${dropDown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} 
                                            absolute w-full top-12 left-0 border-2 rounded-lg bg-white shadow-lg transition-all duration-300 z-10`}>
                                            {["Nam", "Nữ", "Khác"]
                                                .filter((genderValue) => genderValue !== gender)
                                                .map((value) => (
                                                    <button
                                                        key={value}
                                                        onClick={() => {
                                                            setGender(value);
                                                            setDropDown(false);
                                                        }}
                                                        className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors duration-200 text-sm"
                                                    >
                                                        {value}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        value={gender}
                                        readOnly
                                        className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 cursor-not-allowed text-sm text-gray-700"
                                    />
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Ngày sinh</label>
                                <input
                                    type="date"
                                    value={birthday}
                                    readOnly={!isEditing}
                                    onChange={(e) => setBirthDay(e.target.value)}
                                    className={`w-full px-4 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none border
                                        ${!isEditing ? 'bg-gray-50  cursor-not-allowed' : 'bg-white'}`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Số điện thoại</label>
                                <input
                                    type="text"
                                    value={phone}
                                    readOnly={!isEditing}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`w-full px-4 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none border
                                        ${!isEditing ? 'bg-gray-50  cursor-not-allowed' : 'bg-white'}`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Địa chỉ</label>
                                <input
                                    type="text"
                                    value={address}
                                    readOnly={!isEditing}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className={`w-full px-4 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none border
                                        ${!isEditing ? 'bg-gray-50  cursor-not-allowed' : 'bg-white'}`}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Mã bưu cục</label>
                                <input
                                    type="number"
                                    value={zipcode}
                                    readOnly={!isEditing}
                                    onChange={(e) => setZipCode(Number(e.target.value))}
                                    className={`w-full px-4 py-2.5 rounded-lg text-sm text-gray-700 focus:outline-none border
                                        ${!isEditing ? 'bg-gray-50  cursor-not-allowed' : 'bg-white'}`}
                                />
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-8">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white`}
                                >
                                    <Edit size={18}/>
                                    <span>Sửa</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        updateUserInfo();
                                        setIsEditing(!isEditing)
                                    }}
                                    className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all duration-200 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white`}
                                >
                                    <Save size={18}/>
                                    <span>Lưu</span>
                                </button>
                            )}

                            {isEditing && (
                                <button
                                    onClick={() => {
                                        // resetFormData();
                                        setIsEditing(false);
                                    }}
                                    className="px-6 py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg flex items-center gap-2 font-medium transition-all duration-200"
                                >
                                    <X size={18}/>
                                    <span>Hủy</span>
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}