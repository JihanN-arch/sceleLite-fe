import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./utils/protectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/register";
import MainDashboard from "./pages/dashboard/mainDashboard";

import AllCourses from "./pages/course/AllCourse";
import Profile from "./pages/users/Profile";
import { Toaster } from "react-hot-toast";
import ManageCourse from "./pages/course/manageCourse";
import ViewEnrolledCourse from "./pages/course/viewEnrolledCourse";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* publci */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<MainDashboard />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/courses" element={<AllCourses />} />
          </Route>
        </Route>

        {/* dosen2 aja */}
        <Route element={<ProtectedRoute role="dosen" />}>
          <Route path="/manage-course/:id" element={<ManageCourse />} />
        </Route>

        <Route element={<ProtectedRoute role="mahasiswa" />}>
          <Route path="/view-course/:id" element={<ViewEnrolledCourse />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
