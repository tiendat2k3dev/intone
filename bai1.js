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
const ket_qua = courses.filter((course) => {
  return course.rating >= 4;
});
// in ra ket_qua
console.log(ket_qua);

// bai 2 Yêu cầu 2: Sử dụng cú pháp ES6 để xuất ra màn hình danh sách các bài đăng có rating < 4 với yêu cầu giá trị các phần tử của mảng mới có định dạng:
// khai bao const ket_qua1=

const ket_qua1 = courses
  // dung filter de loc Lọc các phần tử trong mảng course co rating < 4
  .filter((course) => {
    // kiem tra rating < 4 co nho hon 4 khong
    return course.rating < 4;
  })
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
//bai 4 Sử dụng ES6 ( arrow function, fitter)
// 1. Viết hàm kiểm tra 1 số có phải là số nguyên

const so_nguyen = (number) => {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};
console.log(so_nguyen(7)); // true
//2. Cho 1 mảng số nguyên. Sử dụng filter để lọc ra các số là số nguyên tố
const mang_so_nguyen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ket_qua3 = mang_so_nguyen.filter((number) => so_nguyen(number));
console.log(ket_qua3); // [2, 3, 5, 7]

// bai 5
// Sử dụng  Destructuring, rest, spread
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  gender: "male",
  occupation: "developer",
  nationality: "American",
  city: "New York",
  hobbies: ["reading", "traveling", "photography"],
  languages: ["English", "Spanish"],
  education: {
    degree: "Bachelor",
    major: "Computer Science",
    university: "Harvard University",
  },
};
const { firstName, gender, languages, education } = person;

const english = languages[0];
const degree = education.degree;

const student = {
  firstName,
  gender,
  degree,
  english,
};

console.log(student);

// bai 6 Viết một function có tham số là một đối tượng bất kỳ .
// Function sẽ hiển thi ra 2 thuộc tính firstName và degree
//   + Nếu đối tượng truyền vào không có thuộc tính firstName thì firstNam có giá trị mặc định là "Quân", tương tự với degree là "NA"
const getInfo = ({ firstName = "Quân", degree = "NA" }) => {
  console.log("firstName:", firstName);
  console.log("degree:", degree);
};

const sv1 = {
  firstName: "John",
  gender: "male",
  degree: "Bachelor",
  english: "English",
};

getInfo(sv1);
