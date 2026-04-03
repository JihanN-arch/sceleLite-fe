import api from "./api";

export const getProfile = async () => {
  try {
    const res = await api.get("/api/me");
    return res.data;
  } catch (err) {
    throw err;
  }
};
