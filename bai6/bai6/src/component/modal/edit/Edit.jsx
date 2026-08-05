import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateProduct, getCategories } from "../../../service/productServices";
const Edit = ({ show, close, product, setIsReloading }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetData = async () => {
      const list = await getCategories();
      setCategories(list);
    };
    fetData();
  }, []);
  const handleEdit = async (values) => {
    const category = categories.find(
      (item) => String(item.id) === values.categoryId,
    );

    const updatedProduct = {
      ...product,
      name: values.name,
      price: Number(values.price),
      category: category,
    };

    const isSuccess = await updateProduct(product.id, updatedProduct);

    if (isSuccess) {
      toast.success("Cập nhật thành công!");
      close();
      setIsReloading((prev) => !prev);
    } else {
      toast.error("Cập nhật không thành công!");
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    price: Yup.number()
      .typeError("Giá phải là một số")
      .required("Vui lòng nhập giá")
      .positive("Giá phải lớn hơn 0"),
    categoryId: Yup.string().required("Vui lòng chọn danh mục"),
  });

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa sản phẩm</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: product?.name || "",
          price: product?.price || "",
          categoryId: product?.category?.id || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleEdit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.price && !!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Danh mục</Form.Label>
                <Form.Select
                  name="categoryId"
                  value={values.categoryId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.categoryId && !!errors.categoryId}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.categoryId}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={close}>
                Huỷ
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Cập nhật
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default React.memo(Edit);
