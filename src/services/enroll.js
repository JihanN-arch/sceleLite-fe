import api from "./api";
export const enrollCourse = async (courseId) => {
  const res = await api.post("/api/enroll", { course_id: courseId });
  return res.data;
};

export const unenrollCourse = async (courseId) => {
  const res = await api.delete(`/api/enroll/${courseId}`);
  return res.data;
};
