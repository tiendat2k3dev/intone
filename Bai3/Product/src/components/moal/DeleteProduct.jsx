import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteById } from "../../services/productServices";

class DeleteProduct extends Component {
  handleClose = () => {
    this.props.close();
  };

  handleDelete = () => {
    deleteById(this.props.product.id);
    this.props.reloading();
    this.props.close();
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Xóa sản phẩm</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <span>
              Bạn có muốn xóa sản phẩm <b>{this.props.product.name}</b> không?
            </span>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Hủy
            </Button>

            <Button variant="danger" onClick={this.handleDelete}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DeleteProduct;
