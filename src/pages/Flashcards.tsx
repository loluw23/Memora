
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Plus, Search, Tag } from 'lucide-react';
import FlashcardPreview, { Flashcard } from '@/components/flashcards/FlashcardPreview';
import CreateFlashcard from '@/components/flashcards/CreateFlashcard';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Sample data
const initialFlashcards: Flashcard[] = [
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
  },
  {
    id: '3',
    front: 'What is the largest planet in our solar system?',
    back: 'Jupiter',
    category: 'Astronomy',
    dueDate: 'In 3 days'
  },
  {
    id: '4',
    front: 'Who wrote "Romeo and Juliet"?',
    back: 'William Shakespeare',
    category: 'Literature',
    dueDate: 'In 5 days'
  },
  {
    id: '5',
    front: 'What is the chemical symbol for gold?',
    back: 'Au',
    category: 'Chemistry',
    dueDate: 'In 2 days'
  }
];

const categories = [
  { name: 'All', count: 25 },
  { name: 'Geography', count: 7 },
  { name: 'Biology', count: 5 },
  { name: 'Literature', count: 4 },
  { name: 'Chemistry', count: 3 },
  { name: 'Astronomy', count: 3 },
  { name: 'History', count: 2 },
  { name: 'Math', count: 1 },
];

const Flashcards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [flashcards, setFlashcards] = useState<Flashcard[]>(initialFlashcards);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const filteredFlashcards = flashcards.filter(card => {
    const matchesSearch = card.front.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          card.back.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = currentCategory === 'All' || card.category === currentCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCreateCard = (card: { front: string; back: string; category: string }) => {
    const newCard: Flashcard = {
      id: (flashcards.length + 1).toString(),
      front: card.front,
      back: card.back,
      category: card.category,
      dueDate: 'In 1 week'
    };
    
    setFlashcards([...flashcards, newCard]);
  };

  const handleCardClick = (id: string) => {
    setActiveCard(id === activeCard ? null : id);
  };

  return (
    <MainLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
        <p className="text-muted-foreground">Review and create flashcards for effective learning</p>
      </div>
      
      <Tabs defaultValue="all" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <TabsList className="md:mr-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
              All Cards
            </TabsTrigger>
            <TabsTrigger value="due" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
              <Clock size={16} className="mr-1" />
              Due Today
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
              Favorites
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search cards..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              className="bg-memora-purple"
              onClick={() => setIsCreatingCard(true)}
            >
              <Plus size={16} className="mr-2" />
              New Card
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-4">
              <div className="font-medium flex items-center mb-3">
                <Tag size={16} className="mr-2 text-memora-purple" />
                Categories
              </div>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.name}
                    className={`w-full flex justify-between items-center px-3 py-2 text-sm rounded-lg ${
                      currentCategory === category.name 
                        ? 'bg-memora-purple text-white' 
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setCurrentCategory(category.name)}
                  >
                    <span>{category.name}</span>
                    <span className="bg-secondary-foreground/10 text-xs rounded-full px-2 py-0.5">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-3">
            <TabsContent value="all" className="m-0">
              <div className="space-y-4">
                {filteredFlashcards.length === 0 ? (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">No flashcards found. Try adjusting your search or category.</p>
                  </div>
                ) : (
                  filteredFlashcards.map(card => (
                    <div 
                      key={card.id} 
                      onClick={() => handleCardClick(card.id)}
                      className="cursor-pointer"
                    >
                      <FlashcardPreview 
                        card={card} 
                        expanded={card.id === activeCard}
                      />
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="due" className="m-0">
              <div className="space-y-4">
                {filteredFlashcards
                  .filter(card => card.dueDate === 'Today')
                  .map(card => (
                    <div 
                      key={card.id} 
                      onClick={() => handleCardClick(card.id)}
                      className="cursor-pointer"
                    >
                      <FlashcardPreview 
                        card={card} 
                        expanded={card.id === activeCard}
                      />
                    </div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="m-0">
              <div className="text-center p-8">
                <p className="text-muted-foreground">You haven't added any cards to favorites yet.</p>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
      
      <Dialog open={isCreatingCard} onOpenChange={setIsCreatingCard}>
        <DialogContent className="sm:max-w-md">
          <CreateFlashcard 
            onClose={() => setIsCreatingCard(false)}
            onSave={handleCreateCard}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Flashcards;
