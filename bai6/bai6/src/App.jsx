import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/layout/layout";
import Home from "./page/Home";
import Product from "./page/Product";
import NotFound from "./page/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;