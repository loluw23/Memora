
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StudyStats from '@/components/dashboard/StudyStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import LibraryCollection, { CollectionItem } from '@/components/library/LibraryCollection';
import FlashcardPreview, { Flashcard } from '@/components/flashcards/FlashcardPreview';
import QuizPreview, { Quiz } from '@/components/quizzes/QuizPreview';
import WorksheetPreview, { Worksheet } from '@/components/worksheets/WorksheetPreview';
import CreateButton from '@/components/common/CreateButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, FileCheck, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Sample data
const flashcards: Flashcard[] = [
  {
    id: '1',
    front: 'What is the capital of France?',
    back: 'Paris',
    category: 'Geography',
    dueDate: 'Today'
  },
  {
    id: '2',
    front: 'What is the powerhouse of the cell?',
    back: 'Mitochondria',
    category: 'Biology',
    dueDate: 'Tomorrow'
  }
];

const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'World Capitals Quiz',
    category: 'Geography',
    questionCount: 15,
    estimatedTime: '10 min',
    lastScore: 85,
    completedCount: 3,
    colorClass: 'bg-memora-teal'
  },
  {
    id: '2',
    title: 'Cell Biology Basics',
    category: 'Biology',
    questionCount: 20,
    estimatedTime: '15 min',
    lastScore: 92,
    completedCount: 2,
    colorClass: 'bg-memora-purple'
  }
];

const worksheets: Worksheet[] = [
  {
    id: '1',
    title: 'World History Timeline',
    questionCount: 12,
    estimatedTime: '25 min',
    completedCount: 2,
    lastScore: 80,
    colorClass: 'bg-memora-purple'
  },
  {
    id: '2',
    title: 'Algebra Practice Problems',
    questionCount: 15,
    estimatedTime: '30 min',
    completedCount: 1,
    lastScore: 75,
    colorClass: 'bg-memora-teal'
  }
];

const collections: CollectionItem[] = [
  {
    id: '1',
    title: 'American History',
    category: 'History',
    itemCount: 120,
    lastStudied: '2 days ago',
    progress: 65,
    color: 'bg-memora-purple'
  },
  {
    id: '2',
    title: 'Cell Biology',
    category: 'Biology',
    itemCount: 85,
    lastStudied: 'Yesterday',
    progress: 78,
    color: 'bg-memora-teal'
  },
  {
    id: '3',
    title: 'Spanish Vocabulary',
    category: 'Languages',
    itemCount: 200,
    lastStudied: '4 days ago',
    progress: 42,
    color: 'bg-orange-400'
  }
];

const Dashboard = () => {
  const { toast } = useToast();
  const [showWelcome, setShowWelcome] = useState(true);
  
  const handleCreateClick = () => {
    toast({
      title: "Create new content",
      description: "Choose what you want to create: Flashcards, Quiz, or Worksheets",
    });
  };
  
  return (
    <MainLayout>
      {showWelcome && (
        <Card className="mb-8 border-memora-purple/20 bg-gradient-to-r from-memora-purple/5 to-memora-purple/10 animate-fade-in shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-memora-purple flex items-center justify-center text-white shrink-0 animate-pulse-scale">
                <Brain size={32} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Welcome to Memora</h2>
                <p className="text-muted-foreground mb-3">
                  Your personalized learning platform designed to help you study effectively
                  with spaced repetition, flashcards, quizzes, and more.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="rounded-full bg-memora-purple" asChild>
                    <Link to="/flashcards">
                      <BookOpen size={16} className="mr-1" />
                      Create Flashcards
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full" asChild>
                    <Link to="/quizzes">
                      <FileCheck size={16} className="mr-1" />
                      Start a Quiz
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full" asChild>
                    <Link to="/worksheets">
                      <Award size={16} className="mr-1" />
                      Try Worksheets
                    </Link>
                  </Button>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="shrink-0"
                onClick={() => setShowWelcome(false)}
              >
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <StudyStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <RecentActivity />
          <div className="mt-8">
            <LibraryCollection title="Your Collections" items={collections} />
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Due Flashcards</h3>
              <Link to="/flashcards" className="text-sm text-memora-purple hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {flashcards.map(card => (
                <FlashcardPreview key={card.id} card={card} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Quizzes</h3>
              <Link to="/quizzes" className="text-sm text-memora-purple hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {quizzes.map(quiz => (
                <QuizPreview key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Worksheets</h3>
              <Link to="/worksheets" className="text-sm text-memora-purple hover:underline">View all</Link>
            </div>
            <div className="space-y-4">
              {worksheets.map(worksheet => (
                <WorksheetPreview key={worksheet.id} worksheet={worksheet} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <CreateButton onClick={handleCreateClick} />
    </MainLayout>
  );
};

export default Dashboard;
