import { api } from "./axios";

export const getNotifications = (params?: Record<string, unknown>) =>
  api.get("/notifications", { params });
export const getNotificationById = (id: number) =>
  api.get(`/notifications/${id}`);
export const createNotification = (data: any) =>
  api.post("/notifications", data);
export const updateNotification = (id: number, data: any) =>
  api.put(`/notifications/${id}`, data);
export const deleteNotification = (id: number) =>
  api.delete(`/notifications/${id}`);
