import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAll, search } from '../services/productServices'
import ProductHeader from '../component/product/Header/ProductHeader'
import ProductSearch from '../component/product/Search/ProductSearch'
import Delete from '../component/modal/delete/Delete'

const Product = () => {
  const table = ['ID', 'Name', 'Price', 'Action']

  const [products, setProducts] = useState([])
  const [deleteProduct, setDeleteProduct] = useState({
    id: '',
    name: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [isReloading, setIsReloading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setProducts(getAll())
  }, [isReloading])

  const handleSearch = (keyword) => {
    if (keyword.trim() === '') {
      setProducts(getAll())
    } else {
      setProducts(search(keyword))
    }
  }

  const handleAddClick = () => {
    navigate('/product/add')
  }

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
                    onClick={() => navigate(`/product/edit/${product.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setDeleteProduct(product)
                      setShowModal(true)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
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
