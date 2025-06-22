
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  CheckSquare, 
  FileText, 
  DollarSign, 
  Clock,
  BarChart3,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SidebarProps {
  isAdmin: boolean;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isAdmin }) => {
  const { profile } = useAuth();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/',
      key: 'dashboard',
      roles: ['admin', 'super_admin', 'manager', 'member']
    },
    {
      label: 'Clients',
      icon: Users,
      href: '/clients',
      key: 'clients',
      roles: ['admin', 'super_admin', 'manager', 'member']
    },
    {
      label: 'Projects',
      icon: FolderOpen,
      href: '/projects',
      key: 'projects',
      roles: ['admin', 'super_admin', 'manager', 'member']
    },
    {
      label: 'Tasks',
      icon: CheckSquare,
      href: '/tasks',
      key: 'tasks',
      roles: ['admin', 'super_admin', 'manager', 'member']
    },
    {
      label: 'Proposals',
      icon: FileText,
      href: '/proposals',
      key: 'proposals',
      roles: ['admin', 'super_admin', 'manager', 'member']
    },
    {
      label: 'Invoices',
      icon: DollarSign,
      href: '/invoices',
      key: 'invoices',
      roles: ['admin', 'super_admin', 'manager', 'member']
    },
    {
      label: 'Time Tracking',
      icon: Clock,
      href: '/time-tracking',
      key: 'time-tracking',
      roles: ['admin', 'super_admin', 'manager', 'member']
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      href: '/analytics',
      key: 'analytics',
      roles: ['admin', 'super_admin', 'manager']
    },
    {
      label: 'AI Assistant',
      icon: Sparkles,
      href: '/ai-assistant',
      key: 'ai-assistant',
      roles: ['admin', 'super_admin', 'manager', 'member']
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      key: 'settings',
      roles: ['admin', 'super_admin']
    }
  ];

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(profile?.role || 'member')
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="bg-white border-r border-gray-200 h-full flex flex-col w-64 transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cliento-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-bold text-cliento-blue">Cliento</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cliento-blue text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="ml-3">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-gray-200 p-4">
        {profile && (
          <div className="mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {profile.first_name?.[0] || profile.email[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile.first_name} {profile.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{profile.role}</p>
              </div>
            </div>
          </div>
        )}
        
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <LogOut className="w-4 h-4" />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
};
