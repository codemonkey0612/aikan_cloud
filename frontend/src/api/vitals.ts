import { api } from "./axios";

export const getVitals = (params?: Record<string, unknown>) =>
  api.get("/vitals", { params });

export const getVitalById = (id: number) => api.get(`/vitals/${id}`);

export const createVital = (data: any) => api.post("/vitals", data);

export const updateVital = (id: number, data: any) =>
  api.put(`/vitals/${id}`, data);

export const deleteVital = (id: number) => api.delete(`/vitals/${id}`);
