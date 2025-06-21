
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  UserPlus, 
  FolderOpen, 
  CheckSquare, 
  FileText, 
  Receipt, 
  Clock,
  Settings,
  BarChart3
} from "lucide-react";

interface SidebarProps {
  isAdmin?: boolean;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ isAdmin = false, currentSection, onSectionChange }: SidebarProps) {
  const navigationItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: Home, 
      forAdmin: false 
    },
    { 
      id: "clients", 
      label: "Clients", 
      icon: Users, 
      forAdmin: false 
    },
    { 
      id: "leads", 
      label: "Leads", 
      icon: UserPlus, 
      forAdmin: false 
    },
    { 
      id: "projects", 
      label: "Projects", 
      icon: FolderOpen, 
      forAdmin: false 
    },
    { 
      id: "tasks", 
      label: "Tasks", 
      icon: CheckSquare, 
      forAdmin: false 
    },
    { 
      id: "proposals", 
      label: "Proposals", 
      icon: FileText, 
      forAdmin: false 
    },
    { 
      id: "invoices", 
      label: "Invoices", 
      icon: Receipt, 
      forAdmin: false 
    },
    { 
      id: "time-tracking", 
      label: "Time Tracking", 
      icon: Clock, 
      forAdmin: false 
    },
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: BarChart3, 
      forAdmin: true 
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: Settings, 
      forAdmin: true 
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    !item.forAdmin || (item.forAdmin && isAdmin)
  );

  return (
    <div className="w-64 bg-white border-r border-cliento-gray-200 h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cliento-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-heading font-bold">C</span>
          </div>
          <span className="text-xl font-heading font-bold text-cliento-gray-900">
            Cliento
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                currentSection === item.id
                  ? "bg-cliento-blue/10 text-cliento-blue border-r-2 border-cliento-blue"
                  : "text-cliento-gray-600 hover:text-cliento-gray-900 hover:bg-cliento-gray-50"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
