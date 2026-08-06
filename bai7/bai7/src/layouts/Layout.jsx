import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />

      <div className="d-flex">
        <Sider />

        <main className="flex-grow-1 p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
