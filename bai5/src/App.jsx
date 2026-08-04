// Import các thành phần dùng để khai báo Route
import { Routes, Route } from 'react-router-dom'
// Import Layout (chứa Header, Footer, Outlet...)
import Layout from './component/Layout/Layout'
// Import các trang
import Home from './page/Home'
import Product from './page/Product'
// Import các component CRUD
import Add from './component/product/add/Add'
import Edit from './component/product/Edit/Edit'
// Import trang 404
import NotFound from './page/NotFound'
// Import Toast để hiển thị thông báo
import { ToastContainer } from 'react-toastify'
// Import CSS của Toastify
import 'react-toastify/dist/ReactToastify.css'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
const App = () => {
  return (
    <>
      {/* Khai báo toàn bộ Route của ứng dụng */}
      <Routes>
        {/* Layout dùng chung cho các trang */}
        <Route path="/" element={<Layout />}>
          {/* Route mặc định khi truy cập "/" */}
          <Route index element={<Home />} />

          {/* URL: /home */}
          <Route path="home" element={<Home />} />

          {/* URL: /product */}
          <Route path="product" element={<Product />} />

          {/* URL: /product/add */}
          <Route path="product/add" element={<Add />} />

          {/* URL: /product/edit/1
              URL: /product/edit/2
              :id là tham số động */}
          <Route path="product/edit/:id" element={<Edit />} />
        </Route>

        {/* Nếu URL không tồn tại sẽ hiển thị trang 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Hiển thị các thông báo toast */}
      <ToastContainer />
    </>
  )
}

export default App
