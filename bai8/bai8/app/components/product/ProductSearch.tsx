"use client";

import { useState } from "react";

interface ProductSearchProps {
  onSearch: (keyword: string) => void;
}

const ProductSearch = ({ onSearch }: ProductSearchProps) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
