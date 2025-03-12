"use client";
import * as Yup from "yup";
import Link from "next/link";
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import {Eye, EyeClosed} from "lucide-react";

import ButtonLogin from "../../components/socialLogin/btnLogin";
import type User from "../../models/User";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .trim()
            .email("* Email không hợp lệ")
            .required("* Vui lòng nhập email"),
        password: Yup.string()
            .trim()
            .min(8, "* Mật khẩu tối thiểu 8 kí tự")
            .matches(
                /^[A-Z](?=.*\d)(?=.*[@$!%*?&]).{7,}$/,
                "* Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một chữ số và một ký tự đặc biệt"
            )
            .required("* Vui lòng nhập mật khẩu"),
    });

    const handleSubmit = async (values: User) => {
        const {email, password} = values;
        const data = {email, password};
        await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        })
            .then(() => {
                console.log("Data changed: ", data);
                alert("Sửa thông tin thành công");
            })
            .catch((error) => alert("Error:" + error));
    };
    return (
        <div className={`bg-[#fbfcfd] tracking-wider py-[120px]`}>
            <div className={`w-[30%] mx-auto flex flex-col items-center gap-4`}>
                <p className={`text-3xl text-[#034292] font-bold uppercase`}>
                    halo store
                </p>
                <div
                    className={`full-shadow w-full bg-[#fff] px-8 py-6 rounded-lg flex flex-col gap-2`}
                >
                    <p className={`text-2xl text-center font-medium`}>Đăng nhập</p>
                    <Formik
                        initialValues={{
                            _id: "",
                            name: "",
                            phone: "",
                            password: "",
                            email: "",
                            address: "",
                            zipcode: 0,
                            role: 0
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <div className={`w-full`}>
                                <Form className="flex flex-col items-center gap-2">
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

                                    <div className="w-full">
                                        <div
                                            className={`flex text-sm justify-between items-center`}
                                        >
                                            <label htmlFor="password" className={`block my-1`}>
                                                Mật khẩu
                                            </label>
                                            <Link
                                                href={`/`}
                                                className={` text-center text-[#034292]`}
                                            >
                                                Quên mật khẩu ?
                                            </Link>
                                        </div>
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

                                    {/*button submit*/}
                                    <button
                                        className={`w-full h-10 bg-[#034292] hover:bg-[#5469d4] text-[#fff] mt-2 rounded`}
                                    >
                                        Đăng nhập
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
                    Bạn chưa có tài khoản ?{" "}
                    <Link
                        href={`/pages/register`}
                        className={`text-[#034292] hover:underline`}
                    >
                        Đăng ký
                    </Link>
                </div>
            </div>
        </div>
    );
}
