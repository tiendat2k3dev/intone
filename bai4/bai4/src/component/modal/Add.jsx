import React, { useRef } from "react";
import { addNew } from "../../service/productServices.js";

const Add = ({ onAddSuccess }) => {
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const handleAdd = (e) => {
    e.preventDefault();

    const newProduct = {
      id: idRef.current.value,
      name: nameRef.current.value,
      price: priceRef.current.value,
    };

    addNew(newProduct);

    idRef.current.value = "";
    nameRef.current.value = "";
    priceRef.current.value = "";

    if (onAddSuccess) {
      onAddSuccess(newProduct);
      console.log("Sản phẩm vừa thêm:", newProduct);
    }
  };

  return (
    console.log("----------add--------------------"),
    (
      <div className="card p-3 mt-3">
        <h4 className="mb-3">Thêm mới</h4>
        <form onSubmit={handleAdd}>
          <div className="mb-2">
            <label className="form-label">ID</label>
            <input className="form-control" ref={idRef} />
          </div>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input className="form-control" ref={nameRef} />
          </div>
          <div className="mb-2">
            <label className="form-label">Price</label>
            <input className="form-control" ref={priceRef} />
          </div>
          <button type="submit" className="btn btn-success">
            Lưu
          </button>
        </form>
      </div>
    )
  );
};
export default React.memo(Add);
