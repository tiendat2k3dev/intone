// moc
const product = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    price: 30000000,
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 32000000,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: 29000000,
  },
  {
    id: 4,
    name: "Samsung Galaxy Z Fold6",
    price: 42000000,
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    price: 25000000,
  },
  {
    id: 6,
    name: "OPPO Find X8 Pro",
    price: 27000000,
  },
  {
    id: 7,
    name: "vivo X200 Pro",
    price: 26000000,
  },
  {
    id: 8,
    name: "Google Pixel 9 Pro",
    price: 28000000,
  },
  {
    id: 9,
    name: "OnePlus 13",
    price: 22000000,
  },
  {
    id: 10,
    name: "realme GT 7 Pro",
    price: 18000000,
  },
];
// lay danh sach san pham
export const getProduct = () => {
  return [...product];
};
// xoa san pham theo id
export const deleteById = (id) => {
  for (let i = 0; i < product.length; i++) {
    if (id == product[i].id) {
      product.splice(i, 1);
      break;
    }
  }
};
