"use client";
import * as Yup from "yup";
import Link from "next/link";
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import {Eye, EyeClosed} from "lucide-react";

import ButtonLogin from "../../components/socialLogin/btnLogin";
import type User from "../../models/User";

interface RegisterFormValues extends User {
    rePassword: string;
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required("* Vui lòng nhập tên"),
        email: Yup.string()
            .trim()
            .email("* Email không hợp lệ")
            .required("* Vui lòng nhập email"),
        phone: Yup.string()
            .min(10, "* Số điện thoại phải từ 10 số trở lên")
            .trim()
            .required("* Vui lòng nhập số điện thoại"),
        password: Yup.string()
            .trim()
            .min(8, "* Mật khẩu tối thiểu 8 kí tự")
            .matches(
                /^[A-Z](?=.*\d)(?=.*[@$!%*?&]).{7,}$/,
                "* Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một chữ số và một ký tự đặc biệt"
            )
            .required("* Vui lòng nhập mật khẩu"),
        rePassword: Yup.string()
            .oneOf([Yup.ref("password")], "* Mật khẩu không khớp")
            .required("* Vui lòng nhập lại mật khẩu"),
    });
    const handleSubmit = async (values: Omit<User, "rePassword">) => {
        const {_id, name, phone, password, email, address, zipcode, role} = values;
        const data = {_id, name, phone, password, email, address, zipcode, role};
        await fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(">>> Response: ", data);
                if (data.status === 200) {
                    // localStorage.setItem("access_token", data.accessToken);
                    // localStorage.setItem("refresh_token", data.refreshToken);

                    window.location.href = "/";
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => console.log("Lỗi đăng ký:" + error));
    };
    return (
        <div className={`bg-[#fbfcfd] tracking-wider py-4`}>
            <div className={`w-[30%] mx-auto flex flex-col items-center gap-4`}>
                {/*<p className={`text-3xl text-[#034292] font-bold uppercase`}>*/}
                {/*    halo store*/}
                {/*</p>*/}
                <div
                    className={`full-shadow w-full bg-[#fff] px-8 py-6 rounded-lg flex flex-col gap-2`}
                >
                    <p className={`text-3xl text-[#034292] text-center font-bold tracking-wider`}>HALO</p>
                    <Formik<RegisterFormValues>
                        initialValues={{
                            _id: "",
                            name: "",
                            phone: "",
                            password: "",
                            email: "",
                            address: "",
                            zipcode: 0,
                            role: 0,
                            rePassword: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <div className={`w-full`}>
                                <Form className="flex flex-col items-center gap-2">
                                    {/* name */}
                                    <div className="w-full">
                                        <label htmlFor="name" className={`block my-1`}>
                                            Họ tên
                                        </label>
                                        <Field
                                            name="name"
                                            id="name"
                                            type="text"
                                            placeholder=""
                                            className="w-full text-sm px-3 py-2 border border-gray-300 focus:outline-none rounded"
                                        />
                                        {errors.name && touched.name ? (
                                            <div className={`text-xs text-red-500 my-2`}>
                                                {errors.name}
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* email */}
                                    <div className="w-full">
                                        <label htmlFor="email" className={`block my-1`}>
                                            Email
                                        </label>
                                        <Field
                                            name="email"
                                            id="email"
                                            type="text"
                                            placeholder=""
                                            className="w-full text-sm px-3 py-2 border border-gray-300 focus:outline-none rounded"
                                        />
                                        {errors.email && touched.email ? (
                                            <div className={`text-xs text-red-500 my-2`}>
                                                {errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                    {/* phone */}
                                    <div className="w-full">
                                        <label htmlFor="phone" className={`block my-1`}>
                                            Số điện thoại
                                        </label>
                                        <Field
                                            name="phone"
                                            id="phone"
                                            type="text"
                                            placeholder=""
                                            className="w-full text-sm px-3 py-2 border border-gray-300 focus:outline-none rounded"
                                        />
                                        {errors.phone && touched.phone ? (
                                            <div className={`text-xs text-red-500 my-2`}>
                                                {errors.phone}
                                            </div>
                                        ) : null}
                                    </div>
                                    {/* password */}
                                    <div className="w-full">
                                        <label htmlFor="password" className={`block my-1`}>
                                            Mật khẩu
                                        </label>
                                        <div className={`relative`}>
                                            <Field
                                                name="password"
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder=""
                                                className="w-full text-sm px-3 py-2 border border-gray-300 focus:outline-none rounded"
                                            />
                                            {errors.password && touched.password ? (
                                                <div className={`text-xs text-red-500 my-2`}>
                                                    {errors.password}
                                                </div>
                                            ) : null}
                                            <div
                                                onClick={() => setShowPassword(!showPassword)}
                                                className={`absolute z-0 top-2 right-2 cursor-pointer`}
                                            >
                                                {showPassword ? (
                                                    <Eye strokeWidth={1.5} className={`w-5 h-5`}/>
                                                ) : (
                                                    <EyeClosed strokeWidth={1.5} className={`w-5 h-5`}/>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* rePassword */}
                                    <div className="w-full">
                                        <label htmlFor="rePassword" className={`block my-1`}>
                                            Nhập lại mật khẩu
                                        </label>
                                        <div className={`relative`}>
                                            <Field
                                                name="rePassword"
                                                id="rePassword"
                                                type={showRePassword ? "text" : "password"}
                                                placeholder=""
                                                className="w-full text-sm px-3 py-2 border border-gray-300 focus:outline-none rounded"
                                            />
                                            {errors.rePassword && touched.rePassword ? (
                                                <div className={`text-xs text-red-500 my-2`}>
                                                    {errors.rePassword}
                                                </div>
                                            ) : null}
                                            <div
                                                onClick={() => setShowRePassword(!showRePassword)}
                                                className={`absolute z-0 top-2 right-2 cursor-pointer`}
                                            >
                                                {showRePassword ? (
                                                    <Eye strokeWidth={1.5} className={`w-5 h-5`}/>
                                                ) : (
                                                    <EyeClosed strokeWidth={1.5} className={`w-5 h-5`}/>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/*confirm terms*/}
                                    <div className={`w-full mt-2`}>
                                        <div className={`flex justify-between items-start`}>
                                            <input
                                                type="checkbox"
                                                id={`confirmTerms`}
                                                className={` w-3 h-3 mt-1 cursor-pointer`}
                                            />
                                            <label
                                                htmlFor={`confirmTerms`}
                                                className={`text-xs ml-2 cursor-pointer`}
                                            >
                                                Tôi đồng ý với{" "}
                                                <Link
                                                    href={`/pages/privacy`}
                                                    className={`font-semibold hover:text-[#034292] underline`}
                                                >
                                                    Chính sách bảo mật và Điều khoản sử dụng
                                                </Link>{" "}
                                                của HALO.
                                            </label>
                                        </div>
                                    </div>
                                    {/*button submit*/}
                                    <button
                                        type={`submit`}
                                        className={`w-full h-10 bg-[#034292] hover:bg-[#5469d4] text-[#fff] mt-2 rounded`}
                                    >
                                        Đăng ký
                                    </button>
                                </Form>
                            </div>
                        )}
                    </Formik>

                    {/*gap*/}
                    <div
                        className={`w-full opacity-50 flex justify-between items-center`}
                    >
                        <div
                            className={`w-[40%] h-[2px]`}
                            style={{backgroundColor: "rgb(219 219 219)"}}
                        ></div>
                        <div className={`uppercase text-sm`}>hoặc</div>
                        <div
                            className={`w-[40%] h-[2px]`}
                            style={{backgroundColor: "rgb(219 219 219)"}}
                        ></div>
                    </div>

                    {/*facebook && google account*/}
                    <ButtonLogin/>
                </div>
                <div className={`flex gap-1`}>
                    Bạn đã có tài khoản ?{" "}
                    <Link
                        href={`/pages/login`}
                        className={`text-[#034292] hover:underline`}
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}
