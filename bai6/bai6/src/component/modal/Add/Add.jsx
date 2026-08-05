import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { addNew, getCategories } from "../../../service/productServices";
const Add = ({ show, close, setIsReloading }) => {
  // Lưu danh sách danh mục lấy từ API
  const [categories, setCategories] = useState([]);
  // Khi component được render lần đầu, gọi API lấy danh sách danh mục
  useEffect(() => {
    const fetData = async () => {
      const list = await getCategories();
      setCategories(list);
    };
    fetData();
  }, []);
  // Validate dữ liệu nhập vào
  const validationSchema = Yup.object().shape({
    // Tên sản phẩm không được để trống
    name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
    // Giá phải là số và lớn hơn 0
    price: Yup.number()
      .typeError("Giá phải là một số")
      .required("Vui lòng nhập giá")
      .positive("Giá phải lớn hơn 0"),
    // Bắt buộc chọn danh mục
    categoryId: Yup.string().required("Vui lòng chọn danh mục"),
  });
  // Hàm thêm sản phẩm
  const handleAdd = async (values) => {
    // Tìm object category dựa vào categoryId người dùng chọn
    const category = categories.find(
      (item) => String(item.id) === values.categoryId,
    );
    // Tạo object sản phẩm mới
    const newProduct = {
      name: values.name,
      price: Number(values.price),
      category: category,
    };
    // Gọi API thêm sản phẩm
    const isSuccess = await addNew(newProduct);
    // Nếu thành công
    if (isSuccess) {
      toast.success("Thêm thành công!");
      // Reload lại danh sách sản phẩm
      setIsReloading((prev) => !prev);
      // Đóng modal
      close();
    } else {
      toast.error("Thêm không thành công!");
    }
  };
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm mới</Modal.Title>
      </Modal.Header>
      <Formik
        // Giá trị ban đầu của form
        initialValues={{
          name: "",
          price: "",
          categoryId: "",
        }}
        // Validation bằng Yup
        validationSchema={validationSchema}
        // Khi submit sẽ gọi handleAdd
        onSubmit={handleAdd}
      >
        {({
          // Giá trị hiện tại của form
          values,
          // Lỗi validate
          errors,
          // Trạng thái đã chạm vào input hay chưa
          touched,
          // Hàm cập nhật dữ liệu khi nhập
          handleChange,
          // Hàm xử lý khi rời khỏi input
          handleBlur,
          // Hàm submit form
          handleSubmit,
          // Trạng thái đang submit
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {/* Tên sản phẩm */}
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
              {/* Giá */}
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
              {/* Danh mục */}
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
                  {/* Hiển thị danh sách category */}
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
