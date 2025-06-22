
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { ClientsPage } from "@/components/crm/ClientsPage";
import { ProjectsPage } from "@/components/crm/ProjectsPage";
import { TasksPage } from "@/components/crm/TasksPage";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  const { user, profile, organization, signOut, isAdmin, isSuperAdmin } = useAuth();
  const [currentSection, setCurrentSection] = useState("dashboard");
  const { toast } = useToast();
  const location = useLocation();

  // Update current section based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCurrentSection("dashboard");
    } else if (path.startsWith("/clients")) {
      setCurrentSection("clients");
    } else if (path.startsWith("/projects")) {
      setCurrentSection("projects");
    } else if (path.startsWith("/tasks")) {
      setCurrentSection("tasks");
    } else {
      // Extract section from path
      const section = path.substring(1) || "dashboard";
      setCurrentSection(section);
    }
  }, [location.pathname]);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    
    // Show toast for sections that aren't fully implemented yet
    const implementedSections = ["dashboard", "clients", "projects", "tasks"];
    if (!implementedSections.includes(section)) {
      toast({
        title: "Coming Soon",
        description: `${section.charAt(0).toUpperCase() + section.slice(1)} section is under development.`,
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex h-screen bg-cliento-gray-50">
      <Sidebar
        isAdmin={isAdmin}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          isAdmin={isAdmin} 
          onLogout={handleLogout}
          user={user}
          profile={profile}
          organization={organization}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
