// Hook dùng để tham chiếu trực tiếp đến thẻ input
import { useRef } from "react";

// Hook dùng để chuyển trang
import { useNavigate } from "react-router-dom";

// Hiển thị thông báo thành công/thất bại
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { checkLogin } from "../../service/accountService.js";

// Hook dùng để gửi action lên Redux Store
import { useDispatch } from "react-redux";

// Action đăng nhập
import { login } from "../redux/action";

function Login() {
  // Thông tin người dùng (hiện chưa sử dụng)
  const userInfo = null;

  // Hook chuyển trang
  const navigate = useNavigate();

  // Tham chiếu tới ô Username
  const usernameRef = useRef("");

  // Tham chiếu tới ô Password
  const passwordRef = useRef("");

  // Hàm dispatch của Redux
  const dispatch = useDispatch();

  // Hàm xử lý khi nhấn nút Login
  const handleLogin = async () => {
    // Lấy dữ liệu từ ô Username
    const username = usernameRef.current.value;

    // Lấy dữ liệu từ ô Password
    const password = passwordRef.current.value;

    // Cách cũ gọi trực tiếp service
    // const accountInfo = await checkLogin(username,password);
    // if (accountInfo){
    //     dispatch(loginSuccess({
    //         username: accountInfo.username,
    //         role: accountInfo.role
    //     }));
    //
    //     toast.success("Đăng nhập thành công");
    //     navigate("/");
    // } else {
    //     toast.error("Đăng nhập thất bại");
    // }

    // Dispatch action login lên Redux
    // Action sẽ gọi API checkLogin()
    let isSuccess = await dispatch(login({ username, password }));

    // Nếu đăng nhập thành công
    if (isSuccess) {
      // Lưu trạng thái đăng nhập
      localStorage.setItem("accessToken", "true");

      // Lưu username
      localStorage.setItem("username", username);

      // Hiện thông báo
      toast.success("Đăng nhập thành công");

      // Chuyển sang trang Home
      navigate("/home");
    } else {
      // Thông báo đăng nhập thất bại
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            {/* Form đăng nhập */}
            <form className="card shadow p-4">
              {/* Tiêu đề */}
              <h3 className="text-center mb-4">
                Login {userInfo != null ? userInfo?.username : ""}
              </h3>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>

                <input
                  // Gán Ref cho ô Username
                  ref={usernameRef}
                  name="username"
                  className="form-control"
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  // Gán Ref cho ô Password
                  ref={passwordRef}
                  name="password"
                  type="password"
                  className="form-control"
                />
              </div>

              {/* Nút đăng nhập */}
              <button
                type="button"
                className="btn btn-primary w-100"
                // Khi click sẽ gọi handleLogin()
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
