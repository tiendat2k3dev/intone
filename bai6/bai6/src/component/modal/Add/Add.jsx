import React, { useEffect, useState } from "react";
import { Modal, Button, Form as BootstrapForm } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { toast } from "react-toastify";
import { addNew, getCategories } from "../../../service/productServices";
import { productValidation } from "../../../utils/productValidation";
const Add = ({ show, close, setIsReloading }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getCategories();
      setCategories(list);
    };
    fetchData();
  }, []);

  // const validationSchema = Yup.object({
  //   name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
  //   price: Yup.number()
  //     .typeError("Giá phải là số")
  //     .required("Vui lòng nhập giá")
  //     .positive("Giá phải lớn hơn 0"),
  //   categoryId: Yup.string().required("Vui lòng chọn danh mục"),
  // });

  const handleAdd = async (values) => {
    const category = categories.find(
      (item) => String(item.id) === values.categoryId,
    );
    const newProduct = {
      ...values,
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
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm mới</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          name: "",
          price: "",
          categoryId: "",
        }}
        validationSchema={productValidation}
        onSubmit={handleAdd}
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
