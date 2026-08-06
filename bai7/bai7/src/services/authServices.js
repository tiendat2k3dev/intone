import api from "./axiosClient";

export async function checkLogin(username, password) {
  try {
    const response = await api.get(`/users`);
    const account = response.data.find(
      (e) => e.username == username && e.password == password,
    );
    return account; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Trả về đối tượng null
  }
}
