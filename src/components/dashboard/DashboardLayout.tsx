
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function DashboardLayout() {
  const { user, profile, organization, signOut, isAdmin, isSuperAdmin } = useAuth();
  const [currentSection, setCurrentSection] = useState("dashboard");
  const { toast } = useToast();

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    
    if (section !== "dashboard") {
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
          {currentSection === "dashboard" && (
            isAdmin ? <AdminDashboard /> : <UserDashboard />
          )}
          
          {currentSection !== "dashboard" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold font-heading text-cliento-gray-900 mb-2">
                  {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                </h2>
                <p className="text-cliento-gray-600">
                  This section is currently under development.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
