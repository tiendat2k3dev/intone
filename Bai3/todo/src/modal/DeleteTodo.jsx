import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteById } from "../services/todoServices";

class DeleteTodo extends Component {
  // Đóng modal
  handleClose = () => {
    this.props.onClose();
  };
  // Xóa công việc và tải lại danh sách
  handleDelete = () => {
    if (!this.props.todo) return;
    // Xóa công việc theo id
    deleteById(this.props.todo.id);
    this.props.reloading();
    this.props.onClose();
  };

  render() {
    // Lấy công việc được chọn hoặc tạo một đối tượng rỗng nếu không có
    const todo = this.props.todo || { content: "" };

    return (
      <>
        <Modal show={this.props.isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Xóa công việc</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <span>
              Bạn có muốn xóa công việc <b>{todo.content}</b> không?
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

export default DeleteTodo;
