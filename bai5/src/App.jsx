import { Routes, Route } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './page/Home'
import Product from './page/Product'
import Add from './component/product/add/Add'
import Edit from './component/product/Edit/Edit'
import NotFound from './NotFound'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="product/add" element={<Add />} />
          <Route path="product/edit/:id" element={<Edit />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
