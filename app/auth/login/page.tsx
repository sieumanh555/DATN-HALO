"use client"
import Image from "next/image";
import {getSession, signIn} from "next-auth/react";
import {House} from 'lucide-react';

export default function AuthLogin() {
    const handleSignIn = async (provider: "google" | "facebook") => {
        try {
            const response = await signIn(provider, {redirect: false});

            if (response?.error) {
                console.error("Lỗi đăng nhập:", response.error);
                return;
            }

            let session = null;
            let retries = 10;
            while (!session && retries > 0) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                session = await getSession();
                console.log(`Lần thử ${10 - retries}:`, session);
                retries--;
            }

            if (!session || !session.user) {
                console.error("Session không có user, dừng request.");
                return;
            }

        } catch (error) {
            console.error("Lỗi trong handleSignIn:", error);
        }
    };

    return (
        <section className="full-shadow w-full max-w-[24%] mx-auto my-10 p-8 bg-white rounded">

            <h1 className="text-3xl sm:text-3xl text-[#034292] text-center font-bold tracking-wider mb-8">Đăng nhập</h1>

            <div className="flex flex-col gap-5">
                <button
                    onClick={() => handleSignIn("facebook")}
                    className="w-full h-14 border-2 border-gray-200 rounded-lg hover:border-[#034292]
                        transition-all duration-300 ease-in-out transform hover:-translate-y-1
                        hover:shadow-md group"
                >
                    <div className="flex justify-center items-center gap-10 px-6">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/assets/images/facebook-icon.webp"
                                alt="facebook"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="flex-grow text-left text-lg font-medium text-gray-700
                            group-hover:text-[#034292] transition-colors duration-300">
                            Facebook
                        </span>
                    </div>
                </button>

                <button
                    onClick={() => handleSignIn("google")}
                    className="w-full h-14 border-2 border-gray-200 rounded-lg hover:border-[#034292]
                        transition-all duration-300 ease-in-out transform hover:-translate-y-1
                        hover:shadow-md group"
                >
                    <div className="flex justify-center items-center gap-10 px-6">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/assets/images/google-icon.webp"
                                alt="google"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="flex-grow text-left text-lg font-medium text-gray-700
                            group-hover:text-[#034292] transition-colors duration-300">
                            Google
                        </span>
                    </div>
                </button>
                <button
                    onClick={()=> window.location.href= "/"}
                    className="w-full h-14 border-2 border-gray-200 rounded-lg hover:border-[#034292]
                        transition-all duration-300 ease-in-out transform hover:-translate-y-1
                        hover:shadow-md group"
                >
                    <div className="flex justify-center items-center gap-10 px-6">
                        <House className={`group-hover:text-[#034292]`}/>
                        <span className="flex-grow text-left text-lg font-medium text-gray-700
                            group-hover:text-[#034292] transition-colors duration-300">
                            Quay lại trang chủ
                        </span>
                    </div>
                </button>
            </div>
        </section>
    );
}