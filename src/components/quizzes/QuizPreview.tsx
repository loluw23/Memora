
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export type Quiz = {
  id: string;
  title: string;
  category: string;
  questionCount: number;
  estimatedTime: string;
  lastScore?: number;
  completedCount: number;
  colorClass: string;
};

interface QuizPreviewProps {
  quiz: Quiz;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ quiz }) => {
  const navigate = useNavigate();

  const handleQuizClick = () => {
    navigate(`/quizzes/${quiz.id}`);
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleQuizClick}
    >
      <CardContent className="p-0">
        <div className={`${quiz.colorClass} h-2 rounded-t-lg`}></div>
        <div className="p-4">
          <h3 className="font-semibold mb-1">{quiz.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{quiz.category}</p>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <FileCheck className="h-4 w-4 mr-1" />
              <span>{quiz.questionCount} questions</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{quiz.estimatedTime}</span>
            </div>
          </div>
          
          {quiz.lastScore !== undefined && (
            <div className="mt-3 pt-3 border-t flex justify-between">
              <span className="text-sm text-muted-foreground">Last score</span>
              <span className="font-medium">{quiz.lastScore}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizPreview;
