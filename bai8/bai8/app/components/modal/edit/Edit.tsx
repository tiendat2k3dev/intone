"use client";

import React, { useEffect, useState } from "react";

import { Modal, Button, Form as BootstrapForm } from "react-bootstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { toast } from "react-toastify";

import {
  updateProduct,
  getCategories,
} from "../../../services/productServices";

import { productValidation } from "../../../utils/productValidation";

import { Category, Product } from "../../../types/product";

interface EditProps {
  show: boolean;
  close: () => void;
  product: Product | null;
  setIsReloading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditFormValues {
  name: string;
  price: string | number;
  categoryId: string;
}

const Edit = ({ show, close, product, setIsReloading }: EditProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getCategories();

      setCategories(list);
    };

    fetchData();
  }, []);

  const handleEdit = async (values: EditFormValues) => {
    if (!product) return;

    const category = categories.find(
      (item) => String(item.id) === values.categoryId,
    );

    if (!category) return;

    const updatedProduct: Product = {
      ...product,
      name: values.name,
      price: Number(values.price),
      category,
    };

    const isSuccess = await updateProduct(product.id, updatedProduct);

    if (isSuccess) {
      toast.success("Cập nhật thành công!");

      setIsReloading((prev) => !prev);

      close();
    } else {
      toast.error("Cập nhật không thành công!");
    }
  };

  return (
    <Modal show={show} onHide={close}>
      <Formik<EditFormValues>
        enableReinitialize
        initialValues={{
          name: product?.name || "",

          price: product?.price || "",

          categoryId: String(product?.category?.id || ""),
        }}
        validationSchema={productValidation}
        onSubmit={handleEdit}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Sửa sản phẩm</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Tên sản phẩm</BootstrapForm.Label>

              <Field name="name" className="form-control" />

              <ErrorMessage
                name="name"
                component="small"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Giá</BootstrapForm.Label>

              <Field name="price" type="number" className="form-control" />

              <ErrorMessage
                name="price"
                component="small"
                className="text-danger"
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Danh mục</BootstrapForm.Label>

              <Field as="select" name="categoryId" className="form-select">
                <option value="">-- Chọn danh mục --</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>

              <ErrorMessage
                name="categoryId"
                component="small"
                className="text-danger"
              />
            </BootstrapForm.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={close}>
              Huỷ
            </Button>

            <Button variant="primary" type="submit">
              Cập nhật
            </Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default React.memo(Edit);
