import { SidebarProvider } from "@/components/ui/sidebar";
import { DasbhboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSideBar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <DashboardSideBar />
        <main className="flex-1 overflow-auto bg-muted">
          <DasbhboardNavbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
