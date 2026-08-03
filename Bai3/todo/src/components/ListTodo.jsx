import { Component } from "react";
import { getTodoList } from "../services/todoServices";
import Add from "../modal/Add";
import DeleteTodo from "../modal/DeleteTodo";

class ListTodo extends Component {
  // Constructor
  constructor(props) {
    super(props);
    // Khởi tạo state
    this.state = {
      todoList: [],
      isOpenModal: false,
      isOpenAddModal: false,
      selectedTodo: null,
    };
  }

  // Lấy dữ liệu sau khi component render
  componentDidMount() {
    console.log("------------after render-----------");

    this.setState({
      todoList: [...getTodoList()],
    });
  }

  // Mở modal xóa
  handleOpenModal = (todo) => {
    this.setState({
      isOpenModal: true,
      selectedTodo: todo,
    });
  };

  // Đóng modal xóa
  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
      selectedTodo: null,
    });
  };

  // Mở modal thêm
  handleOpenAddModal = () => {
    this.setState({
      isOpenAddModal: true,
    });
  };

  // Đóng modal thêm
  handleCloseAddModal = () => {
    this.setState({
      isOpenAddModal: false,
    });
  };

  // Tải lại danh sách công việc
  reloading = () => {
    this.setState({
      todoList: [...getTodoList()],
    });
  };

  render() {
    // Lấy dữ liệu từ state
    const { todoList, isOpenModal, isOpenAddModal, selectedTodo } = this.state;

    return (
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Danh sách Todo</h2>
          <button className="btn btn-primary" onClick={this.handleOpenAddModal}>
            Thêm mới
          </button>
        </div>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nội dung</th>
              <th>Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {todoList.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.content}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleOpenModal(todo)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Add
          isOpen={isOpenAddModal}
          onClose={this.handleCloseAddModal}
          reloading={this.reloading}
        />

        <DeleteTodo
          isOpen={isOpenModal}
          todo={selectedTodo}
          onClose={this.handleCloseModal}
          reloading={this.reloading}
        />
      </div>
    );
  }
}

export default ListTodo;
