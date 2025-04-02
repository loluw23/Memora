
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: ReactNode;
  iconColor: string;
  title: string;
  value: string;
  change: {
    type: 'increase' | 'decrease' | 'stable';
    value: string;
  };
  period: string;
  animationDelay?: string;
}

const StatCard = ({
  icon,
  iconColor,
  title,
  value,
  change,
  period,
  animationDelay = '0.1s',
}: StatCardProps) => {
  return (
    <Card className="animate-fade-in" style={{ animationDelay }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-12 w-12 rounded-full ${iconColor} flex items-center justify-center`}>
            {icon}
          </div>
          <div className={`flex items-center gap-1 ${
            change.type === 'increase' ? 'text-green-500 bg-green-50' : 
            change.type === 'decrease' ? 'text-red-500 bg-red-50' : 
            'text-green-500 bg-green-50'
          } px-2 py-1 rounded-full text-xs`}>
            {change.type === 'increase' ? <ArrowUp size={14} /> : 
             change.type === 'decrease' ? <ArrowDown size={14} /> : 
             <TrendingUp size={14} />}
            <span>{change.value}</span>
          </div>
        </div>
        <h3 className="text-muted-foreground text-sm mb-1">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{period}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
