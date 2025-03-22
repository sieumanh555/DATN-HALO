"use client";

import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 md:px-16 w-full">
            <div className="w-full bg-white rounded-lg p-6 sm:p-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#034292] mb-8">
                    Chính Sách Bảo Mật
                </h1>

                <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                        Chào mừng bạn đến với Halo. Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn khi sử dụng trang web và dịch vụ của chúng tôi.
                    </p>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#034292]">1. Thông Tin Chúng Tôi Thu Thập</h2>
                        <p className="text-gray-700">Chúng tôi thu thập thông tin cá nhân của bạn khi bạn sử dụng trang web, đăng ký tài khoản, mua hàng hoặc liên hệ với chúng tôi. Các thông tin có thể bao gồm:</p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>Họ và tên</li>
                            <li>Địa chỉ email</li>
                            <li>Số điện thoại</li>
                            <li>Địa chỉ giao hàng</li>
                            <li>Thông tin thanh toán (không lưu trữ số thẻ tín dụng)</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#034292]">2. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
                        <p className="text-gray-700">Chúng tôi sử dụng thông tin của bạn để:</p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>Xử lý đơn hàng và giao hàng</li>
                            <li>Cung cấp hỗ trợ khách hàng</li>
                            {/*<li>Gửi thông báo về sản phẩm và khuyến mãi</li>*/}
                            <li>Cải thiện dịch vụ và trải nghiệm mua sắm</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#034292]">3. Chia Sẻ Thông Tin</h2>
                        <p className="text-gray-700">Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, ngoại trừ:</p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>Dịch vụ giao hàng (để vận chuyển đơn hàng)</li>
                            <li>Đối tác thanh toán (để xử lý thanh toán an toàn)</li>
                            <li>Yêu cầu pháp lý từ cơ quan có thẩm quyền</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#034292]">4. Bảo Mật Dữ Liệu</h2>
                        <p className="text-gray-700">Chúng tôi áp dụng các biện pháp bảo mật cao cấp để bảo vệ thông tin cá nhân của bạn, bao gồm mã hóa dữ liệu và kiểm soát truy cập nghiêm ngặt.</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#034292]">5. Quyền Của Bạn</h2>
                        <p className="text-gray-700">
                            Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân của mình. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email{' '}
                            <Link
                                href="mailto:support@halo.com"
                                className="text-[#034292] underline"
                            >
                                support@halo.com
                            </Link>
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#034292]">6. Cập Nhật Chính Sách</h2>
                        <p className="text-gray-700">Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Vui lòng kiểm tra định kỳ để biết thêm thông tin.</p>
                    </div>

                    <p className="text-lg text-center text-gray-700 pt-6 border-t border-gray-200">
                        Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của{' '}
                        <span className="font-bold text-[#034292]">HALO</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}