
import { useAuth } from "@/hooks/useAuth";
import { AuthPage } from "@/components/auth/AuthPage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cliento-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cliento-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-heading font-bold">C</span>
          </div>
          <span className="text-cliento-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return <DashboardLayout />;
};

export default Index;
