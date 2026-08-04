import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAll, search } from '../services/productServices'
import ProductHeader from '../component/product/Header/ProductHeader'
import ProductSearch from '../component/product/Search/ProductSearch'
import Delete from '../component/modal/delete/Delete'

const Product = () => {
  // khai báo các state cần thiết
  const table = ['ID', 'Name', 'Price', 'Action']
  // state products để lưu danh sách sản phẩm
  const [products, setProducts] = useState([])
  // state deleteProduct để lưu sản phẩm cần xóa
  const [deleteProduct, setDeleteProduct] = useState({
    id: '',
    name: '',
  })
  // state showModal để hiển thị modal xóa
  const [showModal, setShowModal] = useState(false)
  // state isReloading để reload lại danh sách sản phẩm sau khi xóa
  const [isReloading, setIsReloading] = useState(false)
  // useNavigate để điều hướng trang
  const navigate = useNavigate()
  // useEffect để load danh sách sản phẩm khi component được render
  useEffect(() => {
    // gọi hàm getAll để lấy danh sách sản phẩm
    setProducts(getAll())
  }, [isReloading])
  // hàm handleSearch để tìm kiếm sản phẩm theo từ khóa
  const handleSearch = (keyword) => {
    // nếu từ khóa rỗng thì load lại danh sách sản phẩm
    if (keyword.trim() === '') {
      // gọi hàm getAll để lấy danh sách sản phẩm
      setProducts(getAll())
    } else {
      // gọi hàm search để tìm kiếm sản phẩm theo từ khóa
      setProducts(search(keyword))
    }
  }
  // hàm handleAddClick để điều hướng đến trang thêm sản phẩm
  const handleAddClick = () => {
    navigate('/product/add')
  }
  // hàm closeModal để đóng modal xóa
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="container mt-4">
      <ProductHeader
        name="Product Management"
        add="Add Product"
        onAddClick={handleAddClick}
      />

      <ProductSearch onSearch={handleSearch} />

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            {table.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    // onClick để điều hướng đến trang chỉnh sửa sản phẩm
                    onClick={() => navigate(`/product/edit/${product.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setDeleteProduct(product)
                      // setShowModal để hiển thị modal xóa
                      setShowModal(true)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            // nếu không có sản phẩm nào thì hiển thị thông báo
            <tr>
              <td colSpan={4} className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Delete
        show={showModal}
        close={closeModal}
        product={deleteProduct}
        setIsReloading={setIsReloading}
      />
    </div>
  )
}

export default Product
