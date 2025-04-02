
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FlashcardPreview, { Flashcard } from '@/components/flashcards/FlashcardPreview';
import CreateButton from '@/components/common/CreateButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Calendar, Plus, ArrowRight, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  },
  {
    id: '3',
    front: 'In what year did World War II end?',
    back: '1945',
    category: 'History',
    dueDate: 'In 2 days'
  },
  {
    id: '4',
    front: 'What is the chemical symbol for gold?',
    back: 'Au (Aurum)',
    category: 'Chemistry',
    dueDate: 'In 3 days'
  }
];

const Flashcards = () => {
  const { toast } = useToast();
  const [selectedDeck, setSelectedDeck] = useState('all');
  
  const handleCreateClick = () => {
    toast({
      title: "Create new flashcards",
      description: "Add to existing deck or create a new one",
    });
  };
  
  return (
    <MainLayout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
        <p className="text-muted-foreground">Review and create flashcards with spaced repetition</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg">Study Sessions</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-between group hover:bg-memora-purple">
                <span className="flex items-center">
                  <BookOpen size={18} className="mr-2" />
                  Geography (15 cards due)
                </span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between group">
                <span className="flex items-center">
                  <BookOpen size={18} className="mr-2" />
                  Biology (5 cards due)
                </span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" className="w-full justify-between group">
                <span className="flex items-center">
                  <BarChart3 size={18} className="mr-2" />
                  Review mastered cards
                </span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="text-lg">Your Decks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search decks..." className="pl-10" />
              </div>
              
              <Button 
                variant={selectedDeck === 'all' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${selectedDeck === 'all' ? 'bg-memora-purple' : ''}`}
                onClick={() => setSelectedDeck('all')}
              >
                <Calendar size={18} className="mr-2" /> 
                All Cards
              </Button>
              
              <Button 
                variant={selectedDeck === 'geography' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${selectedDeck === 'geography' ? 'bg-memora-purple' : ''}`}
                onClick={() => setSelectedDeck('geography')}
              >
                Geography
              </Button>
              
              <Button 
                variant={selectedDeck === 'biology' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${selectedDeck === 'biology' ? 'bg-memora-purple' : ''}`}
                onClick={() => setSelectedDeck('biology')}
              >
                Biology
              </Button>
              
              <Button 
                variant={selectedDeck === 'history' ? 'default' : 'ghost'} 
                className={`w-full justify-start ${selectedDeck === 'history' ? 'bg-memora-purple' : ''}`}
                onClick={() => setSelectedDeck('history')}
              >
                History
              </Button>
              
              <Button variant="outline" className="w-full mt-2">
                <Plus size={18} className="mr-2" />
                New Deck
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="due" className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <TabsList className="mb-6">
              <TabsTrigger value="due" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
                Due Today
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
                All Cards
              </TabsTrigger>
              <TabsTrigger value="mastered" className="data-[state=active]:bg-memora-purple data-[state=active]:text-white">
                Mastered
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="due" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flashcards.filter(card => card.dueDate === 'Today').map(card => (
                  <FlashcardPreview key={card.id} card={card} />
                ))}
                {flashcards.filter(card => card.dueDate === 'Today').length === 0 && (
                  <div className="md:col-span-2 p-8 text-center">
                    <p className="text-muted-foreground">No cards due today! Great job!</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flashcards.map(card => (
                  <FlashcardPreview key={card.id} card={card} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mastered" className="space-y-4">
              <div className="md:col-span-2 p-8 text-center">
                <p className="text-muted-foreground">Cards you've mastered will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <CreateButton onClick={handleCreateClick} />
    </MainLayout>
  );
};

export default Flashcards;
