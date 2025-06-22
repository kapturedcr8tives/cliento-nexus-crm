
-- Add feature flags table for tenant management
CREATE TABLE public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  feature_name VARCHAR(100) NOT NULL,
  enabled BOOLEAN DEFAULT false,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(organization_id, feature_name)
);

-- Add client portal access for magic link authentication
CREATE TABLE public.client_portal_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  access_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  last_accessed TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add template marketplace
CREATE TABLE public.template_marketplace (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  template_type VARCHAR(50) NOT NULL, -- 'proposal', 'contract', 'invoice'
  template_content JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  is_public BOOLEAN DEFAULT false,
  tags TEXT[],
  usage_count INTEGER DEFAULT 0,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add communication history
CREATE TABLE public.communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  type VARCHAR(50) NOT NULL, -- 'email', 'call', 'meeting', 'note'
  subject VARCHAR(255),
  content TEXT,
  direction VARCHAR(20), -- 'inbound', 'outbound'
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add activity logs for admin portal
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- 'client', 'project', 'invoice', etc.
  entity_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add usage analytics
CREATE TABLE public.usage_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC,
  metadata JSONB DEFAULT '{}',
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Add AI insights and predictions
CREATE TABLE public.ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL, -- 'lead', 'project', 'client'
  entity_id UUID NOT NULL,
  insight_type VARCHAR(50) NOT NULL, -- 'lead_score', 'risk_prediction', 'recommendation'
  insight_data JSONB NOT NULL,
  confidence_score NUMERIC(3,2), -- 0.00 to 1.00
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add subtasks for enhanced task management
CREATE TABLE public.subtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  parent_task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status task_status DEFAULT 'todo',
  assigned_to UUID REFERENCES auth.users(id),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add task dependencies
CREATE TABLE public.task_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  depends_on_task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  dependency_type VARCHAR(50) DEFAULT 'finish_to_start', -- 'finish_to_start', 'start_to_start', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(task_id, depends_on_task_id)
);

-- Add project templates
CREATE TABLE public.project_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template_data JSONB NOT NULL, -- Contains tasks, phases, etc.
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add contract versions for version history
CREATE TABLE public.contract_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'active', 'expired', 'terminated'
  signed_by_client_at TIMESTAMP WITH TIME ZONE,
  signed_by_provider_at TIMESTAMP WITH TIME ZONE,
  expires_at DATE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add offline sync queue for PWA support
CREATE TABLE public.offline_sync_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete'
  data JSONB NOT NULL,
  sync_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'synced', 'failed'
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  synced_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX idx_feature_flags_org_feature ON public.feature_flags(organization_id, feature_name);
CREATE INDEX idx_client_portal_access_token ON public.client_portal_access(access_token);
CREATE INDEX idx_client_portal_access_expires ON public.client_portal_access(expires_at);
CREATE INDEX idx_template_marketplace_org_type ON public.template_marketplace(organization_id, template_type);
CREATE INDEX idx_template_marketplace_status ON public.template_marketplace(status);
CREATE INDEX idx_communications_client_id ON public.communications(client_id);
CREATE INDEX idx_communications_lead_id ON public.communications(lead_id);
CREATE INDEX idx_communications_date ON public.communications(created_at);
CREATE INDEX idx_activity_logs_org_user ON public.activity_logs(organization_id, user_id);
CREATE INDEX idx_activity_logs_date ON public.activity_logs(created_at);
CREATE INDEX idx_usage_analytics_org_date ON public.usage_analytics(organization_id, date);
CREATE INDEX idx_usage_analytics_metric ON public.usage_analytics(metric_name);
CREATE INDEX idx_ai_insights_entity ON public.ai_insights(entity_type, entity_id);
CREATE INDEX idx_ai_insights_type ON public.ai_insights(insight_type);
CREATE INDEX idx_ai_insights_expires ON public.ai_insights(expires_at);
CREATE INDEX idx_subtasks_parent ON public.subtasks(parent_task_id);
CREATE INDEX idx_task_dependencies_task ON public.task_dependencies(task_id);
CREATE INDEX idx_contract_versions_client ON public.contract_versions(client_id);
CREATE INDEX idx_offline_sync_user_status ON public.offline_sync_queue(user_id, sync_status);

-- Enable RLS on all new tables
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_portal_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_marketplace ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offline_sync_queue ENABLE ROW LEVEL SECURITY;

-- RLS Policies for new tables
CREATE POLICY "Organization members can access their feature flags" ON public.feature_flags
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organization members can access their client portal data" ON public.client_portal_access
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organization members can access their templates" ON public.template_marketplace
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    ) OR is_public = true
  );

CREATE POLICY "Organization members can access their communications" ON public.communications
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organization members can access their activity logs" ON public.activity_logs
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    ) OR organization_id IS NULL
  );

CREATE POLICY "Organization members can access their usage analytics" ON public.usage_analytics
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organization members can access their AI insights" ON public.ai_insights
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organization members can access their subtasks" ON public.subtasks
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organization members can access their task dependencies" ON public.task_dependencies
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Organization members can access their project templates" ON public.project_templates
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    ) OR is_public = true
  );

CREATE POLICY "Organization members can access their contract versions" ON public.contract_versions
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can access their own offline sync queue" ON public.offline_sync_queue
  FOR ALL USING (
    user_id = auth.uid() AND organization_id IN (
      SELECT organization_id FROM public.profiles 
      WHERE id = auth.uid()
    )
  );

-- Add updated_at triggers to new tables
CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON public.feature_flags FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_template_marketplace_updated_at BEFORE UPDATE ON public.template_marketplace FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ai_insights_updated_at BEFORE UPDATE ON public.ai_insights FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subtasks_updated_at BEFORE UPDATE ON public.subtasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_project_templates_updated_at BEFORE UPDATE ON public.project_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contract_versions_updated_at BEFORE UPDATE ON public.contract_versions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add some default feature flags for new organizations
INSERT INTO public.feature_flags (organization_id, feature_name, enabled) 
SELECT id, 'time_tracking', true FROM public.organizations;

INSERT INTO public.feature_flags (organization_id, feature_name, enabled) 
SELECT id, 'ai_features', true FROM public.organizations;

INSERT INTO public.feature_flags (organization_id, feature_name, enabled) 
SELECT id, 'client_portal', true FROM public.organizations;

INSERT INTO public.feature_flags (organization_id, feature_name, enabled) 
SELECT id, 'template_marketplace', false FROM public.organizations;
