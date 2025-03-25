"use client";
import * as Yup from "yup";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Field, Form, Formik} from "formik";
import {Eye, EyeClosed} from "lucide-react";
import {setCookie} from "../../libs/Cookie/clientSideCookie";

import type User from "../../models/User";
import ButtonLogin from "../../components/socialLogin/btnLogin";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSubmit = async (values: Partial<User>) => {
        setIsSubmitting(true);
        try {
            const {email, password} = values;
            const data = {email, password};
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (response.status === 200) {
                setCookie(`as_tn`, responseData.access_token, 3);
                setCookie(`rh_tn`, responseData.refresh_token, 7);
                router.push("/");
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.log("Lỗi đăng nhập:" + error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="min-h-screen bg-[#fbfcfd] tracking-wider py-24 px-4 md:px-0 flex flex-col items-center gap-4">
            <div className="full-shadow w-full md:w-[600px] lg:w-[500px] mx-auto flex flex-col items-center gap-4">
                <div className="w-full bg-white px-4 sm:px-6 md:px-8 py-6 rounded-lg shadow-md">
                    <p className="text-2xl sm:text-3xl text-[#034292] text-center font-bold tracking-wider mb-6">
                        HALO
                    </p>

                    <Formik
                        initialValues={{
                            password: "",
                            email: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <Form className="flex flex-col gap-3">
                                {/* email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        id="email"
                                        type="text"
                                        className="w-full text-sm px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#034292] transition-all duration-200"
                                    />
                                    {errors.email && touched.email && (
                                        <div className="text-xs text-red-500 mt-1">{errors.email}</div>
                                    )}
                                </div>

                                {/* password */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label htmlFor="password" className="block text-sm font-medium">
                                            Mật khẩu
                                        </label>
                                        <Link
                                            href="/"
                                            className="text-sm text-[#034292] hover:underline"
                                        >
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Field
                                            name="password"
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className="w-full text-sm px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#034292] transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showPassword ? (
                                                <Eye size={20} strokeWidth={1.5}/>
                                            ) : (
                                                <EyeClosed size={20} strokeWidth={1.5}/>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && touched.password && (
                                        <div className="text-xs text-red-500 mt-1">{errors.password}</div>
                                    )}
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-11 bg-[#034292] hover:bg-[#023170] text-white rounded mt-2 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        "Đăng nhập"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-[1px] bg-gray-200"></div>
                        <span className="text-xs text-gray-500 uppercase">hoặc</span>
                        <div className="flex-1 h-[1px] bg-gray-200"></div>
                    </div>

                    {/* Social login */}
                    <ButtonLogin/>
                </div>
            </div>

            {/* Register link */}
            <div className="flex gap-1 mb-8">
                <span>Bạn chưa có tài khoản?</span>
                <Link
                    href="/pages/register"
                    className="text-[#034292] hover:underline"
                >
                    Đăng ký
                </Link>
            </div>
        </section>
    );
}