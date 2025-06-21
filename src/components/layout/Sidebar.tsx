
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  FolderOpen, 
  FileText, 
  DollarSign, 
  Clock, 
  Settings, 
  BarChart3,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isAdmin?: boolean;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ isAdmin = false, currentSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const adminNavItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const userNavItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "clients", label: "Clients", icon: Users },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "proposals", label: "Proposals", icon: FileText },
    { id: "invoices", label: "Invoices", icon: DollarSign },
    { id: "time", label: "Time Tracking", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className={cn(
      "h-screen bg-white border-r border-cliento-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-cliento-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cliento-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold">C</span>
            </div>
            <span className="font-heading font-semibold text-lg">Cliento</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 h-8 w-8"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentSection === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start transition-colors",
              currentSection === item.id 
                ? "bg-cliento-blue text-white" 
                : "hover:bg-cliento-gray-100 hover:text-cliento-blue",
              isCollapsed ? "px-2" : "px-3"
            )}
            onClick={() => onSectionChange(item.id)}
          >
            <item.icon className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
            {!isCollapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-cliento-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-cliento-gray-600">
              {isAdmin ? "Admin Portal" : "User Portal"}
            </p>
            <p className="text-xs text-cliento-gray-500 mt-1">
              {isAdmin ? "Manage your CRM" : "Manage your business"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
