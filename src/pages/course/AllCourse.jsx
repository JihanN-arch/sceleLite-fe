import { useEffect, useState, useCallback } from "react"; // Tambah useCallback
import { getAllCourses } from "../../services/course";
import CourseCard from "../../components/course/CourseCard";
import { Plus } from "lucide-react";
import CreateCourseModal from "../../components/course/CreateCourse";
import CourseDetailModal from "../../components/course/CourseDetailModal";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await getAllCourses();
      setCourses(response.data || []);
    } catch (err) {
      console.error("Gagal mengambil daftar matkul:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOpenDetail = (id) => {
    setSelectedCourseId(id);
    setIsDetailOpen(true);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f6db00]"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh] space-y-6 px-4 md:px-0">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-xl md:text-3xl font-black text-gray-900 leading-tight">
            Semua matkul yang tersedia
          </h1>
        </div>
        <div className="absolute right-[-20px] top-[-20px] w-32 h-32 md:w-40 md:h-40 bg-[#f6db00] opacity-10 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => handleOpenDetail(course.id)}
            className="cursor-pointer"
          >
            <CourseCard course={course} isAllCourse={true} />
          </div>
        ))}
      </div>

      <CourseDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        courseId={selectedCourseId}
        user={user}
        onRefresh={fetchCourses}
      />
      {courses.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">
            Belum ada mata kuliah yang tersedia.
          </p>
        </div>
      )}
      {/* tmbol create untk dosen */}
      {user?.role === "dosen" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 md:px-6 md:py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[60] group transition-all duration-200 active:scale-95 transform-none"
          style={{ isolation: "isolate" }}
        >
          <div className="bg-[#f6db00] p-1 rounded-lg group-hover:rotate-90 transition-transform duration-300">
            <Plus size={20} className="text-gray-900" />
          </div>
          <span className="font-bold text-sm hidden md:block">
            Create New Class
          </span>
        </button>
      )}
      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchCourses}
      />
    </div>
  );
}
