const students = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    age: 20,
    address: "Hà Nội",
  },
  {
    id: 2,
    name: "Trần Thị B",
    age: 22,
    address: "Hồ Chí Minh",
  },
  {
    id: 3,
    name: "Lê Văn C",
    age: 21,
    address: "Đà Nẵng",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    age: 19,
    address: "Hải Phòng",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    age: 23,
    address: "Cần Thơ",
  },
];

export function getStudents() {
  return [...students];
}
