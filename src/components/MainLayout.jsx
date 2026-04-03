import NavBar from "./navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <NavBar />

      <main className="flex-1 p-6 mt-16 md:mt-0 md:ml-64 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
