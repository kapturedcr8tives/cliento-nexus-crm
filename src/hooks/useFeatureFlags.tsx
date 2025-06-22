
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useFeatureFlags = () => {
  const { user, profile } = useAuth();

  return useQuery({
    queryKey: ['feature-flags', profile?.organization_id],
    queryFn: async () => {
      if (!profile?.organization_id) throw new Error('No organization');
      
      const { data, error } = await supabase
        .from('feature_flags')
        .select('*')
        .eq('organization_id', profile.organization_id);

      if (error) throw error;
      return data;
    },
    enabled: !!profile?.organization_id,
  });
};

export const useFeatureFlag = (featureName: string): boolean => {
  const { data: flags } = useFeatureFlags();
  const flag = flags?.find(f => f.feature_name === featureName);
  return flag?.enabled ?? false;
};
