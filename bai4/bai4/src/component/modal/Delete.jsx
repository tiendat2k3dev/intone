import { Button, Modal } from "react-bootstrap";
import { deleteById } from "../../service/productServices.js";
import React from "react";
const Delete = ({ show, close, product, setIsReloading }) => {
  const handelDelete = () => {
    deleteById(product.id);
    close();
    setIsReloading((pre) => !pre);
  };
  return (
    <>
      {console.log("----------delete--------------------")}
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có muốn xoá sinh viên {product.name}</span>
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
  );
};
export default React.memo(Delete);
