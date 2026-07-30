import React from "react";
import { getStudents } from "./server/studentServer";
import viteLogo from "./assets/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const baitap_1 = React.createElement(
    React.Fragment,
    null,
    React.createElement("h6", null, "Bài tập 1"),
    React.createElement("h3", null, "Danh sách các thành phố "),
    React.createElement(
      "ul",
      null,
      React.createElement("li", null, "Hà Nội"),
      React.createElement("li", null, "Đà Nẵng"),
      React.createElement("li", null, "Hải Phòng"),
      React.createElement("li", null, "TP. Hồ Chí Minh"),
      React.createElement("li", null, "Cần Thơ"),
    ),
  );

  const students = getStudents();
  const table = ["STT", "Họ và tên", "Tuổi", "Địa chỉ"];

  return (
    <>
      <section className="mb-5">{baitap_1}</section>

      <div className="container mt-4">
        <h1 className="text-center mb-4"> Bai 2 Danh sách sinh viên</h1> <br />
        {/* Table */}
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-primary">
            <tr>
              {table.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1 className="text-center mb-4">Bài tập 3: Form đăng nhập</h1>
        {/* Login Form */}
        <div className="d-flex justify-content-center mt-5">
          <div className="w-50 text-center">
            <img src={viteLogo} alt="Avatar" width="80" className="mb-3" />

            <h1 className="mb-4">Please sign in</h1>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email address"
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-check text-start mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            <button className="btn btn-primary w-100 btn-lg" type="button">
              Sign in
            </button>

            <p className="text-secondary mt-5">© 2017–2021</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
