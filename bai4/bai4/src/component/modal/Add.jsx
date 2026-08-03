import React, { useRef } from "react";
import { addNew, getAll } from "../../service/productServices.js";
const Add = ({ setIsReloading }) => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const handleAdd = () => {
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    // Kiểm tra dữ liệu

    // Lấy danh sách hiện tại
    const productList = getAll();
    // Tự động tăng ID
    const newProduct = {
      id:
        productList.length === 0
          ? 1
          : Math.max(...productList.map((item) => Number(item.id))) + 1,
      name: name.trim(),
      price: Number(price),
    };

    addNew(newProduct);

    // Xóa dữ liệu
    nameRef.current.value = "";
    priceRef.current.value = "";

    setIsReloading((pre) => !pre);
  };

  return (
    <div className="card p-3 mt-3">
      <h4 className="mb-3">Thêm mới</h4>

      <div className="mb-2">
        <label className="form-label">Name</label>
        <input className="form-control" ref={nameRef} />
      </div>

      <div className="mb-2">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" ref={priceRef} />
      </div>

      <button className="btn btn-success" onClick={handleAdd}>
        Lưu
      </button>
    </div>
  );
};

export default React.memo(Add);
