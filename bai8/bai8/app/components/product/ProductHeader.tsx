"use client";

interface ProductHeaderProps {
  name: string;
  add: string;
  onAddClick: () => void;
}

const ProductHeader = ({ name, add, onAddClick }: ProductHeaderProps) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>{name}</h2>

      <button className="btn btn-primary" onClick={onAddClick}>
        {add}
      </button>
    </div>
  );
};

export default ProductHeader;
