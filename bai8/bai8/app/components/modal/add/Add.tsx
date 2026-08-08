"use client";

import React, { useEffect, useState } from "react";

import { Modal, Button, Form as BootstrapForm } from "react-bootstrap";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { toast } from "react-toastify";

import { addNew, getCategories } from "../../../services/productServices";

import { productValidation } from "../../../utils/productValidation";

import { Category } from "../../../types/product";

interface AddProps {
  show: boolean;
  close: () => void;
  setIsReloading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AddFormValues {
  name: string;
  price: string;
  categoryId: string;
}

const Add = ({ show, close, setIsReloading }: AddProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getCategories();

      setCategories(list);
    };

    fetchData();
  }, []);

  const handleAdd = async (values: AddFormValues) => {
    const category = categories.find(
      (item) => String(item.id) === values.categoryId,
    );

    if (!category) return;

    const newProduct = {
      name: values.name,
      price: Number(values.price),
      category,
    };

    const isSuccess = await addNew(newProduct);

    if (isSuccess) {
      toast.success("Thêm thành công!");

      setIsReloading((prev) => !prev);

      close();
    } else {
      toast.error("Thêm thất bại!");
    }
  };

  return (
    <Modal show={show} onHide={close}>
      <Formik<AddFormValues>
        initialValues={{
          name: "",
          price: "",
          categoryId: "",
        }}
        validationSchema={productValidation}
        onSubmit={handleAdd}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Thêm sản phẩm mới</Modal.Title>
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

                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
              Thêm
            </Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default React.memo(Add);
