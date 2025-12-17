import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="w-full min-h-screen bg-linear-to-br from-[#FFF7E8] to-[#FFFFFF] flex items-center justify-center">
      <Outlet />
    </main>
  );
};
