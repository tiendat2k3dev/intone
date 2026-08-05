import { useState } from "react";

const ProductSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form className="d-flex mb-3" onSubmit={handleSearch}>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="btn btn-outline-success">
        Search
      </button>
    </form>
  );
};

export default ProductSearch;
