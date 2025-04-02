
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Award, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface Quiz {
  id: string;
  title: string;
  category: string;
  questionCount: number;
  estimatedTime: string;
  lastScore?: number;
  completedCount: number;
  colorClass: string;
}

interface QuizPreviewProps {
  quiz: Quiz;
  onClick?: () => void;
}

const QuizPreview = ({ quiz, onClick }: QuizPreviewProps) => {
  return (
    <Card 
      className="hover-card overflow-hidden cursor-pointer animate-fade-in" 
      onClick={onClick}
      style={{ animationDelay: '0.2s' }}
    >
      <div className={`h-2 ${quiz.colorClass}`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{quiz.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{quiz.category}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm">
            <FileText size={16} className="text-muted-foreground" />
            <span>{quiz.questionCount} questions</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Clock size={16} className="text-muted-foreground" />
            <span>{quiz.estimatedTime}</span>
          </div>
        </div>
        
        {quiz.lastScore !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Last score</span>
              <span className="text-sm font-medium">{quiz.lastScore}%</span>
            </div>
            <Progress 
              value={quiz.lastScore} 
              className="h-1.5" 
              indicatorClassName={
                quiz.lastScore >= 80 ? "bg-green-500" : 
                quiz.lastScore >= 60 ? "bg-yellow-500" : "bg-red-500"
              } 
            />
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <BarChart3 size={16} className="text-muted-foreground" />
            <span>Completed {quiz.completedCount} times</span>
          </div>
          {quiz.lastScore && quiz.lastScore >= 90 && (
            <div className="flex items-center gap-1 text-amber-500">
              <Award size={16} />
              <span className="font-medium">Excellent!</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-full bg-memora-purple hover:bg-memora-purple-dark">
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizPreview;
