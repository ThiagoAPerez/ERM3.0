import { Outlet, Navigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import UserHeader from "@/components/user/UserHeader"; // 👈 ESTE ES EL BUENO

const UserLayout = () => {
  const { loading, isAuthenticated } = useSession();

  if (loading) {
    return null; // luego spinner si quieres
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <UserHeader />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
