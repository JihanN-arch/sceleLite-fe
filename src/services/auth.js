import api from "./api";
import useAuthStore from "../stores/useAuthStore";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);

  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  useAuthStore.getState().login(res.data.user);

  return res.data;
};

export const register = async (data) => {
  return api.post("/auth/register", data);
};

export const logout = () => {
  useAuthStore.getState().logout();
  window.location.href = "/login";
};
