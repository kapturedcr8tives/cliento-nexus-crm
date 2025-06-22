
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockTimeEntries = [
  {
    id: "1",
    project: "Website Redesign",
    client: "Tech Corp",
    task: "Frontend Development",
    duration: 240, // minutes
    startTime: "2023-12-15T09:00:00",
    endTime: "2023-12-15T13:00:00",
    billable: true
  },
  {
    id: "2",
    project: "Mobile App",
    client: "Startup Inc", 
    task: "UI Design",
    duration: 180,
    startTime: "2023-12-15T14:00:00",
    endTime: "2023-12-15T17:00:00",
    billable: true
  },
  {
    id: "3",
    project: "Internal",
    client: "Internal",
    task: "Team Meeting",
    duration: 60,
    startTime: "2023-12-15T10:00:00",
    endTime: "2023-12-15T11:00:00",
    billable: false
  }
];

export function TimeTrackingPage() {
  const [timeEntries] = useState(mockTimeEntries);
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState("");

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const totalBillableTime = timeEntries
    .filter(entry => entry.billable)
    .reduce((total, entry) => total + entry.duration, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time Tracking</h1>
          <p className="text-gray-600">Track time spent on projects and tasks</p>
        </div>
      </div>

      {/* Active Timer */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Current Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="What are you working on?"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex gap-2">
              {!isTracking ? (
                <Button 
                  onClick={() => setIsTracking(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => setIsTracking(false)}
                    variant="outline"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsTracking(false);
                      setCurrentTask("");
                    }}
                    variant="destructive"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}
            </div>
          </div>
          {isTracking && (
            <div className="mt-4 text-center">
              <div className="text-2xl font-mono font-bold text-blue-600">
                00:15:32
              </div>
              <div className="text-sm text-gray-500">Currently tracking</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(totalBillableTime)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(totalBillableTime)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeEntries.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
          <CardDescription>Your time tracking history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{entry.task}</div>
                  <div className="text-sm text-gray-500">
                    {entry.project} • {entry.client}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(entry.startTime).toLocaleTimeString()} - {new Date(entry.endTime).toLocaleTimeString()}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={entry.billable ? "default" : "secondary"}>
                    {entry.billable ? "Billable" : "Non-billable"}
                  </Badge>
                  <div className="font-mono font-medium">
                    {formatDuration(entry.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
