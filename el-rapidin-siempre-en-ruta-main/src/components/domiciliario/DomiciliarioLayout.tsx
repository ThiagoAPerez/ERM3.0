import { Outlet } from "react-router-dom";
import DomiciliarioSidebar from "./DomiciliarioSidebar";
import DomiciliarioHeader from "./DomiciliarioHeader";

const DomiciliarioLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <DomiciliarioSidebar />
      <div className="flex-1 flex flex-col">
        <DomiciliarioHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DomiciliarioLayout;
