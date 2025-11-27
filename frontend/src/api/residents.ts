import { api } from "./axios";

export const getResidents = (facilityId?: number) =>
  api.get("/residents", { params: { facilityId } });

export const getResidentById = (id: number) => api.get(`/residents/${id}`);

export const createResident = (data: any) => api.post("/residents", data);

export const updateResident = (id: number, data: any) =>
  api.put(`/residents/${id}`, data);

export const deleteResident = (id: number) =>
  api.delete(`/residents/${id}`);
