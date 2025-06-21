
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const { toast } = useToast();

  const handleLogin = (email: string, password: string, adminMode: boolean = false) => {
    // Mock authentication - in real app, this would call an API
    console.log(`Login attempt: ${email}, Admin: ${adminMode}`);
    
    setIsAuthenticated(true);
    setIsAdmin(adminMode);
    
    toast({
      title: "Welcome to Cliento!",
      description: `Logged in as ${adminMode ? "Administrator" : "User"}`,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentSection("dashboard");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    
    // Mock section changes - in real app, this would handle routing
    if (section !== "dashboard") {
      toast({
        title: "Coming Soon",
        description: `${section.charAt(0).toUpperCase() + section.slice(1)} section is under development.`,
      });
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-cliento-gray-50">
      <Sidebar
        isAdmin={isAdmin}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isAdmin={isAdmin} onLogout={handleLogout} />
        
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
};

export default Index;
