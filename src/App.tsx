
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth, AuthProvider } from "./hooks/useAuth";
import { AuthPage } from "./components/auth/AuthPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { UserDashboard } from "./components/dashboard/UserDashboard";
import { ClientsPage } from "./components/crm/ClientsPage";
import { ProjectsPage } from "./components/crm/ProjectsPage";
import { TasksPage } from "./components/crm/TasksPage";
import { ProposalsPage } from "./pages/ProposalsPage";
import { InvoicesPage } from "./pages/InvoicesPage";
import { TimeTrackingPage } from "./pages/TimeTrackingPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { AIAssistantPage } from "./pages/AIAssistantPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on auth errors
        if (error?.code === 'PGRST301' || error?.message?.includes('JWT')) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

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
          <Route path="proposals" element={<ProposalsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="time-tracking" element={<TimeTrackingPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="ai-assistant" element={<AIAssistantPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <AppContent />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
