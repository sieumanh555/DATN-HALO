"use client";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

function UserProfile() {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Tên phải có ít nhất 2 ký tự")
            .required("Vui lòng nhập tên"),
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Vui lòng nhập email"),
        phoneNumber: Yup.string()
            .min(10, "Số diện thoại phải có ít nhất 10 số")
            .required("Vui lòng số điện thoại"),
        zipNumber: Yup.string()
            .min(10, "Số diện thoại phải có ít nhất 10 số")
            .required("Vui lòng số điện thoại"),
    });

    const handleSubmit = async (values: any) => {
        const { name, email, password, phoneNumber, address, zipNumber } = values;
        const data = { name, email, password, phoneNumber, address, zipNumber };
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then(() => {
                console.log("Data changed: ", data);
                alert("Sửa thông tin thành công");
            })
            .catch((error) => alert("Error:" + error));
    };
    return (
        <div className="w-full h-screen bg-[#f9f9f9] flex">
            <div className="w-[6%] bg-[#fff] pt-[90px]">
                <Link href="/" title="Trang chủ">
                    <div className=" h-[60px] flex items-center justify-center hover:bg-slate-200 hover:bg-slate-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                        </svg>
                    </div>
                </Link>
                <Link href="/user/info" title="Tài khoản">
                    <div className=" h-[60px]  flex items-center justify-center hover:bg-slate-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                            />
                        </svg>
                    </div>
                </Link>
                <Link href="/user/orders" title="Đơn hàng">
                    <div className=" h-[60px]  flex items-center justify-center hover:bg-slate-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                            />
                        </svg>
                    </div>
                </Link>
                <Link href="/user/shipping" title="Vận chuyển">
                    <div className=" h-[60px]  flex items-center justify-center hover:bg-slate-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-7"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                            />
                        </svg>
                    </div>
                </Link>
            </div>

            <div className="w-[90%] mx-auto">
                <p className="text-2xl py-2 tracking-wide">Xin chào, Đạt</p>
                <p className="text-xs text-slate-500">16/12/2024</p>

                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        phoneNumber: "",
                        address: "",
                        zipNumber: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <div className="w-full bg-[#fff] mt-[32px] p-[54px] rounded-[10px]">
                            <div className="w-full flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-[100px] h-[100px] bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3AKQEVxpFijgBlTQkqZ600GZJd35-0lIAwQ&s')] rounded-full flex justify-center items-center">
                                    </div>
                                    <div className="ml-4 flex-col">
                                        <p className="text-xl font-bold">AdminDat</p>
                                        <p className="text-slate-500">adminDat@gmail.com</p>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-[100px] h-[40px] bg-[#4182F9] text-white rounded-[8px]"
                                >
                                    Chỉnh sửa
                                </button>
                            </div>

                            <Form className="flex flex-wrap justify-between mt-[20px] tracking-wide">
                                <div className="w-[600px] my-[8px]">
                                    <label className="font-medium">Tên tài khoản</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Vd: Datdepchaivl :0"
                                        className="w-full bg-slate-50 p-2 border border-gray-300 my-[10px] rounded-[5px]"
                                    />
                                    {errors.name && touched.name ? (
                                        <div className="text-red-500">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="w-[600px] my-[8px]">
                                    <label className="font-medium">Email</label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Vd: Datdepchai@gmail.com"
                                        className="w-full bg-slate-50 p-2 border border-gray-300 my-[10px] rounded-[5px]"
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="text-red-500">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="w-[600px] hidden">
                                    <label className="font-medium">Mật khẩu</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="mò cái gì không biết -_-"
                                        value=""
                                        className="w-full bg-slate-50 p-2 border border-gray-300 my-[10px] rounded-[5px]"
                                    />
                                    {errors.password && touched.password ? (
                                        <div className="text-red-500">{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="w-[600px] my-[8px]">
                                    <label className="font-medium">Số điện thoại</label>
                                    <Field
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Vd: 0797373365"
                                        className="w-[600px] bg-slate-50 p-2 border border-gray-300 my-[10px] rounded-[5px]"
                                    />
                                    {errors.phoneNumber && touched.phoneNumber ? (
                                        <div className="text-red-500">{errors.phoneNumber}</div>
                                    ) : null}
                                </div>

                                <div className="w-[600px] my-[8px]">
                                    <label className="font-medium">Địa chỉ</label>
                                    <Field
                                        name="address"
                                        type="text"
                                        placeholder="Tân Chánh Hiệp, quận 12, tp HCM"
                                        className="w-[600px] bg-slate-50 p-2 border border-gray-300 my-[10px] rounded-[5px]"
                                    />
                                    {errors.address && touched.address ? (
                                        <div className="text-red-500">{errors.address}</div>
                                    ) : null}
                                </div>

                                <div className="w-full flex flex-col my-[8px]">
                                    <label className="font-medium">Mã zip</label>
                                    <Field
                                        name="zipNumber"
                                        type="number"
                                        placeholder="70000"
                                        className="w-[200px] bg-slate-50 p-2 border border-gray-300 my-[10px] rounded-[5px]"
                                    />
                                    {errors.zipNumber && touched.zipNumber ? (
                                        <div className="text-red-500">{errors.zipNumber}</div>
                                    ) : null}
                                </div>

                                <div className="w-[600px] my-[8px]">
                                    <label className="font-medium">Tải ảnh lên</label>
                                    <Field
                                        name="image"
                                        type="file"
                                        className="w-[600px] my-[10px] rounded-[5px]"
                                    />
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
}
export default UserProfile;
