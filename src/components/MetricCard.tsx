import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  gradient?: boolean;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  gradient,
}: MetricCardProps) => {
  return (
    <Card className={cn(
      "p-6 transition-all duration-200 hover:shadow-soft hover:scale-105 animate-fade-in",
      gradient && "bg-gradient-primary text-primary-foreground"
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className={cn(
            "text-sm font-medium",
            gradient ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-2xl font-bold",
            gradient ? "text-primary-foreground" : "text-foreground"
          )}>
            {value}
          </p>
          <div className="flex items-center gap-1">
            <span className={cn(
              "text-xs font-medium",
              trend === "up" && "text-success",
              trend === "down" && "text-destructive",
              trend === "neutral" && "text-muted-foreground",
              gradient && "text-primary-foreground/90"
            )}>
              {change}
            </span>
          </div>
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          gradient 
            ? "bg-primary-foreground/20" 
            : "bg-primary/10"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            gradient ? "text-primary-foreground" : "text-primary"
          )} />
        </div>
      </div>
    </Card>
  );
};