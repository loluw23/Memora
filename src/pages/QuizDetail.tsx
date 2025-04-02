
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import TakeQuiz from '@/components/quizzes/TakeQuiz';
import QuizResults from '@/components/quizzes/QuizResults';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, FileQuestion, Award, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for quiz details
const quizDetails: Record<string, {
  title: string;
  description: string;
  category: string;
  questionCount: number;
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  lastScore?: number;
  completedCount: number;
}> = {
  '1': {
    title: 'World Capitals Quiz',
    description: 'Test your knowledge of world capitals in this comprehensive geography quiz.',
    category: 'Geography',
    questionCount: 15,
    estimatedTime: '10 min',
    difficulty: 'Medium',
    lastScore: 85,
    completedCount: 3
  },
  '2': {
    title: 'Cell Biology Basics',
    description: 'Learn about the fundamental structures and functions of cells in living organisms.',
    category: 'Biology',
    questionCount: 20,
    estimatedTime: '15 min',
    difficulty: 'Medium',
    lastScore: 92,
    completedCount: 2
  },
  '3': {
    title: 'American Literature',
    description: 'Explore famous works and authors from American literary history.',
    category: 'Literature',
    questionCount: 12,
    estimatedTime: '8 min',
    difficulty: 'Hard',
    lastScore: 75,
    completedCount: 1
  },
  '4': {
    title: 'Periodic Table Elements',
    description: 'Test your knowledge of chemical elements, their symbols, and properties.',
    category: 'Chemistry',
    questionCount: 25,
    estimatedTime: '20 min',
    difficulty: 'Hard',
    lastScore: 68,
    completedCount: 1
  }
};

// Generate placeholder data for any unknown quiz ID
const getQuizDetails = (id: string) => {
  if (quizDetails[id]) {
    return quizDetails[id];
  }
  return {
    title: `Quiz ${id}`,
    description: 'Test your knowledge on this topic.',
    category: 'General Knowledge',
    questionCount: 10,
    estimatedTime: '5-10 min',
    difficulty: 'Medium' as const,
    completedCount: 0
  };
};

type QuizStatus = 'details' | 'taking' | 'results';

const QuizDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('details');
  const [quizScore, setQuizScore] = useState<number>(0);
  
  const quizId = id || '1';
  const quiz = getQuizDetails(quizId);

  const handleStartQuiz = () => {
    toast({
      title: "Quiz Started",
      description: `Starting ${quiz.title}. Good luck!`,
    });
    setQuizStatus('taking');
  };

  const handleCompleteQuiz = (score: number) => {
    setQuizScore(score);
    setQuizStatus('results');
    toast({
      title: "Quiz Completed",
      description: `You scored ${score}% on ${quiz.title}`,
    });
  };

  const handleRetakeQuiz = () => {
    setQuizStatus('taking');
    toast({
      title: "Quiz Restarted",
      description: `Retaking ${quiz.title}. Good luck!`,
    });
  };

  const handleExitQuiz = () => {
    navigate('/quizzes');
  };

  const handleBackToDetails = () => {
    setQuizStatus('details');
  };

  return (
    <MainLayout>
      {quizStatus === 'details' && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/quizzes')}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Quizzes
            </Button>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-muted-foreground">{quiz.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileQuestion className="h-5 w-5 text-memora-purple" />
                  Quiz Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{quiz.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions:</span>
                    <span className="font-medium">{quiz.questionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="font-medium">{quiz.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion:</span>
                    <span className="font-medium">{quiz.completedCount} times</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-memora-purple" />
                  Time Requirement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-24">
                  <span className="text-3xl font-bold">{quiz.estimatedTime}</span>
                  <span className="text-muted-foreground">Estimated time</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-memora-purple" />
                  Your Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {quiz.lastScore ? (
                  <div className="flex flex-col items-center justify-center h-24">
                    <span className="text-3xl font-bold">{quiz.lastScore}%</span>
                    <span className="text-muted-foreground">Last score</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-24 text-center">
                    <span className="text-muted-foreground">You haven't taken this quiz yet</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-memora-purple w-full md:w-auto px-8"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </Button>
          </div>
        </div>
      )}

      {quizStatus === 'taking' && (
        <TakeQuiz 
          quizId={quizId} 
          onComplete={handleCompleteQuiz} 
          onExit={handleBackToDetails} 
        />
      )}

      {quizStatus === 'results' && (
        <QuizResults 
          score={quizScore} 
          quizTitle={quiz.title} 
          onRetake={handleRetakeQuiz} 
          onExit={handleExitQuiz} 
        />
      )}
    </MainLayout>
  );
};

export default QuizDetail;
