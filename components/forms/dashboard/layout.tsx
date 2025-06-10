
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { Outlet } from "react-router-dom";
import { MobileNav } from "./mobile-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import { DashboardHeader } from "./header";

export const DashboardLayout = () => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        {!isMobile && <SidebarNav />}
        <main className="flex flex-1 flex-col overflow-hidden">
          <MobileNav />
          {!isMobile && <DashboardHeader />}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
