import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { addNew, getCategories } from "../../../service/productServices";

const Add = ({ show, close, setIsReloading }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (show) {
      loadCategories();
    }
  }, [show]);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
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
        <Modal.Title>Thêm sản phẩm mới</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: "", price: "", categoryId: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const category = categories.find(
            (c) => String(c.id) === values.categoryId,
          );
          const newProduct = {
            name: values.name,
            price: Number(values.price),
            category: {
              id: category.id,
              name: category.name,
            },
          };

          const isSuccess = await addNew(newProduct);
          if (isSuccess) {
            toast.success("Thêm thành công!");
            setIsReloading((pre) => !pre);
            resetForm();
            close();
          } else {
            toast.error("Thêm không thành công!");
          }
          setSubmitting(false);
        }}
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
                Thêm
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default React.memo(Add);
