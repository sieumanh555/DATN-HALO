"use client";
import Image from "next/image";
import {getSession, signIn} from "next-auth/react";
// import {setCookie} from "@/app/libs/Cookie/clientSideCookie";

export default function ButtonLogin() {
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
        <div className="w-full flex justify-between">
            <button
                onClick={() => handleSignIn("facebook")}
                className="w-[48%] h-10 border-[2px] rounded flex justify-center items-center gap-2 transition-all duration-300 hover:scale-105"
            >
                <Image
                    src="/assets/images/facebook-icon.webp"
                    alt="facebook"
                    width={22}
                    height={22}
                />
                <p className="text-sm">Facebook</p>
            </button>
            <button
                onClick={() => handleSignIn("google")}
                className="w-[48%] h-10 border-[2px] rounded flex justify-center items-center gap-2 transition-all duration-300 hover:scale-105"
            >
                <Image
                    src="/assets/images/google-icon.webp"
                    alt="google"
                    width={22}
                    height={22}
                />
                <p className="text-sm">Google</p>
            </button>
        </div>
    );
}
