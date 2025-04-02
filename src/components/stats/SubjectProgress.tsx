
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SubjectProgressCardProps {
  subject: string;
  mastered: number;
  quizAverage: number;
  studyTime: string;
  studyTimePercentage: number;
}

const SubjectProgressCard = ({ subject, mastered, quizAverage, studyTime, studyTimePercentage }: SubjectProgressCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Cards mastered</span>
              <span className="text-sm font-medium">{mastered}%</span>
            </div>
            <Progress value={mastered} className="h-2" indicatorClassName="bg-green-500" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Quiz average</span>
              <span className="text-sm font-medium">{quizAverage}%</span>
            </div>
            <Progress value={quizAverage} className="h-2" indicatorClassName="bg-memora-teal" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Study time</span>
              <span className="text-sm font-medium">{studyTime}</span>
            </div>
            <Progress value={studyTimePercentage} className="h-2" indicatorClassName="bg-memora-purple" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SubjectProgress = () => {
  const subjects = [
    {
      subject: 'Biology',
      mastered: 65,
      quizAverage: 78,
      studyTime: '5h 30m',
      studyTimePercentage: 70
    },
    {
      subject: 'History',
      mastered: 48,
      quizAverage: 85,
      studyTime: '4h 15m',
      studyTimePercentage: 60
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {subjects.map((subject, index) => (
        <SubjectProgressCard key={index} {...subject} />
      ))}
    </div>
  );
};

export default SubjectProgress;
