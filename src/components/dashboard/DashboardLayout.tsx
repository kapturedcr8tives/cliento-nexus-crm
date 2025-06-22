
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  const { user, profile, organization, signOut, isAdmin, isSuperAdmin } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex h-screen bg-cliento-gray-50">
      <Sidebar
        isAdmin={isAdmin}
        currentSection=""
        onSectionChange={() => {}}
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
