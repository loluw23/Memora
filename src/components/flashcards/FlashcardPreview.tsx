
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  dueDate: string;
}

interface FlashcardPreviewProps {
  card: Flashcard;
  expanded?: boolean;
}

const FlashcardPreview = ({ card, expanded = false }: FlashcardPreviewProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-secondary font-normal">
            {card.category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock size={12} className="mr-1" />
            {card.dueDate}
          </div>
        </div>
        
        <div className="font-medium">{card.front}</div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground mb-1">Answer:</div>
            <div className="font-medium">{card.back}</div>
          </div>
        )}
        
        {!expanded ? (
          <div className="flex justify-center mt-2">
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
        ) : (
          <div className="flex justify-center mt-2">
            <ChevronUp size={16} className="text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardPreview;
