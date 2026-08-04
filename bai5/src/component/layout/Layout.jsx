import Header from '../header/Header'
import Sider from '../sider/Sider'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

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
  )
}

export default Layout
