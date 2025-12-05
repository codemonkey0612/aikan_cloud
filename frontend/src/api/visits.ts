import { api } from "./axios";

export const getVisits = (params?: Record<string, unknown>) =>
  api.get("/visits", { params });

export const getVisitById = (id: number) => api.get(`/visits/${id}`);

export const createVisit = (data: any) => api.post("/visits", data);

export const updateVisit = (id: number, data: any) =>
  api.put(`/visits/${id}`, data);

export const deleteVisit = (id: number) => api.delete(`/visits/${id}`);
