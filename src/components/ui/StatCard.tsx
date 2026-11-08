import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
  positive?: boolean;
}

export function StatCard({ label, value, icon, change, positive }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-lg">{icon}</span>
        {change && (
          <span className={`text-xs font-body ${positive ? 'text-accent-2' : 'text-danger'}`}>
            {positive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
      <div className="font-pixel text-2xl text-ink truncate">{value}</div>
      <div className="text-xs text-muted font-body uppercase tracking-wide">{label}</div>
    </Card>
  );
}
