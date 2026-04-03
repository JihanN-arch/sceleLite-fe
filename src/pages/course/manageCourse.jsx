import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCourseById,
  getCourseStudents,
  deleteCourse,
} from "../../services/course";
import { Users, Trash2, Edit3, ArrowLeft, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import CourseModal from "../../components/course/CreateCourse";

export default function ManageCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [courseRes, studentsRes] = await Promise.all([
          getCourseById(id),
          getCourseStudents(id),
        ]);
        setCourse(courseRes.data?.data || courseRes.data);
        setStudents(studentsRes.data?.students || studentsRes.students || []);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Gagal memuat data");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mata kuliah ini?")) {
      try {
        await deleteCourse(id);
        toast.success("Mata kuliah berhasil dihapus");
        navigate("/dashboard");
      } catch (err) {
        toast.error("Gagal menghapus mata kuliah");
      }
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const [courseRes, studentsRes] = await Promise.all([
        getCourseById(id),
        getCourseStudents(id),
      ]);
      setCourse(courseRes.data?.data || courseRes.data);
      setStudents(studentsRes.data?.students || studentsRes.students || []);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center p-20 text-center animate-pulse font-black text-gray-400 tracking-widest text-xs uppercase">
        LOADING DATA...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-black text-gray-500 hover:text-black transition-colors text-xs md:text-sm tracking-widest uppercase"
        >
          <ArrowLeft size={18} /> BACK TO DASHBOARD
        </button>

        {/* header */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex justify-end gap-2 mb-6 md:absolute md:top-8 md:right-8 md:mb-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2.5 md:p-4 bg-gray-50 hover:bg-[#f6db00] rounded-xl md:rounded-2xl transition-all active:scale-90 border border-gray-100 shadow-sm"
            >
              <Edit3 size={16} className="md:w-[20px] md:h-[20px]" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2.5 md:p-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl md:rounded-2xl transition-all active:scale-90 border border-red-100 shadow-sm"
            >
              <Trash2 size={16} className="md:w-[20px] md:h-[20px]" />
            </button>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="inline-block bg-[#f6db00] px-3 py-1 md:px-4 md:py-2 rounded-xl font-black text-[10px] md:text-xs tracking-tighter uppercase">
              {course?.code || "..."}
            </div>

            <h1 className="text-2xl md:text-5xl font-black text-gray-900 leading-tight pr-0 md:pr-40 tracking-tight">
              {course?.name || "Memuat.."}
            </h1>

            {/* stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2">
              <div className="p-4 bg-gray-50 rounded-2xl md:rounded-3xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Total SKS
                </p>
                <p className="text-xl md:text-2xl font-black text-gray-900">
                  {course?.sks || 0}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl md:rounded-3xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Kapasitas
                </p>
                <p className="text-xl md:text-2xl font-black text-gray-900">
                  {course?.capacity || 0}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl md:rounded-3xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Terisi
                </p>
                <p className="text-xl md:text-2xl font-black text-gray-900">
                  {course?.terisi || 0}
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-2xl md:rounded-3xl border border-yellow-100">
                <p className="text-[9px] font-black text-yellow-600 uppercase tracking-widest mb-1">
                  Sisa Kuota
                </p>
                <p className="text-xl md:text-2xl font-black text-yellow-700">
                  {course?.sisa_kuota || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* list mahasiswa */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2">
              <UserCheck size={20} className="text-[#f6db00]" />
              ENROLLED STUDENTS
              <span className="text-[10px] bg-gray-900 text-white px-2 py-1 rounded-lg">
                {students?.length || 0}
              </span>
            </h2>
          </div>

          {(students?.length || 0) === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 md:p-20 text-center border-2 border-dashed border-gray-200">
              <Users size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-xs md:text-sm font-bold text-gray-400 italic">
                Belum ada mahasiswa yang mendaftar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {students.map((student) => (
                <div
                  key={student.student_id}
                  className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f6db00] rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl">
                    {student.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm md:text-base truncate">
                      {student.username}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      Current SKS: {student.current_sks}
                    </p>
                  </div>
                  <div className="bg-green-50 px-2 py-1 rounded-full border border-green-100 shrink-0">
                    <span className="text-[8px] md:text-[10px] font-black text-green-600 uppercase italic">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={handleRefresh}
        courseData={course}
      />
    </div>
  );
}
