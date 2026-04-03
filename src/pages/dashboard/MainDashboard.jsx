import { useEffect, useState } from "react";
import { getMyDashboard } from "../../services/course";
import CourseCard from "../../components/course/CourseCard";
import { useNavigate } from "react-router-dom";

export default function MainDashboard() {
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Ambil nama dari localStorage (sesuai logic login kamu)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUserName(storedUser.username);

        const response = await getMyDashboard();
        setCourses(response.data);
        setUserRole(response.role);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f6db00]"></div>
      </div>
    );
  }

  const isDosen = userRole === "dosen";

  return (
    <div className="space-y-8 px-4 md:px-0">
      {/* Greeting Section */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 leading-tight">
            Hallo, {capitalize(userName)}!
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base font-medium">
            {isDosen
              ? "Berikut adalah matkul yang anda ampu semester ini."
              : "Berikut adalah matkul yang anda ambil semester ini."}
          </p>
        </div>

        <div className="absolute right-[-20px] top-[-20px] w-32 h-32 md:w-48 md:h-48 bg-[#f6db00] opacity-10 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => {
          const isDosen = userRole === "dosen";

          const handleNavigation = () => {
            if (isDosen) {
              // Dosen ke halaman kelola (Manage)
              navigate(`/manage-course/${course.id}`);
            } else {
              // Mahasiswa ke halaman belajar (View Enrolled)
              navigate(`/view-course/${course.id}`);
            }
          };

          return (
            <div
              key={course.id}
              onClick={handleNavigation}
              className="cursor-pointer transform transition-transform active:scale-95"
            >
              <CourseCard course={course} role={userRole} />
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">
            Belum ada mata kuliah yang terdaftar.
          </p>
        </div>
      )}
    </div>
  );
}
