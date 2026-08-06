// Hàm gọi API kiểm tra tài khoản đăng nhập
import { checkLogin } from "../services/authServices";

/**
 * Action Creator
 * Tạo action LOGIN để lưu thông tin người dùng vào Redux Store
 */
export const loginSuccess = (account) => {
  return {
    // Tên action
    type: "LOGIN",

    // Dữ liệu sẽ được reducer lưu vào store
    payload: account,
  };
};

/**
 * Action bất đồng bộ (Redux Thunk)
 * account gồm:
 * {
 *    username: "...",
 *    password: "..."
 * }
 */
export const login = (account) => {
  // Redux Thunk trả về một function thay vì object
  return async (dispatch) => {
    // Gọi API kiểm tra username và password
    const accountInfo = await checkLogin(account.username, account.password);

    // Nếu tài khoản tồn tại
    if (accountInfo) {
      // Dispatch action LOGIN để lưu thông tin người dùng
      dispatch(
        loginSuccess({
          username: accountInfo.username,
          role: accountInfo.role,
        }),
      );

      // Báo đăng nhập thành công
      return true;
    }

    // Đăng nhập thất bại
    return false;
  };
};

/**
 * Action đăng xuất
 */
export const logout = () => {
  return {
    // Reducer sẽ xử lý LOGOUT
    type: "LOGOUT",
  };
};
