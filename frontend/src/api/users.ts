import { api } from "./axios";

export const getUsers = () => api.get("/users");
export const getUserById = (id: number) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post("/users", data);
export const updateUser = (id: number, data: any) =>
  api.put(`/users/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/users/${id}`);
