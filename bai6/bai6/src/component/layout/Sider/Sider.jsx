import { NavLink } from 'react-router-dom'

const Sider = () => {
    return (
        <aside className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
            <h3 className="text-center mb-4">Dashboard</h3>

            <div className="list-group">
                <NavLink to="/home" className="list-group-item list-group-item-action">
                    🏠 Home
                </NavLink>

                <NavLink
                    to="/product"
                    className="list-group-item list-group-item-action"
                >
                    📦 Product
                </NavLink>
            </div>
        </aside>
    )
}

export default Sider
