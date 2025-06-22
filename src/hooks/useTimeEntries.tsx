
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export const useTimeEntries = () => {
  const { profile } = useAuth();

  return useQuery({
    queryKey: ['time-entries', profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) throw new Error('No organization');
      
      const { data, error } = await supabase
        .from('time_entries')
        .select(`
          *,
          projects (
            id,
            name
          ),
          tasks (
            id,
            title
          )
        `)
        .eq('organization_id', profile.organization_id)
        .order('start_time', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!profile?.organization_id,
  });
};

export const useCreateTimeEntry = () => {
  const queryClient = useQueryClient();
  const { profile } = useAuth();

  return useMutation({
    mutationFn: async (timeEntryData: any) => {
      if (!profile?.organization_id) throw new Error('No organization');

      const { data, error } = await supabase
        .from('time_entries')
        .insert({
          ...timeEntryData,
          organization_id: profile.organization_id,
          user_id: profile.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['time-entries'] });
      toast({
        title: "Success",
        description: "Time entry created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create time entry",
        variant: "destructive",
      });
    },
  });
};
