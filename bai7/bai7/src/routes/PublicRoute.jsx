// Import Navigate và Outlet từ react-router-dom
import { Navigate, Outlet } from "react-router-dom";

// Component bảo vệ các trang Public (Login, Register,...)
const PublicRoute = () => {
  // Lấy accessToken từ Local Storage
  const token = localStorage.getItem("accessToken");

  // Nếu đã có token => đã đăng nhập
  if (token) {
    // Chuyển hướng sang trang Home
    // replace giúp không quay lại trang Login khi bấm Back
    return <Navigate to="/home" replace />;
  }

  // Nếu chưa đăng nhập
  // Hiển thị các Route con (Login, Register,...)
  return <Outlet />;
};

export default PublicRoute;
