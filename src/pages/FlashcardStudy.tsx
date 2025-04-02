
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StudyFlashcards from '@/components/flashcards/StudyFlashcards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, BarChart2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample deck data for the UI
const flashcardDecks: Record<string, {
  id: string;
  title: string;
  category: string;
  description: string;
  cardCount: number;
  lastStudied?: string;
  cardIds: string[];
}> = {
  'geography': {
    id: 'geography',
    title: 'World Geography',
    category: 'Geography',
    description: 'Learn about countries, capitals, and major geographical features.',
    cardCount: 3,
    lastStudied: '2 days ago',
    cardIds: ['1', '6']
  },
  'biology': {
    id: 'biology',
    title: 'Biology Basics',
    category: 'Biology',
    description: 'Study essential concepts in cellular biology and organisms.',
    cardCount: 5,
    lastStudied: 'Yesterday',
    cardIds: ['2']
  },
  'literature': {
    id: 'literature',
    title: 'English Literature',
    category: 'Literature',
    description: 'Famous authors and their works throughout literary history.',
    cardCount: 8,
    lastStudied: '3 days ago',
    cardIds: ['4']
  },
  'astronomy': {
    id: 'astronomy',
    title: 'Space and Astronomy',
    category: 'Astronomy',
    description: 'Study planets, stars, and other celestial objects.',
    cardCount: 12,
    cardIds: ['3']
  },
  'chemistry': {
    id: 'chemistry',
    title: 'Basic Chemistry',
    category: 'Chemistry',
    description: 'Chemical elements, compounds, and basic reactions.',
    cardCount: 15,
    lastStudied: '1 week ago',
    cardIds: ['5']
  },
  'history': {
    id: 'history',
    title: 'World History',
    category: 'History',
    description: 'Major historical events and time periods.',
    cardCount: 20,
    lastStudied: '5 days ago',
    cardIds: ['7']
  },
  'math': {
    id: 'math',
    title: 'Mathematics',
    category: 'Mathematics',
    description: 'Basic math concepts and formulas.',
    cardCount: 10,
    cardIds: ['8']
  }
};

// Generate placeholder deck for unknown IDs
const getFlashcardDeck = (id: string) => {
  if (flashcardDecks[id]) {
    return flashcardDecks[id];
  }
  
  return {
    id,
    title: `Flashcard Deck: ${id}`,
    category: 'General Knowledge',
    description: 'Study these flashcards to improve your knowledge.',
    cardCount: 5,
    cardIds: ['1', '2', '3', '4', '5'].map(num => `${num}`)
  };
};

type StudyStatus = 'details' | 'studying' | 'completed';

const FlashcardStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [studyStatus, setStudyStatus] = useState<StudyStatus>('details');
  const [studyProgress, setStudyProgress] = useState(0);
  
  const deckId = id || 'geography';
  const deck = getFlashcardDeck(deckId);

  const handleStartStudy = () => {
    setStudyStatus('studying');
    toast({
      title: "Study Session Started",
      description: `Starting to study ${deck.title}. Good luck!`,
    });
  };

  const handleCompleteStudy = () => {
    setStudyStatus('completed');
    setStudyProgress(100);
    toast({
      title: "Study Session Completed",
      description: "Great job completing this study session!",
    });
  };

  const handleBackToFlashcards = () => {
    navigate('/flashcards');
  };

  const handleRestartStudy = () => {
    setStudyStatus('studying');
    toast({
      title: "Study Session Restarted",
      description: "Let's go through these cards again!",
    });
  };

  return (
    <MainLayout>
      {studyStatus === 'details' && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-6">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToFlashcards}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Flashcards
            </Button>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{deck.title}</h1>
            <p className="text-muted-foreground">{deck.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-memora-purple" />
                  Deck Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{deck.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cards:</span>
                    <span className="font-medium">{deck.cardCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="font-medium">{studyProgress}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-memora-purple" />
                  Study History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-24">
                  {deck.lastStudied ? (
                    <>
                      <span className="text-lg font-medium">Last studied</span>
                      <span className="text-2xl font-bold">{deck.lastStudied}</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground text-center">
                      You haven't studied this deck yet
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-memora-purple" />
                  Study Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Try to recall the answer before flipping the card</p>
                  <p>• Study in short, focused sessions</p>
                  <p>• Review difficult cards more frequently</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-memora-purple w-full md:w-auto px-8"
              onClick={handleStartStudy}
            >
              Start Studying
            </Button>
          </div>
        </div>
      )}

      {studyStatus === 'studying' && (
        <StudyFlashcards
          flashcardIds={deck.cardIds}
          onComplete={handleCompleteStudy}
          onExit={handleBackToFlashcards}
        />
      )}

      {studyStatus === 'completed' && (
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
              <BookOpen className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Study Session Complete!</h2>
            <p className="text-muted-foreground">
              Great job! You've completed studying {deck.title}.
            </p>
          </div>
          
          <Card className="mb-8 max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Session Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Cards Reviewed:</span>
                  <span className="font-bold">{deck.cardIds.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Time Spent:</span>
                  <span className="font-bold">~{Math.ceil(deck.cardIds.length * 0.5)} minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Date:</span>
                  <span className="font-bold">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={handleRestartStudy}>
              Study Again
            </Button>
            <Button className="bg-memora-purple" onClick={handleBackToFlashcards}>
              Back to Flashcards
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default FlashcardStudy;
