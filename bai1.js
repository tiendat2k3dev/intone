// ES6
// bai 1
//Yêu cầu 1: Sử dụng cú pháp ES6 để xuất ra màn hình danh sách các bài đăng có rating ≥ 4
// buoc 1: khai báo mảng courses
let courses = [
  {
    id: 1,
    title: "ReactJS Tutorial",
    rating: 4.2,
  },
  {
    id: 2,
    title: "Angular Tutorial",
    rating: 2.5,
  },
  {
    id: 3,
    title: "VueJS Tutorial",
    rating: 3.8,
  },
  {
    id: 4,
    title: "Java Tutorial",
    rating: 4,
  },
  {
    id: 5,
    title: "JavaScript Tutorial",
    rating: 3.5,
  },
];
// khai bao const ket_qua=
// kiem tra rating >=4 co lon hon hoac bang 4 khong
// ; courses.filter((course) => course.rating >= 4);
const ket_qua = courses.filter((course) => course.rating >= 4);
// in ra ket_qua
console.log(ket_qua);

// bai 2 Yêu cầu 2: Sử dụng cú pháp ES6 để xuất ra màn hình danh sách các bài đăng có rating < 4 với yêu cầu giá trị các phần tử của mảng mới có định dạng:
// khai bao const ket_qua1=

const ket_qua1 = courses
  // dung filter de loc ra nhung course co rating < 4
  .filter((course) => course.rating < 4)
  // dung map de duyet tung phan tu va tra ve kết quả
  .map((course) => `${course.id} - ${course.title} - ${course.rating}`);

console.log(ket_qua1);
// bai 3 Yêu cầu 3: Sử dụng cú pháp ES6 đã học viết hàm trả về một mảng mới gộp 2 mảng courses và addedCourses

let addedCourses = [
  {
    id: 6,
    title: "PHP Tutorial",
    rating: 3,
  },
  {
    id: 7,
    title: "C# Tutorial",
    rating: 2,
  },
  {
    id: 8,
    title: "Docker Tutorial",
    rating: 3.8,
  },
];
// Spread Operator
const ket_qua2 = [...courses, ...addedCourses];
console.log(ket_qua2);
