
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Outlet } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";

export function DashboardLayout() {
  const { user, profile, organization, signOut, isAdmin, loading } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cliento-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-cliento-blue mx-auto mb-4" />
          <p className="text-cliento-gray-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // Show error state if user is authenticated but missing profile/organization
  if (user && (!profile || !organization)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cliento-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <CardTitle>Setup Required</CardTitle>
            <CardDescription>
              Your account is being set up. Please refresh the page in a moment.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-cliento-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-cliento-gray-50">
      <Sidebar isAdmin={isAdmin} />
      
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
