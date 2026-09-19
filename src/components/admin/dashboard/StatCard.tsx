import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl bg-card border border-white/5 shadow-lg relative overflow-hidden group hover:border-primary/20 transition-colors">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-muted mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          
          {description && (
            <p className="text-xs text-muted/60 mt-2">{description}</p>
          )}
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <span>{trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%</span>
              <span className="text-muted/60 ml-1">from last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
