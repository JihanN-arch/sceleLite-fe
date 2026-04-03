import { BookOpen, Users, Code, User, GraduationCap } from "lucide-react";

export default function CourseCard({ course, role, isAllCourse = false }) {
  const getButtonLabel = () => {
    if (role === "dosen") return "Manage Course";
    if (isAllCourse) return "See Details";
    return "Start Learning";
  };

  return (
    <div className="group border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-32 bg-gradient-to-r from-[#f6dB00] to-yellow-500 flex items-center justify-center">
        <BookOpen size={48} className="text-white opacity-50" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm">
          {course.code || "CS101"}
        </div>
      </div>

      {/* FOR MAIN DASHBOARD */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-14 md:text-lg font-bold text-gray-900 leading-tight group-hover:text-[#bca603] transition-colors">
            {course.name}
          </h3>
          <p className="text-xs  text-gray-500 mt-1 flex items-center gap-1">
            <Code size={12} /> {course.code}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-y border-gray-50 py-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
              SKS
            </span>
            <span className="text-sm font-semibold text-gray-700">
              {course.sks} SKS
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-tight">
              {role === "dosen" ? "Enrolled" : "Lecturer"}
            </span>
            <span className="text-sm font-bold text-gray-700 flex items-center gap-1 truncate">
              {role === "dosen" ? (
                <>
                  <Users size={14} className="text-blue-500" />
                  {course.total_pendaftar || 0}/{course.capacity}
                </>
              ) : (
                course.nama_dosen || "Lecturer"
              )}
            </span>
          </div>
        </div>

        {/* TAMBAHAN UNTUK ALL COURSES */}
        {isAllCourse && (
          <div className="flex justify-between items-center text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
            <span className="flex items-center gap-1">
              <Users size={14} /> Capacity: {course.capacity}
            </span>
            <span className="font-medium text-[#bca603]">Available</span>
          </div>
        )}

        <button className="w-full bg-gray-950 text-white py-2.5 rounded-xl text-xs md:text-sm font-semibold hover:bg-gray-800 transition-all  flex items-center justify-center gap-2">
          {role === "dosen" ? "Manage Course" : "View Course"}
        </button>
      </div>
    </div>
  );
}
