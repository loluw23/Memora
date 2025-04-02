
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Repeat, CheckCircle, XCircle, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type StudyFlashcard = {
  id: string;
  front: string;
  back: string;
  category: string;
};

interface StudyFlashcardsProps {
  flashcardIds: string[];
  onComplete: () => void;
  onExit: () => void;
}

// Sample flashcards data - in a real app this would come from a database
const sampleFlashcards: Record<string, StudyFlashcard> = {
  '1': {
    id: '1',
    front: 'What is the capital of France?',
    back: 'Paris',
    category: 'Geography'
  },
  '2': {
    id: '2',
    front: 'What is the powerhouse of the cell?',
    back: 'Mitochondria',
    category: 'Biology'
  },
  '3': {
    id: '3',
    front: 'What is the largest planet in our solar system?',
    back: 'Jupiter',
    category: 'Astronomy'
  },
  '4': {
    id: '4',
    front: 'Who wrote "Romeo and Juliet"?',
    back: 'William Shakespeare',
    category: 'Literature'
  },
  '5': {
    id: '5',
    front: 'What is the chemical symbol for gold?',
    back: 'Au',
    category: 'Chemistry'
  },
  '6': {
    id: '6',
    front: 'What is the longest river in the world?',
    back: 'Nile River',
    category: 'Geography'
  },
  '7': {
    id: '7',
    front: 'What year did World War II end?',
    back: '1945',
    category: 'History'
  },
  '8': {
    id: '8',
    front: 'What is the square root of 144?',
    back: '12',
    category: 'Mathematics'
  }
};

// Generate placeholder flashcards for missing IDs
const generatePlaceholderFlashcard = (id: string): StudyFlashcard => {
  return {
    id,
    front: `Flashcard Question ${id}`,
    back: `Answer for flashcard ${id}`,
    category: 'General Knowledge'
  };
};

const getFlashcard = (id: string): StudyFlashcard => {
  return sampleFlashcards[id] || generatePlaceholderFlashcard(id);
};

const StudyFlashcards: React.FC<StudyFlashcardsProps> = ({ 
  flashcardIds, 
  onComplete, 
  onExit 
}) => {
  const [flashcards, setFlashcards] = useState<StudyFlashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      const loadedCards = flashcardIds.map(id => getFlashcard(id));
      setFlashcards(loadedCards);
      setIsLoading(false);
    }, 1000);
  }, [flashcardIds]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Complete study session
      toast({
        title: "Study Session Complete",
        description: `You've studied ${knownCards.size} out of ${flashcards.length} cards successfully!`,
      });
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleKnown = () => {
    const updatedKnownCards = new Set(knownCards);
    updatedKnownCards.add(flashcards[currentIndex].id);
    setKnownCards(updatedKnownCards);
    
    toast({
      title: "Card Marked as Known",
      description: "Great job! This card will appear less frequently.",
    });
    
    handleNext();
  };

  const handleUnknown = () => {
    const updatedKnownCards = new Set(knownCards);
    updatedKnownCards.delete(flashcards[currentIndex].id);
    setKnownCards(updatedKnownCards);
    
    toast({
      title: "Card Marked for Review",
      description: "This card will appear more frequently in your studies.",
      variant: "default",
    });
    
    handleNext();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 border-4 border-memora-purple border-solid rounded-full border-t-transparent animate-spin mb-4"></div>
        <p className="text-lg">Loading flashcards...</p>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground mb-4">No flashcards available to study.</p>
        <Button onClick={onExit} className="bg-memora-purple">
          Back to Flashcards
        </Button>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Studying {currentCard.category}</h2>
          <div className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {flashcards.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="mb-8">
        <div 
          className="relative w-full perspective-1000 transition-all duration-500 cursor-pointer mb-6"
          style={{ height: '300px' }}
          onClick={handleFlip}
        >
          <Card 
            className={`absolute w-full h-full backface-hidden transition-all duration-500 flex items-center justify-center p-8 ${
              isFlipped ? 'rotate-y-180 invisible' : ''
            }`}
          >
            <CardContent className="text-center w-full h-full flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Question
              </span>
              <div className="text-2xl font-medium">{currentCard.front}</div>
              <div className="text-sm text-muted-foreground mt-4">Click to reveal answer</div>
            </CardContent>
          </Card>
          
          <Card 
            className={`absolute w-full h-full backface-hidden transition-all duration-500 flex items-center justify-center p-8 bg-memora-purple/5 ${
              isFlipped ? '' : 'rotate-y-180 invisible'
            }`}
          >
            <CardContent className="text-center w-full h-full flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                Answer
              </span>
              <div className="text-2xl font-medium">{currentCard.back}</div>
              <div className="text-sm text-muted-foreground mt-4">Click to see question</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={handleUnknown}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
          >
            <XCircle className="h-5 w-5" />
            Still Learning
          </Button>
          
          <Button
            onClick={handleKnown}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
          >
            <CheckCircle className="h-5 w-5" />
            Got It
          </Button>
        </div>
        
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button onClick={onExit} variant="outline">
            Exit
          </Button>
          
          <Button
            onClick={handleNext}
            className="gap-2 bg-memora-purple"
          >
            {currentIndex < flashcards.length - 1 ? (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Finish
                <ThumbsUp className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudyFlashcards;
