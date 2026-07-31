import { Component } from "react";
import { getTodoList } from "../services/todoServices";
import DeleteTodo from "../moal/DeleteTodo";

class ListTodo extends Component {
  constructor(props) {
    console.log("-------init---constructor run-----------------");

    super(props);

    this.state = {
      todoList: getTodoList(),
      isOpenModal: false,
      selectedTodo: null,
    };
  }

  // Mở modal xóa
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

  // Cập nhật lại danh sách sau khi xóa
  handleReload = () => {
    this.setState({
      todoList: getTodoList(),
      isOpenModal: false,
      selectedTodo: null,
    });
  };

  render() {
    const { todoList, isOpenModal, selectedTodo } = this.state;

    return (
      <div className="container mt-3">
        <h2>Danh sách Todo</h2>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nội dung</th>
              <th width="120">Thao tác</th>
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
