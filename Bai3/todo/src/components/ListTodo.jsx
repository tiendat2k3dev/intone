import { Component } from "react";
import { getTodoList } from "../services/todoServices";
import DeleteTodo from "../moal/DeleteTodo";

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

  // Tải lại danh sách sau khi xóa
  handleReload = () => {
    this.setState({
      todoList: [...getTodoList()],
      isOpenModal: false,
      selectedTodo: null,
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
          onDeleteSuccess={this.handleReload}
        />
      </div>
    );
  }
}

export default ListTodo;
