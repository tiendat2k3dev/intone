export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}

export interface ProductFormValues {
  name: string;
  price: string | number;
  categoryId: string;
}
