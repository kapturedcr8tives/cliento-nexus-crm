
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckSquare, 
  Clock, 
  Calendar, 
  Plus,
  AlertCircle,
  User,
  FolderOpen
} from "lucide-react";

const recentTasks = [
  {
    id: 1,
    title: "Update client proposal",
    project: "Website Redesign",
    client: "Acme Corp",
    priority: "high",
    dueDate: "2024-01-15",
    status: "in_progress"
  },
  {
    id: 2,
    title: "Review contract terms",
    project: "Mobile App Development",
    client: "TechStart Inc",
    priority: "medium",
    dueDate: "2024-01-16",
    status: "todo"
  },
  {
    id: 3,
    title: "Client meeting preparation",
    project: "Brand Identity",
    client: "Creative Studio",
    priority: "high",
    dueDate: "2024-01-14",
    status: "todo"
  }
];

const upcomingMeetings = [
  {
    id: 1,
    title: "Project Kickoff - Acme Corp",
    time: "10:00 AM",
    date: "Today",
    type: "meeting"
  },
  {
    id: 2,
    title: "Design Review - TechStart",
    time: "2:30 PM",
    date: "Tomorrow",
    type: "review"
  },
  {
    id: 3,
    title: "Client Check-in - Creative Studio",
    time: "11:00 AM",
    date: "Jan 16",
    type: "meeting"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "destructive";
    case "medium": return "secondary";
    case "low": return "outline";
    default: return "secondary";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "default";
    case "in_progress": return "secondary";
    case "todo": return "outline";
    default: return "outline";
  }
};

export function UserDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-cliento-gray-900">
            Welcome back!
          </h1>
          <p className="text-cliento-gray-600 mt-2">
            Here's what's happening with your projects today.
          </p>
        </div>
        <Button className="bg-cliento-blue hover:bg-cliento-blue-dark">
          <Plus className="mr-2 h-4 w-4" />
          Quick Add
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="My Tasks"
          value="8"
          change="3 due today"
          trend="neutral"
          icon={CheckSquare}
          color="blue"
        />
        <MetricCard
          title="Active Projects"
          value="5"
          change="2 updated"
          trend="up"
          icon={FolderOpen}
          color="green"
        />
        <MetricCard
          title="Hours This Week"
          value="32.5"
          change="+4.2h"
          trend="up"
          icon={Clock}
          color="purple"
        />
        <MetricCard
          title="My Clients"
          value="12"
          change="1 new"
          trend="up"
          icon={User}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
              <CardDescription>Your latest assignments and priorities</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-cliento-gray-500">
                    {task.project} • {task.client}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="h-3 w-3 text-cliento-gray-400" />
                    <span className="text-xs text-cliento-gray-500">
                      Due {task.dueDate}
                    </span>
                    <Badge variant={getStatusColor(task.status)} className="text-xs">
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <CheckSquare className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-semibold">Upcoming Schedule</CardTitle>
              <CardDescription>Your meetings and deadlines</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View Calendar
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-cliento-blue rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{meeting.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-cliento-gray-400" />
                    <span className="text-xs text-cliento-gray-500">
                      {meeting.time} • {meeting.date}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <AlertCircle className="h-4 w-4 text-cliento-gray-400" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <Plus className="h-5 w-5 mb-2" />
              <span className="text-sm">New Task</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Clock className="h-5 w-5 mb-2" />
              <span className="text-sm">Track Time</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <User className="h-5 w-5 mb-2" />
              <span className="text-sm">Add Client</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <FolderOpen className="h-5 w-5 mb-2" />
              <span className="text-sm">New Project</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
