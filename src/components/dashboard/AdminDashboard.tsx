
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Building, DollarSign, Activity, TrendingUp } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading text-cliento-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-cliento-gray-600 mt-1">
          Manage your CRM tenants and monitor system performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Tenants"
          value="1,234"
          change="+12% from last month"
          changeType="positive"
          icon={<Building className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Users"
          value="8,432"
          change="+8% from last month"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Monthly Revenue"
          value="$45,231"
          change="+15% from last month"
          changeType="positive"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="System Health"
          value="99.9%"
          change="Excellent"
          changeType="positive"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-cliento-blue" />
              Tenant Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Free Tier</span>
                <span className="text-sm text-cliento-gray-500">852 tenants</span>
              </div>
              <Progress value={68} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pro Tier</span>
                <span className="text-sm text-cliento-gray-500">298 tenants</span>
              </div>
              <Progress value={45} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Enterprise</span>
                <span className="text-sm text-cliento-gray-500">84 tenants</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New tenant registered</p>
                  <p className="text-xs text-cliento-gray-500">Acme Corp - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cliento-blue rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Subscription upgraded</p>
                  <p className="text-xs text-cliento-gray-500">TechStart Inc - 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment failed</p>
                  <p className="text-xs text-cliento-gray-500">Design Studio - 3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New integration activated</p>
                  <p className="text-xs text-cliento-gray-500">Marketing Agency - 5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
