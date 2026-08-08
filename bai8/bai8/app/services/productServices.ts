import api from "./axiosClient";
import { Category, Product } from "../types/product";

export async function getAll(): Promise<Product[]> {
  try {
    const res = await api.get<Product[]>("/products");

    return res.data;
  } catch (e) {
    console.log(e);
  }

  return [];
}

export async function addNew(product: Omit<Product, "id">): Promise<boolean> {
  try {
    const res = await api.post("/products", product);

    return res.status === 201;
  } catch (e) {
    console.log(e);
  }

  return false;
}

export async function deleteById(id: number): Promise<boolean> {
  try {
    const res = await api.delete(`/products/${id}`);

    return res.status === 200;
  } catch (e) {
    console.log(e);
  }

  return false;
}

export async function findById(id: number): Promise<Product | null> {
  try {
    const res = await api.get<Product>(`/products/${id}`);

    return res.data;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await api.get<Category[]>("/categories");

    return res.data;
  } catch (e) {
    console.log(e);
  }

  return [];
}

export async function updateProduct(
  id: number,
  product: Product,
): Promise<boolean> {
  try {
    const res = await api.put(`/products/${id}`, product);

    return res.status === 200;
  } catch (e) {
    console.log(e);
  }

  return false;
}

export async function search(keyword: string): Promise<Product[]> {
  try {
    const res = await api.get<Product[]>("/products");

    return res.data.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase()),
    );
  } catch (e) {
    console.log(e);
  }

  return [];
}
