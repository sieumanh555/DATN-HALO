import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/authOptions";
import { getCookieSSide } from "./app/libs/Cookie/serverSideCookie";
import type CustomSession  from "./app/models/CustomSession";

export async function middleware(req: NextRequest) {
    const accessToken = getCookieSSide(req, "as_tn");
    const refreshToken = getCookieSSide(req, "rh_tn");

    if (accessToken) {
        try {
            verify(accessToken, process.env.JWT_SECRET!);
            return NextResponse.next();
        } catch (error) {
            console.error("Access Token Invalid:", error);
        }
    }

    if (refreshToken) {
        try {
            const res = await fetch("http://localhost:3000/refreshToken", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${refreshToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();
                if (!data.access_token || !data.refresh_token) {
                    console.error("🚨 API refreshToken trả về dữ liệu không hợp lệ:", data);
                    return NextResponse.redirect(new URL("/pages/login", req.url));
                }
                const response = NextResponse.next();

                // Cập nhật lại cả accessToken và refreshToken mới
                response.cookies.set("as_tn", data.access_token, {
                    path: "/",
                    maxAge: 3 * 24 * 60 * 60,
                });
                response.cookies.set("rh_tn", data.refresh_token, {
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                });

                return response;
            } else {
                console.error("Lỗi khi refresh token:", await res.text());
            }
        } catch (error) {
            console.error("Lỗi khi gọi API refresh token:", error);
        }
    }

    const session = (await getServerSession(authOptions)) as CustomSession;
    if (session?.accessToken && session?.refreshToken) {
        const response = NextResponse.next();

        response.cookies.set("as_tn", session.accessToken, {
            path: "/",
            maxAge: 3 * 24 * 60 * 60, // 3 ngày
        });

        response.cookies.set("rh_tn", session.refreshToken, {
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 ngày
        });

        return response;
    }
    return NextResponse.redirect(new URL("/pages/login", req.url));
}

// Áp dụng middleware cho trang checkout
export const config = {
    matcher: ["/pages/checkout", "/pages/user-information"],
    runtime: "nodejs",
};
