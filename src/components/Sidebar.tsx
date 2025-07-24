import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "content", label: "Conteúdo", icon: BookOpen },
  { id: "students", label: "Estudantes", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "goals", label: "Metas", icon: Target },
  { id: "finance", label: "Finanças", icon: DollarSign },
  { id: "growth", label: "Crescimento", icon: TrendingUp },
  { id: "settings", label: "Configurações", icon: Settings },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-card border-r border-border h-screen flex flex-col transition-all duration-300 animate-slide-in",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">FinanceEdu</h2>
              <p className="text-xs text-muted-foreground">Manager</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "accent" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12",
                  isCollapsed && "justify-center px-0",
                  isActive && "shadow-soft"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="bg-gradient-primary/10 rounded-lg p-3 text-center">
            <p className="text-sm font-medium text-foreground mb-1">
              Upgrade para Pro
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Desbloqueie recursos avançados
            </p>
            <Button variant="hero" size="sm" className="w-full">
              Upgrade
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};