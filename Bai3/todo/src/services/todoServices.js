// Mock dữ liệu Todo
const todoList = [
  {
    id: 1,
    content: "Học ReactJS",
  },
  {
    id: 2,
    content: "Làm bài tập JavaScript",
  },
  {
    id: 3,
    content: "Đọc tài liệu React Router",
  },
  {
    id: 4,
    content: "Hoàn thành bài thực hành CRUD",
  },
  {
    id: 5,
    content: "Ôn tập ES6",
  },
  {
    id: 6,
    content: "Luyện Git và GitHub",
  },
  {
    id: 7,
    content: "Xem video về Hooks",
  },
  {
    id: 8,
    content: "Viết Component mới",
  },
  {
    id: 9,
    content: "Làm báo cáo thực tập",
  },
  {
    id: 10,
    content: "Đọc sách lập trình",
  },
];

// Lấy danh sách công việc
export const getTodoList = () => {
  return [...todoList];
};

// Xóa công việc theo id
export const deleteById = (id) => {
  const index = todoList.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todoList.splice(index, 1);
  }
};
