
import React, { useState } from 'react';
import { Plus, Search, Calendar, DollarSign, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useProjects } from '@/hooks/useProjects';
import { CreateProjectDialog } from './CreateProjectDialog';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'on_hold': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { data: projects, isLoading } = useProjects();

  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cliento-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your client projects</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-cliento-blue hover:bg-cliento-blue/90">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects?.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="truncate">{project.name}</CardTitle>
                <Badge className={getStatusColor(project.status || 'draft')}>
                  {project.status?.replace('_', ' ') || 'draft'}
                </Badge>
              </div>
              {project.clients && (
                <p className="text-sm text-gray-600">{project.clients.name}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {project.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                {project.start_date && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Start: {new Date(project.start_date).toLocaleDateString()}</span>
                  </div>
                )}
                {project.end_date && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Due: {new Date(project.end_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {project.budget && (
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>Budget: ${project.budget.toLocaleString()}</span>
                </div>
              )}

              {project.assigned_to && project.assigned_to.length > 0 && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{project.assigned_to.length} team member{project.assigned_to.length !== 1 ? 's' : ''}</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-500">
                  Created {new Date(project.created_at).toLocaleDateString()}
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">Create your first project to get started</p>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-cliento-blue hover:bg-cliento-blue/90">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      )}

      <CreateProjectDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
};
