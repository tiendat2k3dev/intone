const ProductSearch = ({ onSearch }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by product name..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

export default ProductSearch
