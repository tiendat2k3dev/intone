const productList = [
  {
    id: 1,
    name: "IPhone 15",
    price: 25000000,
  },
  {
    id: 2,
    name: "Samsung S25",
    price: 22000000,
  },
  {
    id: 3,
    name: "MacBook Air M4",
    price: 30000000,
  },
];

// Lấy danh sách
export function getAll() {
  return [...productList];
}

// Tìm kiếm
export function search(keyword) {
  return productList.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  );
}

// Thêm
export function addNew(product) {
  productList.push(product);
}

// Sửa
export function update(product) {
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id === product.id) {
      productList[i] = product;
      break;
    }
  }
}

// Xóa
export function deleteById(id) {
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      productList.splice(i, 1);
      break;
    }
  }
}
