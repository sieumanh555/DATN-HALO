export const formatDate = (str: string | Date) => {
    const date = typeof str === "string" ? new Date(str) : str;
    return date.toLocaleDateString("vi-VN");
}