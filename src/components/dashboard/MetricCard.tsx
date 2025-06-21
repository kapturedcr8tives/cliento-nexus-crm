
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange" | "red";
}

const colorMap = {
  blue: "text-blue-600 bg-blue-50",
  green: "text-green-600 bg-green-50",
  purple: "text-purple-600 bg-purple-50",
  orange: "text-orange-600 bg-orange-50",
  red: "text-red-600 bg-red-50"
};

const trendColorMap = {
  up: "text-green-600",
  down: "text-red-600",
  neutral: "text-cliento-gray-500"
};

export function MetricCard({ title, value, change, trend, icon: Icon, color }: MetricCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-cliento-gray-600">{title}</p>
            <p className="text-2xl font-bold text-cliento-gray-900 mt-2">{value}</p>
            <div className="flex items-center mt-2">
              <TrendIcon className={cn("h-4 w-4 mr-1", trendColorMap[trend])} />
              <span className={cn("text-sm font-medium", trendColorMap[trend])}>
                {change}
              </span>
            </div>
          </div>
          <div className={cn("p-3 rounded-lg", colorMap[color])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
