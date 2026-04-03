import { useState, useEffect } from "react";
import { createCourse, updateCourse } from "../../services/course";
import { X } from "lucide-react";
import toast from "react-hot-toast";

// note: ini course modalnya untuk create or edit, sorry nama filenya ambigu
// i malas rapihin
export default function CourseModal({
  isOpen,
  onClose,
  onRefresh,
  courseData = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    sks: "",
    capacity: "",
  });
  const [loading, setLoading] = useState(false);

  // klo edit prefill
  useEffect(() => {
    if (courseData) {
      setFormData({
        name: courseData.name || "",
        code: courseData.code || "",
        sks: courseData.sks || "",
        capacity: courseData.capacity || "",
      });
    } else {
      setFormData({ name: "", code: "", sks: "", capacity: "" });
    }
  }, [courseData, isOpen]);

  if (!isOpen) return null;

  const isEdit = !!courseData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      code: formData.code,
      sks: parseInt(formData.sks),
      capacity: parseInt(formData.capacity),
    };

    try {
      if (isEdit) {
        await updateCourse(courseData.id, payload);
        toast.success("Berhasil Update!");
      } else {
        await createCourse(payload);
        toast.success("Berhasil Buat Matkul!");
      }
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Full Error Object:", err);
      toast.error(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[95vh] flex flex-col">
        <div className="p-5 sm:p-6 border-b border-black/5 flex justify-between items-center bg-[#f6db00] shrink-0">
          <h2 className="text-base sm:text-lg md:text-xl font-black text-gray-900 uppercase tracking-tighter">
            {isEdit ? "Edit Mata Kuliah" : "Buat Kelas Baru"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-8 space-y-4 overflow-y-auto custom-scrollbar"
        >
          <div>
            <label className="block text-[10px] sm:text-xs font-black text-gray-400 uppercase mb-1 ml-1">
              Nama Mata Kuliah
            </label>
            <input
              required
              type="text"
              value={formData.name}
              className="w-full px-4 py-3 sm:py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#f6db00] outline-none font-bold text-sm sm:text-base placeholder:text-gray-300"
              placeholder="ex: Kalkulus 2"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[10px] sm:text-xs font-black text-gray-400 uppercase mb-1 ml-1">
                Kode Matkul
              </label>
              <input
                required
                type="text"
                value={formData.code}
                className="w-full px-4 py-3 sm:py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#f6db00] outline-none font-bold text-sm sm:text-base placeholder:text-gray-300"
                placeholder="CLC2"
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-black text-gray-400 uppercase mb-1 ml-1">
                SKS
              </label>
              <input
                required
                type="number"
                value={formData.sks}
                className="w-full px-4 py-3 sm:py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#f6db00] outline-none font-bold text-sm sm:text-base placeholder:text-gray-300"
                placeholder="3"
                onChange={(e) =>
                  setFormData({ ...formData, sks: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-black text-gray-400 uppercase mb-1 ml-1">
              Kapasitas Mahasiswa
            </label>
            <input
              required
              type="number"
              value={formData.capacity}
              className="w-full px-4 py-3 sm:py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#f6db00] outline-none font-bold text-sm sm:text-base placeholder:text-gray-300"
              placeholder="40"
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white text-xs sm:text-sm font-black py-4 sm:py-5 rounded-2xl hover:bg-black transition-all disabled:opacity-50 mt-4 active:scale-95 shadow-lg shadow-gray-200"
          >
            {loading
              ? "MENYIMPAN..."
              : isEdit
                ? "UPDATE MATA KULIAH"
                : "SIMPAN MATA KULIAH"}
          </button>
        </form>
      </div>
    </div>
  );
}
