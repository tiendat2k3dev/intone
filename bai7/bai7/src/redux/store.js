// Hàm tạo Redux Store
import { createStore, applyMiddleware } from "redux";

// Reducer tổng (gồm userReducer và cartReducer)
import { rootReducer } from "./reducer.js";

// Middleware Redux Thunk
// Cho phép dispatch các hàm (function) thay vì chỉ object
import { thunk } from "redux-thunk";

// Tạo Redux Store
export const store = createStore(
  // Reducer quản lý toàn bộ state của ứng dụng
  rootReducer,

  // Thêm Middleware Thunk
  // Để có thể xử lý bất đồng bộ (Async)
  applyMiddleware(thunk),
);
