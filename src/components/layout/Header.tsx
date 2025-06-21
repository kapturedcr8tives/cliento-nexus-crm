
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, Settings, LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  organization_id: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: 'super_admin' | 'admin' | 'manager' | 'member';
  avatar_url: string | null;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'suspended' | 'trial' | 'cancelled';
  subscription_plan: 'free' | 'pro' | 'enterprise';
}

interface HeaderProps {
  isAdmin?: boolean;
  onLogout: () => void;
  user?: User | null;
  profile?: Profile | null;
  organization?: Organization | null;
}

export function Header({ 
  isAdmin = false, 
  onLogout, 
  user, 
  profile, 
  organization 
}: HeaderProps) {
  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return user?.email || "User";
  };

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (profile?.first_name) {
      return profile.first_name[0].toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  const getRoleDisplay = () => {
    if (profile?.role === 'super_admin') return 'Super Admin';
    if (profile?.role === 'admin') return 'Administrator';
    if (profile?.role === 'manager') return 'Manager';
    return 'Member';
  };

  return (
    <header className="bg-white border-b border-cliento-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cliento-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clients, projects, or invoices..."
              className="w-96 pl-10 bg-cliento-gray-50 border-cliento-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {organization && (
            <div className="text-right mr-4">
              <p className="text-sm font-medium text-cliento-gray-900">
                {organization.name}
              </p>
              <p className="text-xs text-cliento-gray-500 capitalize">
                {organization.subscription_plan} plan
              </p>
            </div>
          )}

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 h-10">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback className="bg-cliento-blue text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs text-cliento-gray-500">
                    {getRoleDisplay()}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
