import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  BookOpen,
  Users,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    {
      name: "My Dashboard",
      path: "/home",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Profile",
      path: "/me",
      icon: <User size={20} />,
    },
    {
      name: "All Courses",
      path: "/courses",
      icon: <BookOpen size={20} />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-gray-200 flex items-center px-4 z-40 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-100 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 font-black tracking-tighter text-xl text-[#f6dB00]">
          SCELELITE
        </h1>
      </div>

      {/* LOGIC BUAT MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-black border-r border-gray-200 flex flex-col shadow-sm z-50 transition-transform duration-300 ease-in-out transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="md:hidden absolute right-4 top-4">
          <button
            onClick={toggleSidebar}
            className="p-2 text-white hover:text-gray-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Teks logo */}
        <div className="p-8 mb-2">
          <h1 className="text-2xl font-black tracking-tighter text-[#f6dB00]">
            SCELELITE
          </h1>
          <div className="h-1 w-12 bg-[#f6dB00] mt-1 rounded-full"></div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">
            Made by JN :D
          </p>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#f6dB00] text-gray-950 shadow-md shadow-[#f6dB00]/20"
                    : "text-white hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span
                  className={`${isActive ? "text-gray-950" : "text-gray-400"}`}
                >
                  {item.icon}
                </span>
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
