import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const TOKEN_KEY = "nursingSystem.jwt";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let authToken = localStorage.getItem(TOKEN_KEY);

if (authToken) {
  apiClient.defaults.headers.common.Authorization = `Bearer ${authToken}`;
}

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete apiClient.defaults.headers.common.Authorization;
  }
};

export const getAuthToken = () => authToken;

export type ApiIdentifier = number | string;

