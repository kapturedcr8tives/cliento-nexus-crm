import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { AuthPage } from "./components/auth/AuthPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { UserDashboard } from "./components/dashboard/UserDashboard";
import { ClientsPage } from "./components/crm/ClientsPage";
import { ProjectsPage } from "./components/crm/ProjectsPage";
import { TasksPage } from "./components/crm/TasksPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cliento-blue"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return <AuthPage />;
  }

  const isAdmin = profile.role === 'admin' || profile.role === 'super_admin';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={isAdmin ? <AdminDashboard /> : <UserDashboard />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
