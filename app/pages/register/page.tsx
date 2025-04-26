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


// interface RegisterFormValues extends User {
//     rePassword: string;
// }

export default function Register() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    // const [showRePassword, setShowRePassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required("* Vui lòng nhập tên"),
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
        // rePassword: Yup.string()
        //     .oneOf([Yup.ref("password")], "* Mật khẩu không khớp")
        //     .required("* Vui lòng nhập lại mật khẩu"),
    });
    // o
    // const handleSubmit = async (values: Omit<User, "rePassword">) => {
    const handleSubmit = async (values: Partial<User>) => {
        setIsSubmitting(true);
        try {
            const {name, password, email} = values;
            const data = {name, password, email};
            const response = await fetch("https://datn-api-production.up.railway.app/user/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (response.ok) {
                setCookie(`as_tn`, responseData.access_token, 3);
                setCookie(`rh_tn`, responseData.refresh_token, 7);
                router.push("/");
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.log("Lỗi đăng ký:" + error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="min-h-screen bg-[#fbfcfd] tracking-wider py-12 px-4 md:px-0 flex flex-col items-center gap-4">
            <div className="full-shadow w-full md:w-[600px] lg:w-[500px] mx-auto flex flex-col items-center gap-4">
                <div className="w-full bg-white px-4 sm:px-6 md:px-8 py-6 rounded-lg shadow-md">
                    <p className="text-2xl sm:text-3xl text-[#034292] text-center font-bold tracking-wider mb-6">
                        HALO
                    </p>

                    <Formik
                        initialValues={{
                            name: "",
                            password: "",
                            email: "",
                            // rePassword: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <Form className="flex flex-col gap-3">
                                {/* name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                                        Tên tài khoản
                                    </label>
                                    <Field
                                        name="name"
                                        id="name"
                                        type="text"
                                        className="w-full text-sm px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#034292] transition-all duration-200"
                                    />
                                    {errors.name && touched.name && (
                                        <div className="text-xs text-red-500 mt-1">{errors.name}</div>
                                    )}
                                </div>
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
                                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                                        Mật khẩu
                                    </label>
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
                                {/* rePassword */}
                                {/*<div>*/}
                                {/*    <label htmlFor="rePassword" className="block text-sm font-medium mb-1">*/}
                                {/*        Nhập lại mật khẩu*/}
                                {/*    </label>*/}
                                {/*    <div className="relative">*/}
                                {/*        <Field*/}
                                {/*            name="rePassword"*/}
                                {/*            id="rePassword"*/}
                                {/*            type={showRePassword ? "text" : "password"}*/}
                                {/*            className="w-full text-sm px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#034292] transition-all duration-200"*/}
                                {/*        />*/}
                                {/*        <button*/}
                                {/*            type="button"*/}
                                {/*            onClick={() => setShowRePassword(!showRePassword)}*/}
                                {/*            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"*/}
                                {/*        >*/}
                                {/*            {showRePassword ? (*/}
                                {/*                <Eye size={20} strokeWidth={1.5}/>*/}
                                {/*            ) : (*/}
                                {/*                <EyeClosed size={20} strokeWidth={1.5}/>*/}
                                {/*            )}*/}
                                {/*        </button>*/}
                                {/*    </div>*/}
                                {/*    {errors.rePassword && touched.rePassword && (*/}
                                {/*        <div className="text-xs text-red-500 mt-1">{errors.rePassword}</div>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                                {/* Terms */}
                                <div className="flex items-start gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="confirmTerms"
                                        className="mt-1 w-4 h-4 rounded border-gray-300 text-[#034292] focus:ring-[#034292] transition duration-200 cursor-pointer"
                                    />
                                    <label
                                        htmlFor="confirmTerms"
                                        className="text-xs cursor-pointer"
                                    >
                                        Tôi đồng ý với{" "}
                                        <Link
                                            href="/pages/privacy"
                                            className="font-semibold text-[#034292] hover:underline"
                                        >
                                            Chính sách bảo mật và Điều khoản sử dụng
                                        </Link>{" "}
                                        của HALO.
                                    </label>
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
                                        "Đăng ký"
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
            {/* Login link */}
            <div className="flex gap-1 mb-8">
                <span>Bạn đã có tài khoản?</span>
                <Link
                    href="/pages/login"
                    className="text-[#034292] hover:underline"
                >
                    Đăng nhập
                </Link>
            </div>
        </section>
    );
}