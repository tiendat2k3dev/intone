// data mẫu sản phẩm
const productList = [
  {
    id: 1,
    name: 'IPhone 15',
    price: 25000000,
  },
  {
    id: 2,
    name: 'Samsung S25',
    price: 22000000,
  },
  {
    id: 3,
    name: 'MacBook Air M4',
    price: 30000000,
  },
]

// Lấy tất cả
export function getAll() {
  return [...productList]
}

// Tìm kiếm
export function search(keyword) {
  return productList.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  )
}

// Lấy sản phẩm theo id
export function getById(id) {
  return productList.find((product) => product.id === Number(id))
}

// Thêm
export function addNew(product) {
  productList.push(product)
}

// Cập nhật
export function update(product) {
  // tìm index của sản phẩm cần cập nhật
  const index = productList.findIndex((item) => item.id === Number(product.id))
  // nếu tìm thấy thì cập nhật sản phẩm
  if (index !== -1) {
    // cập nhật sản phẩm bằng cách gán giá trị mới cho các thuộc tính của sản phẩm cũ
    productList[index] = {
      // giữ nguyên các thuộc tính cũ của sản phẩm cũ
      ...productList[index],
      // cập nhật các thuộc tính mới của sản phẩm mới
      ...product,
    }
  }
}

// Xóa
export function deleteById(id) {
  const index = productList.findIndex((product) => product.id === Number(id))

  if (index !== -1) {
    productList.splice(index, 1)
  }
}
