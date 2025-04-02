
import React from 'react';
import { Clock, BookOpen, Medal, Flame } from 'lucide-react';
import StatCard from './StatCard';

const StatsCards = () => {
  const statsCards = [
    {
      icon: <Clock size={24} className="text-memora-purple" />,
      iconColor: "bg-memora-purple/20",
      title: "Total Study Time",
      value: "15h 24m",
      change: { type: 'increase' as const, value: "12%" },
      period: "This month",
      animationDelay: "0.1s"
    },
    {
      icon: <BookOpen size={24} className="text-memora-teal" />,
      iconColor: "bg-memora-teal/20",
      title: "Cards Reviewed",
      value: "385",
      change: { type: 'increase' as const, value: "8%" },
      period: "This month",
      animationDelay: "0.2s"
    },
    {
      icon: <Medal size={24} className="text-orange-400" />,
      iconColor: "bg-orange-400/20",
      title: "Quiz Score Avg",
      value: "83%",
      change: { type: 'stable' as const, value: "Stable" },
      period: "Last 30 days",
      animationDelay: "0.3s"
    },
    {
      icon: <Flame size={24} className="text-green-500" />,
      iconColor: "bg-green-500/20",
      title: "Current Streak",
      value: "12 days",
      change: { type: 'decrease' as const, value: "2 days" },
      period: "Best: 14 days",
      animationDelay: "0.4s"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsCards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};

export default StatsCards;
