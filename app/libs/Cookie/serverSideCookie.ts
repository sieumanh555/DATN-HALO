import { NextRequest } from "next/server";

export const getCookieSSide = (req: NextRequest, name: string): string | null => {
    console.log('Debugging getCookieSSide');
    console.log('Request object:', req);

    // Kiểm tra req và headers
    if (!req || !req.headers) {
        console.log('Invalid request or headers');
        return null;
    }

    // Lấy header cookie
    const cookieHeader = req.headers.get("cookie");
    console.log('Cookie header:', cookieHeader);

    if (!cookieHeader) {
        console.log('No cookie header found');
        return null;
    }

    // Sử dụng regex để tách cookie an toàn hơn
    const cookies = cookieHeader.split(/;\s*/);
    console.log('Parsed cookies:', cookies);

    for (const cookie of cookies) {
        // Bỏ qua nếu cookie không hợp lệ
        if (!cookie) continue;

        console.log('Processing cookie:', cookie);

        // Tách key và value an toàn
        const [rawKey, rawValue] = cookie.split('=');

        // Trim và kiểm tra
        const key = rawKey?.trim();
        const value = rawValue?.trim();

        console.log('Key:', key);
        console.log('Value:', value);

        if (!key || !value) continue;

        if (key === name) {
            try {
                const decodedValue = decodeURIComponent(value);
                console.log('Decoded value:', decodedValue);
                return decodedValue;
            } catch (error) {
                console.error('Decoding error:', error);
                return value;
            }
        }
    }

    return null;
};
