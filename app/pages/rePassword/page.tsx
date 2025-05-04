"use client"
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import type User from "@/app/models/User";


export default function RePassword() {
    const [stopCD, setStopCD] = useState(true);
    const [count, setCount] = useState(60);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (!stopCD && count > 0) {
            timerId = setInterval(() => {
                setCount(prev => {
                    if (prev <= 1) {
                        setStopCD(true);
                        return 60; // Reset lại nếu muốn cho gửi lại sau khi đếm xong
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [stopCD, count]);

    const handleClick = () => {
        setStopCD(false);
        setCount(60);
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .trim()
            .email("* Email không hợp lệ")
            .required("* Vui lòng nhập email"),
    });

    const handleSubmit = async (values: Partial<User>) => {

        try {
            const {email} = values;
            const data = {email};
            const response = await fetch("http://localhost:3000/users/findAccount", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (response.status === 200) {
                // tạo chuỗi
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.log("Lỗi đăng nhập:" + error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className={`w-full min-h-[1000px] white`}>
            <Formik
                initialValues={{
                    email: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched}) => (
                    <Form className="flex gap-3">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Nhập email đã đăng ký
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

                        {/* Submit button */}
                        {stopCD ? (
                            <button
                                onClick={handleClick}
                                className={`w-10 h-10 bg-gray-100 text-gray-700 flex items-center justify-center`}
                            >
                                Gửi
                            </button>
                        ) : (
                            <button disabled>
                                {count}
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}
