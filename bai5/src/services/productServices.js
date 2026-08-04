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
  const index = productList.findIndex((item) => item.id === Number(product.id))

  if (index !== -1) {
    productList[index] = {
      ...productList[index],
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
