import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/sidebars/AdminSidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* <Navbar /> */}

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
