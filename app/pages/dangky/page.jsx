export default function RegisterForm() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-md w-96">
          <div className="flex flex-col items-center">
            <img src="/logo.png" alt="Logo" className="w-16 mb-2" />
            <h2 className="text-lg font-semibold text-blue-600">HALO SHOP LUXURIES</h2>
          </div>
          
          <h2 className="text-xl font-bold text-center mt-4">Đăng ký</h2>
          
          <form className="mt-4">
            <div className="flex space-x-2">
              <input type="text" placeholder="Họ" className="w-1/2 px-3 py-2 border rounded-md" />
              <input type="text" placeholder="Tên" className="w-1/2 px-3 py-2 border rounded-md" />
            </div>
            <div className="mt-3">
              <label className="block text-sm">Ngày sinh</label>
              <div className="flex space-x-2">
                <select className="w-1/3 px-3 py-2 border rounded-md">
                  <option>20</option>
                </select>
                <select className="w-1/3 px-3 py-2 border rounded-md">
                  <option>Tháng 1</option>
                </select>
                <select className="w-1/3 px-3 py-2 border rounded-md">
                  <option>2025</option>
                </select>
              </div>
            </div>
            
            <div className="mt-3">
              <label className="block text-sm">Giới tính</label>
              <div className="flex space-x-2">
                <label className="flex items-center space-x-1 border rounded-md px-3 py-2 w-1/3">
                  <input type="radio" name="gender" /> <span>Nam</span>
                </label>
                <label className="flex items-center space-x-1 border rounded-md px-3 py-2 w-1/3">
                  <input type="radio" name="gender" /> <span>Nữ</span>
                </label>
                <label className="flex items-center space-x-1 border rounded-md px-3 py-2 w-1/3">
                  <input type="radio" name="gender" /> <span>Tùy chỉnh</span>
                </label>
              </div>
            </div>
            
            <input type="text" placeholder="Số điện thoại hoặc email" className="mt-3 w-full px-3 py-2 border rounded-md" />
            
            <div className="relative mt-3">
              <input type="password" placeholder="Mật khẩu" className="w-full px-3 py-2 border rounded-md" />
            </div>
            
            <div className="relative mt-3">
              <input type="password" placeholder="Nhập lại mật khẩu" className="w-full px-3 py-2 border rounded-md" />
            </div>
            
            <button className="mt-4 w-full bg-blue-400 text-white py-2 rounded-md font-semibold">Đăng ký</button>
          </form>
          
          <p className="text-center mt-4 text-sm">Bạn đã có tài khoản? <a href="#" className="text-blue-600 font-semibold">Đăng nhập</a></p>
        </div>
      </div>
    );
  }
  