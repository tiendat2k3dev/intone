// Hàm dùng để gộp nhiều reducer thành một reducer tổng
import { combineReducers } from "redux";

// ======================= USER REDUCER =======================

// State ban đầu của user
// null nghĩa là chưa đăng nhập
const initAccount = null;

// Reducer quản lý thông tin người dùng
const userReducer = (state = initAccount, action) => {
  switch (action.type) {
    // Khi nhận action LOGIN
    // Lưu thông tin người dùng vào Redux Store
    case "LOGIN":
      return action.payload;

    // Khi nhận action LOGOUT
    // Xóa thông tin người dùng
    case "LOGOUT":
      return null;

    // Nếu action không thuộc reducer này
    default:
      return state;
  }
};

// ======================= CART REDUCER =======================

// State ban đầu của giỏ hàng
const cartReducer = (state = [], action) => {
  switch (action.type) {
    // Thêm sản phẩm vào giỏ hàng
    case "ADD":
      return [...state, action.payload];

    // Xóa toàn bộ giỏ hàng
    case "REMOVE":
      return [];

    // Không có action phù hợp
    default:
      return state;
  }
};

// ======================= ROOT REDUCER =======================

// Gộp tất cả reducer lại thành một reducer tổng
export const rootReducer = combineReducers({
  // state.user
  user: userReducer,

  // state.cart
  cart: cartReducer,
});
