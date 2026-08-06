import { useState } from "react";

const ProductSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  //  bam end
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by product name..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ProductSearch;
