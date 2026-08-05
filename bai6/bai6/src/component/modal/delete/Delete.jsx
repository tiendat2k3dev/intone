import { Button, Modal } from 'react-bootstrap'
import { deleteById } from '../../../service/productServices.js'
import React from 'react'
import { toast } from 'react-toastify';

const Delete = ({ show, close, product, setIsReloading }) => {
  const handelDelete = () => {
    const fetData = async () => {
      const isDelete = await deleteById(product.id);
      if (isDelete) {
        setIsReloading(pre => !pre);
        toast.success(" Xoá thành công!!!");
      } else {
        toast.error(" Xoá không thành công!!!");
      }
      close();

    }
    fetData();

  }
  return (
    <>
      {console.log('----------delete--------------------')}
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có muốn xoá sản phẩm {product?.name}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={handelDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default React.memo(Delete)
