
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Calendar, Clock, BrainCircuit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const stats = [
  {
    title: "Today's Progress",
    value: "40 mins",
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    progress: 65,
    color: "bg-memora-purple"
  },
  {
    title: "Weekly Streak",
    value: "5 days",
    icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    progress: 70,
    color: "bg-memora-teal"
  },
  {
    title: "Cards Reviewed",
    value: "142",
    icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
    progress: 85,
    color: "bg-orange-400"
  },
  {
    title: "Retention Rate",
    value: "90%",
    icon: <BrainCircuit className="h-4 w-4 text-muted-foreground" />,
    progress: 90,
    color: "bg-green-500"
  }
];

const StudyStats = () => {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <BarChart size={18} className="text-memora-purple" />
          Study Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-muted bg-card/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.title}</span>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-3">{stat.value}</div>
                <Progress value={stat.progress} className="h-1.5" indicatorClassName={stat.color} />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStats;
