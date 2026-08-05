import React, { useEffect, useState } from "react";
import { Modal, Button, Form as BootstrapForm } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateProduct, getCategories } from "../../../service/productServices";

const Edit = ({ show, close, product, setIsReloading }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const list = await getCategories();
      setCategories(list);
    };
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    price: Yup.number()
      .typeError("Giá phải là một số")
      .required("Vui lòng nhập giá")
      .positive("Giá phải lớn hơn 0"),
    categoryId: Yup.string().required("Vui lòng chọn danh mục"),
  });

  const handleEdit = async (values) => {
    const category = categories.find(
      (item) => String(item.id) === values.categoryId,
    );

    const updatedProduct = {
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
      <Modal.Header closeButton>
        <Modal.Title>Sửa sản phẩm</Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={{
          name: product?.name || "",
          price: product?.price || "",
          categoryId: String(product?.category?.id || ""),
        }}
        validationSchema={validationSchema}
        onSubmit={handleEdit}
      >
        <Form>
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

                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
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
