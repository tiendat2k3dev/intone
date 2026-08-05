import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button } from 'react-bootstrap'
// import * as Yup from 'yup'
import { addNew } from '../../../services/productServices'
//
import productValidation from '../../../utils/productValidation'
const Add = () => {
  const navigate = useNavigate()
  // hàm handleAdd để thêm sản phẩm mới
  const handleAdd = (values) => {
    // them moi
    addNew(values)
    // thong bao
    toast.success('Thêm mới thành công!')
    // điều hướng về trang danh sách sản phẩm
    navigate('/product')
  }

  // const validation = Yup.object({
  //   id: Yup.number()
  //     .typeError('ID phải là số')
  //     .required('Vui lòng nhập ID')
  //     .min(1, 'ID phải lớn hơn 0'),

  //   name: Yup.string()
  //     .required('Vui lòng nhập tên sản phẩm')
  //     .min(2, 'Tên phải có ít nhất 2 ký tự'),

  //   price: Yup.number()
  //     .typeError('Giá phải là số')
  //     .required('Vui lòng nhập giá')
  //     .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  // })

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Thêm sản phẩm</h2>

      <Formik
        initialValues={{
          id: '',
          name: '',
          price: '',
        }}
        validationSchema={productValidation}
        onSubmit={handleAdd}
      >
        <Form className="w-50">
          <div className="mb-3">
            <label className="form-label">ID</label>
            <Field type="number" name="id" className="form-control" />
            <ErrorMessage name="id" component="small" className="text-danger" />
          </div>

          <div className="mb-3">
            <label className="form-label">Name</label>
            <Field type="text" name="name" className="form-control" />
            <ErrorMessage
              name="name"
              component="small"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <Field type="number" name="price" className="form-control" />
            <ErrorMessage
              name="price"
              component="small"
              className="text-danger"
            />
          </div>

          <Button variant="primary" type="submit">
            Lưu
          </Button>

          <Button
            variant="secondary"
            className="ms-2"
            type="button"
            onClick={() => navigate('/product')}
          >
            Hủy
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default Add
