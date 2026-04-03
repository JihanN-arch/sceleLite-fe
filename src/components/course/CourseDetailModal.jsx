import { useEffect, useState } from "react";
import { getCourseById, enrollCourse } from "../../services/course";
import { X, Users, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CourseDetailModal({
  isOpen,
  onClose,
  courseId,
  user,
  onRefresh,
}) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && courseId) {
      setLoading(true);
      const fetchDetail = async () => {
        try {
          const res = await getCourseById(courseId);
          setCourse(res.data?.data || res.data);
        } catch (err) {
          console.error("Fetch error:", err);
          toast.error("Gagal mengambil detail matkul");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    }
  }, [isOpen, courseId, onClose]);

  const handleEnroll = async () => {
    setSubmitting(true);
    try {
      await enrollCourse(courseId);
      toast.success("Berhasil enroll mata kuliah! 🎓");
      onRefresh();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal enroll");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md h-full">
      <div className="bg-white w-full max-w-lg rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* header */}
        <div className="relative h-28 md:h-32 bg-[#f6db00] p-6 md:p-8 flex items-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
          >
            <X size={18} className="md:w-5 md:h-5" />
          </button>
          <div className="bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl shadow-sm">
            <span className="font-black text-gray-900 text-xs md:text-sm tracking-tighter uppercase">
              {course?.code || "..."}
            </span>
          </div>
        </div>

        {loading || !course ? (
          <div className="p-16 md:p-20 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-[10px] font-black text-gray-400 mt-4 uppercase tracking-widest">
              Loading Detail...
            </p>
          </div>
        ) : (
          <div className="p-6 md:p-8 flex flex-col min-h-[300px] md:min-h-[340px]">
            <div className="flex-1 space-y-4 md:space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  {course.name}
                </h2>
                <p className="text-gray-500 text-sm md:text-base font-medium flex items-center gap-2 mt-1">
                  <Users size={14} className="md:w-4 md:h-4" /> Dosen:{" "}
                  <span className="text-gray-900 font-bold italic">
                    {course.nama_dosen}
                  </span>
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="bg-gray-50 p-3 md:p-4 rounded-2xl md:rounded-3xl text-center shadow-sm">
                  <p className="text-[8px] md:text-[10px] uppercase font-black text-gray-400">
                    SKS
                  </p>
                  <p className="text-lg md:text-xl font-black text-gray-900">
                    {course.sks}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 md:p-4 rounded-2xl md:rounded-3xl text-center shadow-sm">
                  <p className="text-[8px] md:text-[10px] uppercase font-black text-gray-400">
                    Terisi
                  </p>
                  <p className="text-lg md:text-xl font-black text-gray-900">
                    {course.terisi}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 md:p-4 rounded-2xl md:rounded-3xl text-center border-2 border-[#f6db00]/20 shadow-sm">
                  <p className="text-[8px] md:text-[10px] uppercase font-black text-[#d4bd00]">
                    Sisa
                  </p>
                  <p className="text-lg md:text-xl font-black text-gray-900">
                    {course.sisa_kuota}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-6 md:mt-8">
              {user?.role === "mahasiswa" && !course.is_enrolled && (
                <button
                  disabled={submitting || course.sisa_kuota <= 0}
                  onClick={handleEnroll}
                  className="w-full bg-gray-900 text-white font-black py-4 md:py-5 text-sm md:text-base rounded-2xl md:rounded-[1.5rem] hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                >
                  {submitting
                    ? "Processing..."
                    : course.sisa_kuota <= 0
                      ? "KUOTA PENUH"
                      : "ENROLL NOW"}
                </button>
              )}

              {user?.role === "mahasiswa" && !!course.is_enrolled && (
                <div className="flex items-center justify-center gap-2 md:gap-3 p-4 md:p-5 bg-green-50 text-green-700 rounded-2xl md:rounded-[1.5rem] border border-green-100">
                  <CheckCircle2 size={20} className="md:w-6 md:h-6" />
                  <span className="font-black italic uppercase text-xs md:text-sm">
                    You are enrolled
                  </span>
                </div>
              )}

              {user?.role === "dosen" && (
                <div className="p-3 md:p-4 text-center border-t border-gray-100 mt-2">
                  <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    Lecturer View Only
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
