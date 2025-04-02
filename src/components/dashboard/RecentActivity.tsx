
import React from 'react';
import { Calendar, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  title: string;
  type: 'flashcard' | 'quiz' | 'note';
  timestamp: string;
  description: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    title: 'Biology Essentials',
    type: 'flashcard',
    timestamp: '2 hours ago',
    description: 'Reviewed 20 cards - 85% retention'
  },
  {
    id: '2',
    title: 'World History Quiz',
    type: 'quiz',
    timestamp: 'Yesterday',
    description: 'Scored 90% - New personal best!'
  },
  {
    id: '3',
    title: 'Physics Formulas',
    type: 'note',
    timestamp: '3 days ago',
    description: 'Updated notes on thermodynamics'
  }
];

const RecentActivity = () => {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Clock size={18} className="text-memora-purple" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors rounded-lg cursor-pointer group"
            >
              <div className={`
                mt-1 p-2 rounded-full flex-shrink-0
                ${activity.type === 'flashcard' ? 'bg-memora-purple/10 text-memora-purple' : 
                  activity.type === 'quiz' ? 'bg-memora-teal/10 text-memora-teal' : 
                  'bg-memora-coral/10 text-orange-500'}
              `}>
                {activity.type === 'flashcard' ? (
                  <Calendar size={16} />
                ) : activity.type === 'quiz' ? (
                  <Award size={16} />
                ) : (
                  <Clock size={16} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm truncate group-hover:text-memora-purple transition-colors">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
