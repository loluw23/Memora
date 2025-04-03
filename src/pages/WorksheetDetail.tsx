
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, FileText, Clock, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  type: 'short-answer' | 'long-answer' | 'multiple-choice';
  choices?: string[];
  points: number;
}

// Mock data for the worksheet
const worksheetData = {
  id: '1',
  title: 'World History Timeline',
  description: 'Complete the timeline of major historical events in world history. Provide accurate dates and explain the significance of each event.',
  estimatedTime: '25 min',
  questionCount: 5,
  questions: [
    {
      id: '1',
      question: 'When did World War I begin, and what was the immediate trigger?',
      type: 'short-answer' as const,
      points: 2
    },
    {
      id: '2',
      question: 'Explain the causes and effects of the Industrial Revolution in Europe.',
      type: 'long-answer' as const,
      points: 5
    },
    {
      id: '3',
      question: 'Which event marked the beginning of the Renaissance?',
      type: 'multiple-choice' as const,
      choices: [
        'The Fall of Constantinople',
        'The Printing of the Gutenberg Bible',
        'The Fall of Rome',
        'The Black Death Pandemic'
      ],
      points: 1
    },
    {
      id: '4',
      question: 'What were the main achievements of the Ancient Egyptian civilization?',
      type: 'long-answer' as const,
      points: 4
    },
    {
      id: '5',
      question: 'When was the Declaration of Independence signed?',
      type: 'short-answer' as const,
      points: 1
    }
  ]
};

const WorksheetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedChoices, setSelectedChoices] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // In a real app, fetch worksheet data based on ID
  const worksheet = worksheetData;

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const selectChoice = (questionId: string, choiceIndex: number) => {
    setSelectedChoices(prev => ({
      ...prev,
      [questionId]: choiceIndex
    }));
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const totalQuestions = worksheet.questions.length;
    const answeredQuestions = Object.keys(answers).length + Object.keys(selectedChoices).length;
    
    if (answeredQuestions < totalQuestions) {
      toast({
        title: "Incomplete Worksheet",
        description: `You've only answered ${answeredQuestions} out of ${totalQuestions} questions.`,
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would submit answers to a server
    toast({
      title: "Worksheet Submitted",
      description: "Your answers have been submitted successfully.",
    });
    
    setIsSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/worksheets">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{worksheet.title}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{worksheet.title}</CardTitle>
            <CardDescription>{worksheet.description}</CardDescription>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <FileText size={16} />
                <span>{worksheet.questionCount} Questions</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock size={16} />
                <span>{worksheet.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Award size={16} />
                <span>{worksheet.questions.reduce((acc, q) => acc + q.points, 0)} Points</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {isSubmitted ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="text-yellow-500" />
                Worksheet Completed
              </CardTitle>
              <CardDescription>Your answers have been submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Thank you for completing this worksheet. In a real application, you would receive your score and feedback here.</p>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/worksheets">Back to Worksheets</Link>
                </Button>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-memora-purple hover:bg-memora-purple/90"
                >
                  Review Answers
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {worksheet.questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-memora-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-base">{question.question}</CardTitle>
                      <CardDescription className="mt-1">
                        {question.type === 'short-answer' 
                          ? 'Short answer question' 
                          : question.type === 'long-answer'
                            ? 'Essay question'
                            : 'Multiple choice question'
                        } · {question.points} point{question.points > 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {question.type === 'short-answer' && (
                    <Input 
                      placeholder="Your answer..."
                      value={answers[question.id] || ''}
                      onChange={(e) => updateAnswer(question.id, e.target.value)}
                    />
                  )}
                  
                  {question.type === 'long-answer' && (
                    <Textarea 
                      placeholder="Your answer..."
                      rows={4}
                      value={answers[question.id] || ''}
                      onChange={(e) => updateAnswer(question.id, e.target.value)}
                    />
                  )}
                  
                  {question.type === 'multiple-choice' && question.choices && (
                    <div className="space-y-2">
                      {question.choices.map((choice, choiceIndex) => (
                        <div 
                          key={choiceIndex}
                          className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                            selectedChoices[question.id] === choiceIndex 
                              ? 'border-memora-purple bg-memora-purple/5' 
                              : 'border-border hover:bg-muted/50'
                          }`}
                          onClick={() => selectChoice(question.id, choiceIndex)}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            selectedChoices[question.id] === choiceIndex 
                              ? 'bg-memora-purple text-white' 
                              : 'border border-input'
                          }`}>
                            {selectedChoices[question.id] === choiceIndex && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span>{choice}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-end">
              <Button 
                className="bg-memora-purple hover:bg-memora-purple/90"
                onClick={handleSubmit}
              >
                Submit Worksheet
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WorksheetDetail;
