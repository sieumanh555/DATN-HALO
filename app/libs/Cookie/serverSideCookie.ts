import { NextRequest } from "next/server";

export const getCookieSSide = (req: NextRequest, name: string): string | null => {
    const cookieHeader = req.headers.get("cookie");
    console.log(">>>>> Cookies: ", cookieHeader);

    if (!cookieHeader) return null;

    const cookies = cookieHeader.split("; ");

    for (const cookie of cookies) {
        console.log("Processing cookie:", cookie);

        const index = cookie.indexOf("=");

        if (index === -1) continue;

        const key = cookie.substring(0, index).trim();
        const value = cookie.substring(index + 1).trim();

        if (key === name) {
            return decodeURIComponent(value);
        }
    }

    return null;
};
