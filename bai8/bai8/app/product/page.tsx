"use client";

import { useEffect, useState } from "react";

import ProductHeader from "../components/product/ProductHeader";
import ProductSearch from "../components/product/ProductSearch";

import Delete from "../components/modal/delete/Delete";
import Add from "../components/modal/add/Add";
import Edit from "../components/modal/edit/Edit";

import { getAll, search } from "../services/productServices";

import { Product } from "../types/product";

import { ToastContainer } from "react-toastify";

const ProductPage = () => {
  const table: string[] = ["STT", "Name", "Price", "Danh muc", "Action"];

  const [products, setProducts] = useState<Product[]>([]);

  const [deleteProduct, setDeleteProduct] = useState<Partial<Product>>({});

  const [showModal, setShowModal] = useState<boolean>(false);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [isReloading, setIsReloading] = useState<boolean>(false);

  // =========================
  // GET ALL PRODUCTS
  // =========================

  useEffect(() => {
    const fetchData = async () => {
      const list = await getAll();

      setProducts(list);
    };

    fetchData();
  }, [isReloading]);

  // =========================
  // ADD
  // =========================

  const handleAddClick = (): void => {
    setShowAddModal(true);
  };

  const closeAddModal = (): void => {
    setShowAddModal(false);
  };

  // =========================
  // EDIT
  // =========================

  const closeEditModal = (): void => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearch = async (keyword: string): Promise<void> => {
    if (keyword.trim() === "") {
      const list = await getAll();

      setProducts(list);
    } else {
      const list = await search(keyword);

      setProducts(list);
    }
  };

  // =========================
  // DELETE
  // =========================

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <>
      {/* HEADER */}

      {/* MAIN */}

      <main className="main-content">
        <ProductHeader
          name="Product Management"
          add="Add Product"
          onAddClick={handleAddClick}
        />

        <ProductSearch onSearch={handleSearch} />

        {/* TABLE */}

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
                    {/* EDIT */}

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        setEditProduct(product);

                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>

                    {/* DELETE */}

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

        {/* DELETE MODAL */}

        <Delete
          show={showModal}
          close={closeModal}
          product={deleteProduct}
          setIsReloading={setIsReloading}
        />

        {/* ADD MODAL */}

        <Add
          show={showAddModal}
          close={closeAddModal}
          setIsReloading={setIsReloading}
        />

        {/* EDIT MODAL */}

        <Edit
          show={showEditModal}
          close={closeEditModal}
          product={editProduct}
          setIsReloading={setIsReloading}
        />

        <ToastContainer position="top-right" autoClose={2000} />
      </main>
    </>
  );
};

export default ProductPage;
