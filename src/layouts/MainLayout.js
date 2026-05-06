import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* <Navbar /> */}

      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
