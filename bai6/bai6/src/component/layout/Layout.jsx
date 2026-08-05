import Header from "./Header/Header";
import Sider from "./Sider/Sider";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sider />
                    </div>

                    <div className="col-9">
                        <Outlet />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Layout;
