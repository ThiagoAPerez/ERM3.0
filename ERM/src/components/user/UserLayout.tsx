import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import Footer from "@/components/layout/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <UserHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
