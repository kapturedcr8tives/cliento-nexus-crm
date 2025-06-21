
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, FolderOpen, DollarSign, Clock, Plus, CheckCircle, AlertCircle } from "lucide-react";

export function UserDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading text-cliento-gray-900">
            Welcome back, John!
          </h1>
          <p className="text-cliento-gray-600 mt-1">
            Here's what's happening with your business today
          </p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-cliento-blue hover:bg-cliento-blue-dark">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Clients"
          value="24"
          change="+3 this month"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Projects"
          value="12"
          change="2 due this week"
          changeType="neutral"
          icon={<FolderOpen className="h-4 w-4" />}
        />
        <MetricCard
          title="Monthly Revenue"
          value="$8,450"
          change="+23% from last month"
          changeType="positive"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Hours Tracked"
          value="156h"
          change="This month"
          changeType="neutral"
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-cliento-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Website Redesign</p>
                    <p className="text-sm text-cliento-gray-500">Acme Corporation</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$3,200</p>
                  <p className="text-xs text-cliento-gray-500">Due in 5 days</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-cliento-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Mobile App Development</p>
                    <p className="text-sm text-cliento-gray-500">TechStart Inc</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$8,500</p>
                  <p className="text-xs text-cliento-gray-500">Due in 12 days</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-cliento-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cliento-blue rounded-full"></div>
                  <div>
                    <p className="font-medium">Brand Identity</p>
                    <p className="text-sm text-cliento-gray-500">Creative Studio</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$1,800</p>
                  <p className="text-xs text-cliento-gray-500">Due in 3 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Complete wireframes</p>
                  <p className="text-xs text-cliento-gray-500">Website Redesign - Completed</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Client presentation</p>
                  <p className="text-xs text-cliento-gray-500">Due tomorrow</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 border-2 border-cliento-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Code review</p>
                  <p className="text-xs text-cliento-gray-500">Mobile App - Pending</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 border-2 border-cliento-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Send invoice</p>
                  <p className="text-xs text-cliento-gray-500">Brand Identity - Due today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-heading text-cliento-gray-900">85%</div>
              <div className="text-sm text-cliento-gray-600">Project Completion Rate</div>
              <Progress value={85} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-heading text-cliento-gray-900">92%</div>
              <div className="text-sm text-cliento-gray-600">Client Satisfaction</div>
              <Progress value={92} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-heading text-cliento-gray-900">$12,450</div>
              <div className="text-sm text-cliento-gray-600">Revenue Goal</div>
              <Progress value={68} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
