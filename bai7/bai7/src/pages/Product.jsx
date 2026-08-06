import { useEffect, useState } from "react";
import { getAll, search } from "../services/productServices";
import ProductHeader from "../components/product/ProductHeader";
import ProductSearch from "../components/product/ProductSearch";
import Delete from "../modal/delete/Delete";
import Add from "../modal/add/Add";
import Edit from "../modal/edit/Edit";

const Product = () => {
  const table = ["STT", "Name", "Price", "Danh muc", "Action"];

  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState({
    id: "",
    name: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isReloading, setIsReloading] = useState(false);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    console.log("-----------effect------------");
    const fetData = async () => {
      const list = await getAll();
      setProducts(list);
    };
    fetData();
  }, [isReloading]);

  // Chuyển sang trang thêm mới
  const handleAddClick = () => {
    setShowAddModal(true);
  };
  // Đóng modal thêm mới
  const closeAddModal = () => {
    setShowAddModal(false);
  };
  // Đóng modal chỉnh sửa
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  // Tìm kiếm
  const handleSearch = async (keyword) => {
    // nếu từ khóa rỗng thì load lại danh sách sản phẩm
    if (keyword.trim() === "") {
      // gọi hàm getAll để lấy danh sách sản phẩm
      const list = await getAll();
      setProducts(list);
    } else {
      // gọi hàm search để tìm kiếm sản phẩm theo từ khóa
      const list = await search(keyword);
      setProducts(list);
    }
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
  };

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
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category?.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditProduct(product);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setDeleteProduct(product);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
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

      <Add
        show={showAddModal}
        close={closeAddModal}
        setIsReloading={setIsReloading}
      />

      <Edit
        show={showEditModal}
        close={closeEditModal}
        product={editProduct}
        setIsReloading={setIsReloading}
      />
    </div>
  );
};

export default Product;
