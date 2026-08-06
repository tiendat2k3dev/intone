import * as Yup from "yup";

export const productValidation = Yup.object({
  name: Yup.string().required("Vui lòng nhập tên sản phẩm"),

  price: Yup.number()
    .typeError("Giá phải là số")
    .required("Vui lòng nhập giá")
    .positive("Giá phải lớn hơn 0"),

  categoryId: Yup.string().required("Vui lòng chọn danh mục"),
});
