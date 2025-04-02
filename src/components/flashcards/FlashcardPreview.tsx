
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  dueDate: string;
}

interface FlashcardPreviewProps {
  card: Flashcard;
  onClick?: () => void;
}

const FlashcardPreview = ({ card, onClick }: FlashcardPreviewProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div 
      className="w-full h-64 perspective-1000 cursor-pointer"
      onClick={onClick}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front of card */}
        <Card className="absolute w-full h-full backface-hidden p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen size={14} />
              <span>{card.category}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={14} />
              <span>Due: {card.dueDate}</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center text-center p-4 font-medium text-lg">
            {card.front}
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 rounded-full px-4"
              onClick={handleFlip}
            >
              Reveal Answer
            </Button>
          </div>
        </Card>
        
        {/* Back of card */}
        <Card className="absolute w-full h-full backface-hidden p-6 flex flex-col rotate-y-180 bg-memora-purple/5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookOpen size={14} />
              <span>{card.category}</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center text-center p-4 text-lg">
            {card.back}
          </div>
          
          <div className="flex justify-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-4 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ThumbsDown size={16} className="mr-1" />
              Difficult
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-4 text-green-500 hover:bg-green-50 hover:text-green-600 border-green-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ThumbsUp size={16} className="mr-1" />
              Easy
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FlashcardPreview;
