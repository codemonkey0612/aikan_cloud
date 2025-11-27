import { api } from "./axios";

export const getFacilities = () => api.get("/facilities");
export const getFacilityById = (id: number) => api.get(`/facilities/${id}`);
export const createFacility = (data: any) => api.post("/facilities", data);
export const updateFacility = (id: number, data: any) =>
  api.put(`/facilities/${id}`, data);
export const deleteFacility = (id: number) => api.delete(`/facilities/${id}`);
