import api from "./api";

export const getMyDashboard = async () => {
  const res = await api.get("/api/myDashboard");
  return res.data;
};

export const getAllCourses = async () => {
  const res = await api.get("/api/courses");
  return res.data;
};

export const enrollCourse = (course_id) => {
  return api.post("/api/enroll", { course_id });
};

export const createCourse = async (courseData) => {
  const res = await api.post("/api/courses", courseData);
  return res.data;
};

export const getCourseById = async (id) => {
  return await api.get(`/api/courses/${id}`);
};

export const getCourseStudents = async (id) => {
  return await api.get(`/api/courses/${id}/students`);
};

export const updateCourse = async (id, data) => {
  const res = await api.put(`/api/courses/${id}`, data);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await api.delete(`/api/courses/${id}`);
  return res.data;
};
