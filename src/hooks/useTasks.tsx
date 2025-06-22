
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export const useTasks = (projectId?: string) => {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ['tasks', profile?.organization_id, projectId],
    queryFn: async () => {
      if (!profile?.organization_id) throw new Error('No organization');
      
      let query = supabase
        .from('tasks')
        .select(`
          *,
          projects (
            id,
            name
          ),
          clients (
            id,
            name
          ),
          subtasks (
            id,
            title,
            status,
            completed_at
          )
        `)
        .eq('organization_id', profile.organization_id);

      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!profile?.organization_id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  return useMutation({
    mutationFn: async (taskData: any) => {
      if (!profile?.organization_id) throw new Error('No organization');

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...taskData,
          organization_id: profile.organization_id,
          created_by: profile.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const updateData: any = { status };
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: "Success",
        description: "Task status updated",
      });
    },
  });
};
