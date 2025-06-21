
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon,
  className 
}: MetricCardProps) {
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-cliento-gray-600">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-cliento-gray-400">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-heading text-cliento-gray-900">
          {value}
        </div>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            changeType === 'positive' && "text-green-600",
            changeType === 'negative' && "text-red-600",
            changeType === 'neutral' && "text-cliento-gray-500"
          )}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
