// Hook dùng để chuyển trang
import { useNavigate } from "react-router-dom";

// Hook của Redux
// useSelector: lấy dữ liệu từ Redux Store
// useDispatch: gửi action lên Redux Store
import { useSelector, useDispatch } from "react-redux";

// Action đăng xuất
import { logout } from "../redux/action";

const HeaderComponent = () => {
  // Dùng để điều hướng sang trang khác
  const navigate = useNavigate();

  // Dùng để dispatch action
  const dispatch = useDispatch();

  // Lấy thông tin user từ Redux Store
  // state.user được tạo trong reducer
  const account = useSelector((state) => state.user);

  // Hàm xử lý khi nhấn nút Đăng xuất
  const handleLogout = () => {
    // Gửi action LOGOUT lên Redux
    // Reducer sẽ xóa thông tin người dùng trong Store
    dispatch(logout());

    // Xóa token đã lưu trong localStorage
    localStorage.removeItem("accessToken");

    // Xóa username đã lưu trong localStorage
    localStorage.removeItem("username");

    // Chuyển về trang đăng nhập
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-primary text-white shadow">
      {/* Thanh Header */}
      <div className="container-fluid px-4 py-2 d-flex justify-content-between align-items-center">
        {/* ===== Logo bên trái ===== */}
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968267.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />

          <h4 className="m-0 fw-bold">Product Management</h4>
        </div>

        {/* ===== Thông tin người dùng bên phải ===== */}
        <div className="d-flex align-items-center">
          {/* Hiển thị tên người dùng */}
          <span className="me-3">
            👋 Xin chào, <strong>{account?.username}</strong>
          </span>

          {/* Nút đăng xuất */}
          <button className="btn btn-light btn-sm" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
