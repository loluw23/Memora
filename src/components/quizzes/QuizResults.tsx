
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, BarChart2, Repeat, BookOpen } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  quizTitle: string;
  onRetake: () => void;
  onExit: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  quizTitle, 
  onRetake, 
  onExit 
}) => {
  // Function to get message and color based on score
  const getScoreInfo = () => {
    if (score >= 90) {
      return {
        message: "Outstanding! You've mastered this content!",
        color: "text-green-500",
        icon: <Award className="h-16 w-16 text-yellow-400" />
      };
    } else if (score >= 70) {
      return {
        message: "Great job! You have a good understanding of this topic.",
        color: "text-blue-500",
        icon: <Award className="h-16 w-16 text-blue-400" />
      };
    } else if (score >= 50) {
      return {
        message: "Good effort. A bit more practice will help you improve.",
        color: "text-orange-500",
        icon: <Award className="h-16 w-16 text-orange-400" />
      };
    } else {
      return {
        message: "Keep practicing! This topic needs more review.",
        color: "text-red-500",
        icon: <BookOpen className="h-16 w-16 text-red-400" />
      };
    }
  };

  const { message, color, icon } = getScoreInfo();

  return (
    <div className="animate-fade-in">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <div className="text-muted-foreground">{quizTitle}</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Your Score</span>
              <span className={`text-lg font-bold ${color}`}>{score}%</span>
            </div>
            <Progress value={score} className="h-3" />
          </div>
          
          <p className={`text-lg font-medium ${color}`}>{message}</p>
          
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-memora-purple" />
              Performance Analysis
            </h3>
            <p className="text-muted-foreground text-sm">
              You've completed this quiz and can review your performance on your Stats page. 
              Keep practicing to improve your score!
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={onRetake} variant="outline" className="gap-2">
            <Repeat className="h-4 w-4" />
            Retake Quiz
          </Button>
          <Button onClick={onExit} className="bg-memora-purple gap-2">
            <BookOpen className="h-4 w-4" />
            Back to Quizzes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResults;
