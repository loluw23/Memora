
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  category: string;
  dueDate: string;
};

interface FlashcardPreviewProps {
  card: Flashcard;
  expanded?: boolean;
}

const FlashcardPreview: React.FC<FlashcardPreviewProps> = ({ card, expanded = false }) => {
  const navigate = useNavigate();

  const handleStudyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/flashcards/study/${card.category.toLowerCase()}`);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium mb-1">{card.front}</div>
            <Badge variant="outline" className="text-xs">
              {card.category}
            </Badge>
          </div>
          <div className="flex items-center">
            <Badge variant="secondary" className="text-xs mr-2">
              Due: {card.dueDate}
            </Badge>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="mb-3">
              <div className="text-sm text-muted-foreground mb-1">Answer:</div>
              <div>{card.back}</div>
            </div>
            <div className="flex justify-end">
              <Button 
                size="sm" 
                className="bg-memora-purple"
                onClick={handleStudyClick}
              >
                Study Now
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardPreview;
