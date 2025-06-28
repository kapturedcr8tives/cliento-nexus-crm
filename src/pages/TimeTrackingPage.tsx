
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, Square, Clock, Calendar, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTimeEntries, useCreateTimeEntry, useUpdateTimeEntry } from "@/hooks/useTimeEntries";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";

export function TimeTrackingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const { data: timeEntries, isLoading } = useTimeEntries();
  const { data: projects } = useProjects();
  const { data: tasks } = useTasks();
  const { mutate: createTimeEntry } = useCreateTimeEntry();
  const { mutate: updateTimeEntry } = useUpdateTimeEntry();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const startTimer = () => {
    const now = new Date();
    setStartTime(now);
    setIsTracking(true);
    setElapsedTime(0);
  };

  const stopTimer = () => {
    if (startTime && currentTask.trim()) {
      const endTime = new Date();
      const durationMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);
      
      createTimeEntry({
        description: currentTask,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration_minutes: durationMinutes,
        project_id: selectedProject || null,
        task_id: selectedTaskId || null,
        billable: true,
      });
    }
    
    setIsTracking(false);
    setStartTime(null);
    setElapsedTime(0);
    setCurrentTask("");
    setSelectedProject("");
    setSelectedTaskId("");
  };

  const pauseTimer = () => {
    setIsTracking(false);
  };

  const resumeTimer = () => {
    if (startTime) {
      // Adjust start time to account for paused duration
      const pausedDuration = Date.now() - startTime.getTime() - (elapsedTime * 1000);
      setStartTime(new Date(Date.now() - (elapsedTime * 1000)));
      setIsTracking(true);
    }
  };

  const filteredTimeEntries = timeEntries?.filter(entry =>
    entry.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.projects?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todaysEntries = filteredTimeEntries?.filter(entry => {
    const entryDate = new Date(entry.start_time).toDateString();
    const today = new Date().toDateString();
    return entryDate === today;
  });

  const totalTodayTime = todaysEntries?.reduce((total, entry) => total + (entry.duration_minutes || 0), 0) || 0;
  const totalBillableTime = todaysEntries?.filter(entry => entry.billable).reduce((total, entry) => total + (entry.duration_minutes || 0), 0) || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cliento-blue"></div>
      </div>
    );
  }

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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="What are you working on?"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
              />
              
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects?.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  {tasks?.filter(task => !selectedProject || task.project_id === selectedProject).map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {!isTracking && !startTime ? (
                  <Button 
                    onClick={startTimer}
                    disabled={!currentTask.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <>
                    {isTracking ? (
                      <Button onClick={pauseTimer} variant="outline">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button onClick={resumeTimer} className="bg-green-600 hover:bg-green-700">
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    )}
                    <Button onClick={stopTimer} variant="destructive">
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
              </div>
              
              {(isTracking || startTime) && (
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-blue-600">
                    {formatTime(elapsedTime)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {isTracking ? 'Currently tracking' : 'Paused'}
                  </div>
                </div>
              )}
            </div>
          </div>
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
            <div className="text-2xl font-bold">{formatDuration(totalTodayTime)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billable Hours Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(totalBillableTime)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entries Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysEntries?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Entries</CardTitle>
              <CardDescription>Your time tracking history</CardDescription>
            </div>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTimeEntries?.slice(0, 10).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{entry.description || 'No description'}</div>
                  <div className="text-sm text-gray-500">
                    {entry.projects?.name && `${entry.projects.name} • `}
                    {entry.tasks?.title && `${entry.tasks.title} • `}
                    {new Date(entry.start_time).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(entry.start_time).toLocaleTimeString()} - {entry.end_time ? new Date(entry.end_time).toLocaleTimeString() : 'In progress'}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={entry.billable ? "default" : "secondary"}>
                    {entry.billable ? "Billable" : "Non-billable"}
                  </Badge>
                  <div className="font-mono font-medium">
                    {formatDuration(entry.duration_minutes || 0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTimeEntries?.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No time entries found</h3>
              <p className="text-gray-600">Start tracking time to see your entries here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
