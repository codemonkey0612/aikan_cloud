import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Topbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="ml-64 flex-1 p-6 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

