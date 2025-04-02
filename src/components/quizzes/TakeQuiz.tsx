
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
};

type QuizData = {
  id: string;
  title: string;
  category: string;
  questions: Question[];
};

interface TakeQuizProps {
  quizId: string;
  onComplete: (score: number) => void;
  onExit: () => void;
}

// Sample quiz data - in a real app this would come from a database
const sampleQuizzes: Record<string, QuizData> = {
  '1': {
    id: '1',
    title: 'World Capitals Quiz',
    category: 'Geography',
    questions: [
      {
        id: 'q1',
        text: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 'Paris'
      },
      {
        id: 'q2',
        text: 'What is the capital of Japan?',
        options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
        correctAnswer: 'Tokyo'
      },
      {
        id: 'q3',
        text: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Perth', 'Canberra'],
        correctAnswer: 'Canberra'
      },
      {
        id: 'q4',
        text: 'What is the capital of Brazil?',
        options: ['Rio de Janeiro', 'Sao Paulo', 'Brasilia', 'Buenos Aires'],
        correctAnswer: 'Brasilia'
      },
      {
        id: 'q5',
        text: 'What is the capital of Canada?',
        options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
        correctAnswer: 'Ottawa'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Cell Biology Basics',
    category: 'Biology',
    questions: [
      {
        id: 'q1',
        text: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus'],
        correctAnswer: 'Mitochondria'
      },
      {
        id: 'q2',
        text: 'Which organelle is responsible for protein synthesis?',
        options: ['Ribosome', 'Lysosome', 'Vacuole', 'Peroxisome'],
        correctAnswer: 'Ribosome'
      },
      {
        id: 'q3',
        text: 'What is the function of the cell membrane?',
        options: [
          'To store genetic information', 
          'To produce energy', 
          'To control what enters and leaves the cell', 
          'To break down waste'
        ],
        correctAnswer: 'To control what enters and leaves the cell'
      },
      {
        id: 'q4',
        text: 'Which structure is found in plant cells but not animal cells?',
        options: ['Nucleus', 'Cell Wall', 'Mitochondria', 'Endoplasmic Reticulum'],
        correctAnswer: 'Cell Wall'
      },
      {
        id: 'q5',
        text: 'What is the main function of chloroplasts?',
        options: ['Respiration', 'Photosynthesis', 'Protein Synthesis', 'Cell Division'],
        correctAnswer: 'Photosynthesis'
      }
    ]
  }
};

// For other quiz IDs, generate a simple placeholder quiz
const generatePlaceholderQuiz = (id: string, title: string, category: string): QuizData => {
  return {
    id,
    title,
    category,
    questions: [
      {
        id: 'q1',
        text: 'Sample Question 1 for ' + title,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A'
      },
      {
        id: 'q2',
        text: 'Sample Question 2 for ' + title,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option B'
      },
      {
        id: 'q3',
        text: 'Sample Question 3 for ' + title,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option C'
      }
    ]
  };
};

const TakeQuiz: React.FC<TakeQuizProps> = ({ quizId, onComplete, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      let quiz = sampleQuizzes[quizId];
      
      // If no predefined quiz is found, generate a placeholder
      if (!quiz) {
        const fallbackQuizzes: Record<string, { title: string, category: string }> = {
          '3': { title: 'American Literature', category: 'Literature' },
          '4': { title: 'Periodic Table Elements', category: 'Chemistry' }
        };
        
        const fallbackInfo = fallbackQuizzes[quizId] || { 
          title: `Quiz ${quizId}`, 
          category: 'General Knowledge' 
        };
        
        quiz = generatePlaceholderQuiz(
          quizId, 
          fallbackInfo.title,
          fallbackInfo.category
        );
      }
      
      setQuizData(quiz);
      setIsLoading(false);
    }, 1000);
  }, [quizId]);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (quizData && option === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Good job! That's the right answer.",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer is: ${quizData?.questions[currentQuestion].correctAnswer}`,
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (quizData && currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      const finalScore = Math.round((score / (quizData?.questions.length || 1)) * 100);
      onComplete(finalScore);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 border-4 border-memora-purple border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
        <p className="text-lg">Loading quiz...</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to load the quiz. Please try again later.
          </AlertDescription>
        </Alert>
        <Button onClick={onExit} className="mt-4">
          Return to Quizzes
        </Button>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{quizData.title}</h2>
        <div className="flex items-center justify-between mt-2">
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </p>
          <p className="text-muted-foreground">
            Score: {score}/{currentQuestion + (isAnswered ? 1 : 0)}
          </p>
        </div>
        <Progress value={progress} className="mt-2 h-2" />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {question.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleOptionSelect(option)}
                disabled={isAnswered}
                variant={
                  isAnswered
                    ? option === question.correctAnswer
                      ? "default"
                      : selectedOption === option
                      ? "destructive"
                      : "outline"
                    : "outline"
                }
                className={`w-full justify-start text-left p-4 h-auto ${
                  isAnswered && option === question.correctAnswer
                    ? "bg-green-500 hover:bg-green-600"
                    : isAnswered && selectedOption === option
                    ? "bg-red-500 hover:bg-red-600"
                    : ""
                }`}
              >
                <div className="flex items-center w-full">
                  <span className="flex-1">{option}</span>
                  {isAnswered && option === question.correctAnswer && (
                    <Check className="h-5 w-5 ml-2" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            onClick={handleNextQuestion}
            disabled={!isAnswered}
            className="bg-memora-purple"
          >
            {currentQuestion < quizData.questions.length - 1 ? (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onExit}>
          Exit Quiz
        </Button>
      </div>
    </div>
  );
};

export default TakeQuiz;
