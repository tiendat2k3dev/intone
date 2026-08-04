import * as Yup from 'yup'

const productValidation = Yup.object({
  id: Yup.number()
    .typeError('ID phải là số')
    .required('Vui lòng nhập ID')
    .min(1, 'ID phải lớn hơn 0'),

  name: Yup.string()
    .required('Vui lòng nhập tên sản phẩm')
    .min(2, 'Tên phải có ít nhất 2 ký tự'),

  price: Yup.number()
    .typeError('Giá phải là số')
    .required('Vui lòng nhập giá')
    .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
})

export default productValidation
