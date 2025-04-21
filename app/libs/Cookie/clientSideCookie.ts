export const setCookie = (name: string, token: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // *1000: set thời gian về milliseconds
    document.cookie = `${name}=${token}; Path=/; Expires=${date.toUTCString()}`
};

export const getCookieCSide = (name: string) => {
    if (typeof window === "undefined" || typeof document === "undefined") return null;
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

export const decodeBase64URL = (part: string) => {
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    return decodeURIComponent(atob(base64).split("").map((c) =>
        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(""));
}

export const getPayload = () => {
    const token = getCookieCSide("as_tn");
    if (token !== null) {
        const payload = token.split(".")[1];
        const decode = JSON.parse(decodeBase64URL(payload));
        return decode.userInfo;
    }
    return null;
}

export const getUserId = () => {
    const token = getCookieCSide("as_tn");
    if (token !== null) {
        const payload = token.split(".")[1];
        const decode = JSON.parse(decodeBase64URL(payload));
        return decode.userId;
    }
    return null;
}

export const deleteOneCookie = (name: string)=>{
    document.cookie = `${name}=; expires=Mon, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
export const deleteCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
            .replace(/^ +/, "")
            .replace(/=.*/, "=; expires=Sun, 01 Jan 1970 00:00:00 UTC; path=/");
    });
}