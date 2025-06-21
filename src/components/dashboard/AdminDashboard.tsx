
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, FileText, Clock } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 12000, clients: 15 },
  { month: "Feb", revenue: 15000, clients: 18 },
  { month: "Mar", revenue: 18000, clients: 22 },
  { month: "Apr", revenue: 22000, clients: 28 },
  { month: "May", revenue: 19000, clients: 25 },
  { month: "Jun", revenue: 25000, clients: 32 }
];

const projectStatusData = [
  { name: "Active", value: 12, color: "#3B82F6" },
  { name: "Completed", value: 8, color: "#10B981" },
  { name: "On Hold", value: 3, color: "#F59E0B" },
  { name: "Cancelled", value: 1, color: "#EF4444" }
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold text-cliento-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-cliento-gray-600 mt-2">
          Overview of your organization's performance and metrics.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$125,430"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Active Clients"
          value="32"
          change="+3"
          trend="up"
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Active Projects"
          value="12"
          change="+2"
          trend="up"
          icon={FileText}
          color="purple"
        />
        <MetricCard
          title="Hours Tracked"
          value="1,248"
          change="+156"
          trend="up"
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-cliento-blue" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current status of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Client Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Client Growth</CardTitle>
          <CardDescription>Number of clients acquired over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clients" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
