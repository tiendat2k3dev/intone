import { Component } from "react";
import { getTodoList } from "../services/todoServices";
import DeleteTodo from "../modal/DeleteTodo";

class ListTodo extends Component {
  // Constructor
  constructor(props) {
    super(props);
    // Khởi tạo state
    this.state = {
      todoList: [],
      isOpenModal: false,
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

  // Mở modal
  handleOpenModal = (todo) => {
    this.setState({
      isOpenModal: true,
      selectedTodo: todo,
    });
  };

  // Đóng modal
  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
      selectedTodo: null,
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
    const { todoList, isOpenModal, selectedTodo } = this.state;

    return (
      <div className="container mt-3">
        <h2>Danh sách Todo</h2>

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
