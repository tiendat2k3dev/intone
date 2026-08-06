// Import Navigate và Outlet từ react-router-dom
import { Navigate, Outlet } from "react-router-dom";

// Component dùng để bảo vệ các Route
const ProtectedRoute = () => {
  // Lấy accessToken từ Local Storage
  // Nếu đã đăng nhập thì token sẽ tồn tại
  const token = localStorage.getItem("accessToken");

  // Kiểm tra xem có token hay không
  if (!token) {
    // Không có token
    // Chuyển hướng về trang đăng nhập (/login)
    // replace giúp thay thế lịch sử trình duyệt,
    // người dùng không thể bấm Back để quay lại trang bị chặn
    return <Navigate to="/login" replace />;
  }

  // Có token
  // Hiển thị các Route con bên trong ProtectedRoute
  return <Outlet />;
};

export default ProtectedRoute;
