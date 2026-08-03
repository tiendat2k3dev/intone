const ProductHeader = ({ name }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="text-primary">{name}</h3>
    </div>
  );
};

export default ProductHeader;
