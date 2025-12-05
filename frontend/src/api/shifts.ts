import { api } from "./axios";

export const getShifts = (params?: any) =>
  api.get("/shifts", { params });

export const getShiftById = (id: number) => api.get(`/shifts/${id}`);

export const createShift = (data: any) => api.post("/shifts", data);

export const updateShift = (id: number, data: any) =>
  api.put(`/shifts/${id}`, data);

export const deleteShift = (id: number) =>
  api.delete(`/shifts/${id}`);
