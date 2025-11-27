import { api } from "./axios";

export const getSalaries = (params?: Record<string, unknown>) =>
  api.get("/salaries", { params });

export const getSalaryById = (id: number) => api.get(`/salaries/${id}`);

export const createSalary = (data: any) => api.post("/salaries", data);

export const updateSalary = (id: number, data: any) =>
  api.put(`/salaries/${id}`, data);

export const deleteSalary = (id: number) => api.delete(`/salaries/${id}`);
