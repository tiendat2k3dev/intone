import "bootstrap/dist/css/bootstrap.min.css";
import ProductHeader from "./Header/ProductHeader";
import ProductSearch from "../Search/ProductSearch";
import Delete from "../modal/Delete";
import { useState, useEffect, useCallback } from "react";
import { getAll, search } from "../../service/productServices.js";
import Add from "../modal/Add";
const Product = () => {
  const table = ["ID", "Name", "Price", "Action"];

  const [products, setProducts] = useState([]);
  const [isReloading, setIsReloading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [deleteProduct, setDeleteProduct] = useState({
    id: "",
    name: "",
    price: "",
  });
  const handleSearch = (keyword) => {
    if (keyword.trim() === "") {
      setProducts(getAll());
    } else {
      setProducts(search(keyword));
    }
  };
  useEffect(() => {
    console.log("-----------effect------------");
    setProducts([...getAll()]);
  }, [isReloading]);

  // Mở modal
  const openModal = (product) => {
    setShowModal(true);
    setDeleteProduct(product);
  };

  // Đóng modal
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);
  console.log("-----------render------------");
  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        {/* Header */}
        <ProductHeader name="Product Management" />
        <Add
          onAddSuccess={(newProduct) => {
            setProducts((prevProducts) => [...prevProducts, newProduct]);
          }}
        />
        {/* Search */}
        <ProductSearch onSearch={handleSearch} />

        {/* Table */}
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              {table.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>

                <td>{product.name}</td>

                <td>{Number(product.price).toLocaleString()} đ</td>

                <td>
                  <button className="btn btn-warning btn-sm me-2">Edit</button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => openModal(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Delete
          show={showModal}
          product={deleteProduct}
          close={closeModal}
          setIsReloading={setIsReloading}
        />
      </div>
    </div>
  );
};

export default Product;
