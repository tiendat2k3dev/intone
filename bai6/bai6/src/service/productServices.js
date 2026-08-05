import api from "./axiosClient";

export async function getAll() {
    try {
        const res = await api.get("/products");
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}

export async function addNew(product) {
    try {
        const res = await api.post("/products", product);
        return res.status === 201;
    } catch (e) {
        console.log(e);
    }
    return false;
}

export async function deleteById(id) {
    try {
        const res = await api.delete(`/products/${id}`);
        return res.status === 200;
    } catch (e) {
        console.log(e);
    }
    return false;
}

export async function findById(id) {
    try {
        const res = await api.get(`/products/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return null;
}

export async function search(keyword) {
    try {
        const res = await api.get(`/products?name_like=${keyword}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}

export async function getCategories() {
    try {
        const res = await api.get("/categories");
        return res.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}

export async function updateProduct(id, product) {
    try {
        const res = await api.put(`/products/${id}`, product);
        return res.status === 200;
    } catch (e) {
        console.log(e);
    }
    return false;
}