import { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addTodo } from "../services/todoServices";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      error: "",
    };
  }

  handleClose = () => {
    this.setState({ content: "", error: "" });
    this.props.onClose();
  };

  handleChange = (event) => {
    this.setState({ content: event.target.value, error: "" });
  };

  handleAdd = () => {
    const content = this.state.content.trim();

    if (!content) {
      this.setState({ error: "Vui lòng nhập nội dung công việc trước khi thêm." });
      return;
    }

    addTodo(content);
    this.props.reloading();
    this.handleClose();
  };

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm công việc mới</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nội dung công việc</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập nội dung..."
              value={this.state.content}
              onChange={this.handleChange}
              isInvalid={!!this.state.error}
            />
            {this.state.error && (
              <Form.Control.Feedback type="invalid">
                {this.state.error}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={this.handleAdd}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Add;
