export const formatDate = (str: string | Date) => {
    console.log(typeof str);
    const date = typeof str === "string" ? new Date(str) : str;
    return date.toLocaleDateString("vi-VN");
}