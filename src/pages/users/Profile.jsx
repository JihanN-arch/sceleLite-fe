import { useEffect, useState } from "react";
import { getProfile } from "../../services/user";
import { User, Shield, Book, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        toast.error("Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center animate-pulse font-black text-gray-400">
        LOADING PROFILE...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* profile card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f6db00] rounded-full opacity-10" />

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
              <User size={40} />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                {user?.username}
              </h1>
              <div className="inline-block bg-gray-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {user?.role}
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-4 pt-6">
              {/* ID info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="p-3 bg-white rounded-xl shadow-sm text-gray-400">
                  <Shield size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    User ID
                  </p>
                  <p className="font-bold text-gray-900">#{user?.id}</p>
                </div>
              </div>

              {/* SKS section hanya untuk mahasiswa */}
              {user?.role === "mahasiswa" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-yellow-600">
                      <Book size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-black text-yellow-700/50 uppercase tracking-widest">
                        SKS Current
                      </p>
                      <p className="font-black text-yellow-700 text-xl">
                        {user?.current_sks}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-green-600">
                      <Star size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-black text-green-700/50 uppercase tracking-widest">
                        Max SKS
                      </p>
                      <p className="font-black text-green-700 text-xl">
                        {user?.max_sks}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
