
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, Clock, Target, Calendar } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { useProjects } from "@/hooks/useProjects";
import { useInvoices } from "@/hooks/useInvoices";
import { useTimeEntries } from "@/hooks/useTimeEntries";
import { useMemo } from "react";

export function AnalyticsPage() {
  const { data: clients } = useClients();
  const { data: projects } = useProjects();
  const { data: invoices } = useInvoices();
  const { data: timeEntries } = useTimeEntries();

  const analytics = useMemo(() => {
    if (!clients || !projects || !invoices || !timeEntries) {
      return {
        totalRevenue: 0,
        activeClients: 0,
        hoursTracked: 0,
        conversionRate: 0,
        revenueData: [],
        projectStatusData: [],
        clientAcquisitionData: []
      };
    }

    // Calculate total revenue from paid invoices
    const totalRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

    // Count active clients (clients with projects or recent invoices)
    const activeClients = clients.filter(client => {
      const hasActiveProjects = projects.some(p => p.client_id === client.id && p.status === 'active');
      const hasRecentInvoices = invoices.some(inv => 
        inv.client_id === client.id && 
        new Date(inv.created_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      );
      return hasActiveProjects || hasRecentInvoices;
    }).length;

    // Calculate total hours tracked
    const hoursTracked = timeEntries.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);

    // Generate revenue data for last 6 months
    const revenueData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'short' });
      
      const monthRevenue = invoices
        .filter(inv => {
          const invDate = new Date(inv.created_at);
          return invDate.getMonth() === date.getMonth() && 
                 invDate.getFullYear() === date.getFullYear() &&
                 inv.status === 'paid';
        })
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

      const monthClients = new Set(invoices
        .filter(inv => {
          const invDate = new Date(inv.created_at);
          return invDate.getMonth() === date.getMonth() && 
                 invDate.getFullYear() === date.getFullYear();
        })
        .map(inv => inv.client_id)).size;

      revenueData.push({
        month: monthName,
        revenue: monthRevenue,
        clients: monthClients
      });
    }

    // Project status distribution
    const statusCounts = projects.reduce((acc, project) => {
      const status = project.status || 'draft';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const projectStatusData = [
      { name: 'Active', value: statusCounts.active || 0, color: '#22c55e' },
      { name: 'Completed', value: statusCounts.completed || 0, color: '#3b82f6' },
      { name: 'On Hold', value: statusCounts.on_hold || 0, color: '#f59e0b' },
      { name: 'Cancelled', value: statusCounts.cancelled || 0, color: '#ef4444' },
      { name: 'Draft', value: statusCounts.draft || 0, color: '#6b7280' }
    ].filter(item => item.value > 0);

    // Client acquisition data (simplified)
    const clientAcquisitionData = revenueData.map(item => ({
      month: item.month,
      new: Math.max(1, Math.floor(item.clients * 0.3)),
      returning: Math.max(0, item.clients - Math.floor(item.clients * 0.3))
    }));

    const conversionRate = projects.length > 0 ? 
      Math.round((projects.filter(p => p.status === 'completed').length / projects.length) * 100) : 0;

    return {
      totalRevenue,
      activeClients,
      hoursTracked: Math.round(hoursTracked / 60), // Convert to hours
      conversionRate,
      revenueData,
      projectStatusData,
      clientAcquisitionData
    };
  }, [clients, projects, invoices, timeEntries]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Business intelligence and performance insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From paid invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.activeClients}</div>
            <p className="text-xs text-muted-foreground">
              With recent activity
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.hoursTracked}</div>
            <p className="text-xs text-muted-foreground">
              Total time logged
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Projects completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue from paid invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current project distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.projectStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {analytics.projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Activity</CardTitle>
            <CardDescription>Monthly client engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.clientAcquisitionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new" fill="#22c55e" name="New Clients" />
                <Bar dataKey="returning" fill="#3b82f6" name="Returning Clients" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key business metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Average Project Value</span>
              <span className="font-bold">
                ${projects?.length ? Math.round(analytics.totalRevenue / projects.length).toLocaleString() : '0'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Projects</span>
              <span className="font-bold text-green-600">
                {projects?.filter(p => p.status === 'active').length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending Invoices</span>
              <span className="font-bold">
                {invoices?.filter(inv => inv.status === 'sent' || inv.status === 'pending').length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Projects</span>
              <span className="font-bold">{projects?.length || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
