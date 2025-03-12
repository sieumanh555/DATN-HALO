"use client";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";
export default function ButtonLogin() {
    const handleSignIn = async (provider: "google" | "facebook") => {
        try {
            const response = await signIn(provider, { redirect: false });
            alert(`>>>>> Checked response: ${response}`);
            if (response?.error) {
                console.error("Lỗi đăng nhập:", response.error);
                return;
            }

            // Chờ session cập nhật (tối đa 5 giây)
            let session = null;
            let retries = 10; // Thử tối đa 10 lần, mỗi lần cách nhau 500ms
            while (!session && retries > 0) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                session = await getSession();
                console.log(
                    `>>>>> Checking session, attempts left: ${retries}`,
                    session
                );
                retries--;
            }

            if (session?.user) {
                const values = {
                    name: session.user.name || "",
                    email: session.user.email || "",
                    phone: "",
                    address: "",
                    zipcode: 0,
                };
                console.log(">>>>> Checked values: ", values);

                try {
                    const res = await fetch("http://localhost:3000/users/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                    });

                    const data = await res.json();
                    console.log(">>>>> Checked data: ", data);
                } catch (error) {
                    console.error("Lỗi khi gửi dữ liệu lên server:", error);
                }
            } else {
                console.error("Không lấy được thông tin user sau khi đăng nhập.");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
        }
    };

    return (
        <div className="w-full flex justify-between">
            <button
                onClick={() => handleSignIn("facebook")}
                className="w-[48%] h-10 border-[2px] rounded flex justify-center items-center gap-2"
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
