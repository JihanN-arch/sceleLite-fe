import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../../services/course";
import { unenrollCourse } from "../../services/enroll";
import {
  Users,
  BookOpen,
  ArrowLeft,
  Layout,
  FileText,
  LogOut,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ViewEnrolledCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await getCourseById(id);

        setCourse(res.data?.data || res.data);
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Gagal memuat detail mata kuliah");
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id, navigate]);

  const handleUnenroll = async () => {
    if (window.confirm("Apakah Anda yakin ingin membatalkan pendaftaran...?")) {
      try {
        await unenrollCourse(id);
        toast.success("Berhasil membatalkan pendaftaran");

        navigate("/home");
      } catch (err) {
        const message =
          err.response?.data?.message || "Gagal membatalkan pendaftaran";
        toast.error(message);
        console.error(err);
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center p-20 text-center animate-pulse font-black text-gray-400 tracking-widest text-xs uppercase">
        Loading Course Info...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-black text-gray-500 hover:text-black transition-colors text-xs md:text-sm tracking-widest"
        >
          <ArrowLeft size={18} />
          <span className="uppercase">Back to My Courses</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex justify-end mb-6 md:absolute md:top-8 md:right-8 md:mb-0">
            <button
              onClick={handleUnenroll}
              className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl md:rounded-2xl transition-all active:scale-95 font-black text-[9px] md:text-xs tracking-widest uppercase shadow-sm border border-red-100 w-full justify-center md:w-auto"
            >
              <LogOut size={14} className="md:w-[16px]" />
              <span>Drop Course</span>
            </button>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <div className="inline-block bg-[#f6db00] px-3 py-1 md:px-4 md:py-2 rounded-xl font-black text-[10px] md:text-xs tracking-tighter uppercase">
                {course?.code || "..."}
              </div>
              <div className="bg-green-50 text-green-600 px-3 py-1 rounded-xl font-black text-[10px] md:text-xs italic uppercase tracking-tighter border border-green-100">
                Active Student
              </div>
            </div>

            <h1 className="text-2xl md:text-5xl font-black text-gray-900 leading-tight pr-0 md:pr-40 tracking-tight">
              {course?.name || "Memuat.."}
            </h1>

            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center font-black text-white text-[10px]">
                {course?.nama_dosen?.charAt(0).toUpperCase()}
              </div>
              <p className="text-xs md:text-sm font-bold italic">
                Dosen Pengajar:{" "}
                <span className="text-gray-900">{course?.nama_dosen}</span>
              </p>
            </div>

            {/* stat */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-2">
              <div className="p-4 bg-gray-50 rounded-2xl md:rounded-3xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Mata Kuliah SKS
                </p>
                <p className="text-xl md:text-2xl font-black text-gray-900">
                  {course?.sks || 0}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl md:rounded-3xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Classmate
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xl md:text-2xl font-black text-gray-900">
                    {course?.terisi || 0}
                  </p>
                  <span className="text-[10px] text-gray-400 font-bold uppercase italic">
                    Enrolled
                  </span>
                </div>
              </div>
              <div className="hidden md:block p-4 bg-gray-900 rounded-3xl text-white">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Status Kehadiran
                </p>
                <p className="text-xl font-black italic">
                  100%{" "}
                  <span className="text-[10px] text-gray-500 font-medium">
                    Coming Soon
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* place holder untuk tugas or materi dkk */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg md:text-xl font-black text-gray-900 flex items-center gap-2">
              <Layout size={20} className="text-[#f6db00]" />
              COURSE MATERIALS & TASKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center space-y-3 opacity-60">
              <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-tight">
                  Assignment
                </h3>
                <p className="text-[10px] font-bold text-gray-400 italic mt-1">
                  Belum ada tugas yang dipublish oleh dosen.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center space-y-3 opacity-60">
              <div className="p-4 bg-yellow-50 text-yellow-600 rounded-2xl">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-tight">
                  Module & PDF
                </h3>
                <p className="text-[10px] font-bold text-gray-400 italic mt-1">
                  Materi perkuliahan akan muncul di sini.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center space-y-3 opacity-60">
              <div className="p-4 bg-purple-50 text-purple-500 rounded-2xl">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-tight">
                  Schedule
                </h3>
                <p className="text-[10px] font-bold text-gray-400 italic mt-1">
                  Jadwal ujian dan kuis (blm tersedia).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
