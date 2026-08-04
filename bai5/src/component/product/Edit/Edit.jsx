import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button } from 'react-bootstrap'
// import * as Yup from 'yup'
import { getById, update } from '../../../services/productServices'
import productValidation from '../../../utils/productValidation'
const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [initialValues, setInitialValues] = useState({
    id: '',
    name: '',
    price: '',
  })

  useEffect(() => {
    const product = getById(id)

    if (product) {
      setInitialValues({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    } else {
      toast.error('Sản phẩm không tồn tại!')
      navigate('/product')
    }
  }, [id, navigate])

  const handleEdit = (values) => {
    update({
      id: Number(values.id),
      name: values.name,
      price: Number(values.price),
    })

    toast.success('Cập nhật thành công!')
    navigate('/product')
  }

  //   const validation = Yup.object({
  //     id: Yup.number()
  //       .typeError('ID phải là số')
  //       .required('Vui lòng nhập ID')
  //       .min(1, 'ID phải lớn hơn 0'),

  //     name: Yup.string()
  //       .required('Vui lòng nhập tên sản phẩm')
  //       .min(2, 'Tên phải có ít nhất 2 ký tự'),

  //     price: Yup.number()
  //       .typeError('Giá phải là số')
  //       .required('Vui lòng nhập giá')
  //       .min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  //   })

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Chỉnh sửa sản phẩm</h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={productValidation}
        onSubmit={handleEdit}
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

export default Edit
