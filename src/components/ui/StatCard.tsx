import { Card } from './Card';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

export function StatCard({ label, value, icon, change, positive }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-2 min-w-0 bg-white">
      <div className="flex items-center justify-between">
        <span className="text-xl flex items-center">{icon}</span>
        {change && (
          <span className={`text-xs font-bold ${positive ? 'text-[#335C67]' : 'text-[#9E2A2B]'}`}>
            {positive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
      <div className="font-extrabold text-3xl text-[#540B0E] truncate tracking-tight">{value}</div>
      <div className="text-xs text-[#766050] font-semibold uppercase tracking-wider">{label}</div>
    </Card>
  );
}
