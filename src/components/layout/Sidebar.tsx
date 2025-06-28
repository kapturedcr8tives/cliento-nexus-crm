
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CheckSquare,
  FileText,
  Receipt,
  Clock,
  BarChart3,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  isAdmin: boolean;
}

export function Sidebar({ isAdmin }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      description: "Overview and metrics",
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Users,
      description: "Manage your clients",
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderOpen,
      description: "Track project progress",
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: CheckSquare,
      description: "Organize your tasks",
    },
    {
      name: "Proposals",
      href: "/proposals",
      icon: FileText,
      description: "Create and manage proposals",
    },
    {
      name: "Invoices",
      href: "/invoices",
      icon: Receipt,
      description: "Billing and payments",
    },
    {
      name: "Time Tracking",
      href: "/time-tracking",
      icon: Clock,
      description: "Track billable hours",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      description: "Business insights",
    },
    {
      name: "AI Assistant",
      href: "/ai-assistant",
      icon: Bot,
      description: "AI-powered help",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      description: "Account preferences",
    },
  ];

  return (
    <div
      className={cn(
        "bg-white border-r border-cliento-gray-200 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cliento-gray-200">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-cliento-gray-900">Cliento</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-cliento-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-cliento-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-cliento-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-cliento-blue text-white shadow-sm"
                  : "text-cliento-gray-700 hover:bg-cliento-gray-100 hover:text-cliento-gray-900"
              )
            }
            title={isCollapsed ? item.description : undefined}
          >
            <item.icon className={cn("h-5 w-5 flex-shrink-0")} />
            {!isCollapsed && (
              <span className="truncate">{item.name}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-cliento-gray-200">
          <div className="text-xs text-cliento-gray-500 text-center">
            {isAdmin && (
              <div className="bg-cliento-blue bg-opacity-10 text-cliento-blue px-2 py-1 rounded-md mb-2">
                Admin Access
              </div>
            )}
            Cliento CRM v1.0
          </div>
        </div>
      )}
    </div>
  );
}
