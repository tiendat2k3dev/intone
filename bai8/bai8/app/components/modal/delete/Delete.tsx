"use client";

import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { deleteById } from "../../../services/productServices";

import { Product } from "../../../types/product";

interface DeleteProps {
  show: boolean;
  close: () => void;
  product: Partial<Product>;
  setIsReloading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Delete = ({ show, close, product, setIsReloading }: DeleteProps) => {
  const handleDelete = async () => {
    if (!product.id) return;

    const isDelete = await deleteById(product.id);

    if (isDelete) {
      setIsReloading((prev) => !prev);

      toast.success("Xoá thành công!!!");
    } else {
      toast.error("Xoá không thành công!!!");
    }

    close();
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Xoá sản phẩm</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Bạn có muốn xoá sản phẩm <strong>{product.name}</strong>?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>

        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(Delete);
